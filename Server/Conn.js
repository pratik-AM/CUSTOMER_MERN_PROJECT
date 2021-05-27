const mongoose =require("mongoose");
const  url="mongodb+srv://pratik123:pratik@123@mycluster.41hr7.mongodb.net/Cust?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false}).then(()=>{
    console.log("connected");
   }).catch((err)=>{
     console.log(err);
   })