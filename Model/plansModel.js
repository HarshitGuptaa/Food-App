//this is the database, connected to mongodb

let mongoose = require("mongoose");
const { DB_LINK } = require("../Config/secret");



mongoose.connect(DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true}).then(function(){
  console.log("Connected to db !!");
})


let planSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxlength:[40 , "Your Plan Name is more than 40 characters !!"]
  },
  duration:{
    type:Number,
    required:true
  },
  price : {
    type:Number,
    required:true
  } ,
  ratings : Number ,
  discount : {
    type : Number,
    validate : {
      validator: function(){
        return this.discount < this.price;
      },
      message :"Discount must be less than actual price" ,
    }
  }
})
const planModel = mongoose.model("planscollection" , planSchema);

module.exports = planModel;
