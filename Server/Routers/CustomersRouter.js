
const express=require("express");
const Customer=require("../Models/CustomerSchema");
const router=express.Router();
const multer=require("multer");
const { ConnectionStates } = require("mongoose");
const e = require("express");
const fs=require("fs");
const { findOne } = require("../Models/CustomerSchema");




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router.get("/getcustomers",async (req,res)=>{
  try{
     const data  = await  Customer.find().exec();
     
     res.json({msg:"data is fetching",data:data});
  }    
  catch(err){
    res.json({msg:"error while fetching data"});  
  }
})


router.get("/customer/:id" , async(req,res)=>{
  
  
 try{ 
   const id=req.params.id;
  
    const data =  await Customer.findOne({_id:id});
   if(data) 
    res.json({data:data});
   else
   res.json({msg:"record not found"}); 

 }catch(err)
 {
   console.log(err);
 }
})

router.delete("/delcustomer/:id",   (req,res)=>{
  
  const  id=req.params.id;
          
          
     Customer.findOne({_id:id})
     .then(data=>{
       
      fs.unlink(`./upload/${data.profilePicture}`,(err)=>{
        if(err)throw err;
        Customer.remove({_id:id})
          .then(re=>{
      
            if(re.deletedCount){
              res.json({msg:"deleted successfully"});
            
            }
          })
          .catch(err=>{
            console.log(err);
          })
          
       
        
      });   

     })
      .catch(err=>{
      res.json({err:"no data found to delete"});
     })
        
          
         
        
          
         

});

router.put("/ubdateCustomer/:id",upload.single("file1"), async (req,res)=>{
  
 try{ 
  const {firstName,lastName,occupation,dob,status,bio}=req.body;
   const id=req.params.id;
   var createdDateTime = new Date(dob + 'Z'); 

  if(req.file)
  { 
    const data= await Customer.findOne({_id:id});
    if(data){
      
     fs.unlink(`./upload/${data.profilePicture}`,async(err)=>{
      if(err)throw err;
      await Customer.updateOne({_id:id},{$set:{firstName:firstName,lastName:lastName,dob:createdDateTime,status:status,bio:bio,profilePicture:req.file.filename}});
     }) 
    
    }
  }
  else 

   await Customer.updateOne({_id:id},{$set:{firstName:firstName,lastName:lastName,dob:createdDateTime,status:status,bio:bio}});
   
  
  
  res.json({msg:"update success"});
 }catch(err)
 {
   res.json({err:"error  found "})
   console.log(err);
 }
}) 


router.post("/addcustomer",upload.single("file1"), async (req,res)=>{
  try{
      
const {firstName,lastName,occupation,dob,status,bio}=req.body;
var createdDateTime = new Date(dob + 'Z'); 

 const IsDuplicate=  await  Customer.findOne({firstName:firstName,lastName:lastName});
    
         if(IsDuplicate){
    
            return res.json({msg:"duplicate entry"});
         }
       const customer=new Customer({firstName,lastName,occupation,dob:createdDateTime,status,bio,profilePicture:req.file.filename});
      await customer.save();
      return res.json({msg:"Saved successfully"});       
  }
  catch(err){
    return res.json({error:"error while saving data"});
  }

         
})


module.exports=router;