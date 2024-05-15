import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    stock: Yup.number().required('Stock quantity is required'),
    category: Yup.string().required('Product category is required'),
    price: Yup.number().required('Product price is required'),
    images: Yup.array().required('At least one image is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('name', values.name);
      formDataToSend.append('description', values.description);
      formDataToSend.append('stock', values.stock);
      formDataToSend.append('category', values.category);
      formDataToSend.append('price', values.price);

      values.images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });

      const response = await axios.post('http://localhost:8000/api/v1/admin/product/new', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log('Product created:', response.data);
        toast.success('Product created successfully');
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      stock: '',
      category: '',
      price: '',
      images: [],
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="product-form">
      <label htmlFor="name" className="label">
        Product Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="input"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && <div className="error-message">{formik.errors.name}</div>}

      <label htmlFor="description" className="label">
        Product Description:
      </label>
      <textarea
        id="description"
        name="description"
        className="textarea"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
      {formik.touched.description && formik.errors.description && (
        <div className="error-message">{formik.errors.description}</div>
      )}

      <label htmlFor="stock" className="label">
        Stock:
      </label>
      <input
        type="text"
        id="stock"
        name="stock"
        className="input"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.stock}
      />
      {formik.touched.stock && formik.errors.stock && <div className="error-message">{formik.errors.stock}</div>}

      <label htmlFor="category" className="label">
        Category:
      </label>
      <input
        type="text"
        id="category"
        name="category"
        className="input"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.category}
      />
      {formik.touched.category && formik.errors.category && (
        <div className="error-message">{formik.errors.category}</div>
      )}

      <label htmlFor="price" className="label">
        Product Price:
      </label>
      <input
        type="text"
        id="price"
        name="price"
        className="input"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
      />
      {formik.touched.price && formik.errors.price && <div className="error-message">{formik.errors.price}</div>}
      <label htmlFor="images" className="label">
        Product Images:
      </label>
      <input
        type="file"
        id="images"
        name="images"
        className="input"
        onChange={(event) => {
          const files = event.currentTarget.files;
          const filesArray = Array.from(files);
          formik.setFieldValue('images', filesArray); // Set the array of files
        }}
        onBlur={formik.handleBlur}
        multiple
      />
      {formik.touched.images && formik.errors.images && (
        <div className="error-message">{formik.errors.images}</div>
      )}

      <button type="submit" className="button">
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;