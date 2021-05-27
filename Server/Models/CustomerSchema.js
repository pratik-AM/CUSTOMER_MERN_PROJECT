const mongoose=require("mongoose");

const CustSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
       
    },
    lastName:{
        type:String,
        require:true
    },
    occupation:{
       type:String,
      require:true
    },
    dob:{
    type:Date,
    require:true
   },
    status:{
     type:String,
     require:true
    },
     bio:{

    type:String,
    require:true
    },
   profilePicture : { 
    type: String,
    require: true
    },

})

module.exports=mongoose.model("customers",CustSchema);