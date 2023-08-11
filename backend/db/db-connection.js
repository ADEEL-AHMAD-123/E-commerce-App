const mongoose = require ('mongoose')
const conectDB=()=>{
const connect = mongoose.connect("mongodb://localhost:27017/ecommerce-backend",{ useNewUrlParser:true}) 
.then(()=>{
console.log("connectedd");
})
.catch((err)=>{
console.log(err);
})}

module.exports = conectDB; 