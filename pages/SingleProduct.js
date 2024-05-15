import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productAsyncActions } from '../slices/productsSlice';
import { reviewAsyncActions } from '../slices/reviewSlice';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCode } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import CustomerReview from '../components/CustomerRevies';
import payment from '../images/pay.png';
import ReactStars from 'react-rating-stars-component';
import productImage from '../images/watch.jpg'; // assuming you have a product image
import { addToCart } from '../slices/cartSlice'; // Import addToCart action
import { toggleWishlist } from '../slices/wishlistSlice'; // Import toggleWishlist action
import { addToCompare } from '../slices/compareSlice'; // Import addToCompare action
import { incrementQuantity, decrementQuantity } from '../slices/cartSlice'; // Import incrementQuantity and decrementQuantity actions
import { toast } from 'react-toastify'; // Import toast for notifications

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAsyncActions.getProductDetails({ requestData:`/${id}` }));


  }, [dispatch, id]);
  

  const { isLoading, error, selectedProduct } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find(item => item._id === id);

  // Initialize quantity state
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  // Update quantity state when cartItems changes
  useEffect(() => {
    const updatedCartItem = cartItems.find(item => item._id === id);
    if (updatedCartItem) {
      setQuantity(updatedCartItem.quantity);
    }
  }, [cartItems, id]);

  const handleDecrease = () => {
    dispatch(decrementQuantity({ itemId: id }));
  };

  const handleIncrease = () => {
    dispatch(incrementQuantity({ itemId: id }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ item: selectedProduct.product, quantity: quantity }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(selectedProduct.product));
  };

  const handleAddToCompare = () => {
    dispatch(addToCompare(selectedProduct.product));
  };

  const initialValues = { name: '', review: '', rating: 0 };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    review: Yup.string().required('Review is required'),
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5').required('Rating is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      productAsyncActions.createProductReview({
        data: {
          rating: values.rating,
          comment: values.review,
          productId: selectedProduct.product._id,
        },
      })
    );
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedProduct || !selectedProduct.product) return <div>No product found.</div>;

  const product = selectedProduct.product;

  return (
    <>
      <Meta title={product.name} />
      <BreadCrumb title={product.name} />
      <div className="single-product wrapper"> 
        <div className="single-product-card">
          <div className="images">
            <div className="main-img">
              <img src={product.images && product.images.length >= 1 ? product.images[0].url : ''} alt={product.name} />
            </div>
          </div>
          <div className="single-product-content">
            <h3 className="title">{product.name}</h3>
            <h3>${product.price}</h3>
            <div className="info-line">  
              <ReactStars
                classNames={"star"}
                count={5}
                size={12}
                activeColor="#ffd700"
                value={product.rating}
                edit={false}
                half={true}
              />
              <p>({product.reviews?.length} Reviews)</p>
            </div>
            <div className="info-line">
              <h4>Type :</h4>
              <p>{product.category}</p>
            </div>
            <div className="info-line">
              <h4>Stock :</h4>
              <p>{product.stock} in stock</p>
            </div>
            <div className="info-line">
              <h4>Quantity :</h4>
              <div className="quantity-selector">
                <button className="quantity-button" onClick={handleDecrease}>-</button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-button" onClick={handleIncrease}>+</button>
              </div>
            </div>
            <div className="info-line">
              <button className='button' onClick={handleAddToCart}>Add To Cart</button>
              <button className='button'>Buy It Now</button>
            </div>
            <div className="info-line">
              <button onClick={handleToggleWishlist}>
                <FontAwesomeIcon icon={faHeart} />
                Add To Wishlist
              </button>
              <button onClick={handleAddToCompare}>
                <FontAwesomeIcon icon={faCode} />
                Add To Compare
              </button>
            </div>
            <div className="payment-method">
              <h4>Payment Methods</h4>
              <img src={payment} alt="Payment Methods" />
            </div>
          </div>
        </div>
        <h2 className="title">Description</h2>
        <div className="description">
          <p>{product.description}</p>
        </div>
        <h2 className="title">Reviews</h2>
        <div className="reviews-section">
          {product.reviews?.map(review => (
            
            <h6>review</h6>,
            <CustomerReview
              key={review._id}
              name={review.name}
              rating={review.rating}
              comment={review.comment}
            />
          

          ))}
        </div>
        <h2 className="title">Write A Review</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="input-group">
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
              </div>
              <div className="input-group">
                <label htmlFor="rating">Rating:</label>
                <Field as="select" id="rating" name="rating">
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </Field>
                {errors.rating && touched.rating ? <div className="error">{errors.rating}</div> : null}
              </div>
              <div className="input-group">
                <label htmlFor="review">Review:</label>
                <Field as="textarea" id="review" name="review" />
                {errors.review && touched.review ? <div className="error">{errors.review}</div> : null}
              </div>
              <button type="submit">Submit Review</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SingleProduct;
