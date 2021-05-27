
const express=require("express");
const Customer=require("../Models/CustomerSchema");
const router=express.Router();
const multer=require("multer");
const { ConnectionStates } = require("mongoose");
const e = require("express");




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

router.delete("/delcustomer/:id",  async (req,res)=>{
  try{
  const  id=req.params.id;
  
         const yes= await Customer.remove({_id:id});
        
         if(yes.deletedCount)
          res.json({msg:"deleted successfully"});
          else
          res.json({err:"no data found to delete"});
  
  }
  catch(err)
  {
    console.log(err);
  }
});

router.put("/ubdateCustomer/:id",upload.single("file1"), async (req,res)=>{
  console.log(req.file); 
  console.log(req.body);
 try{ 
  const {firstName,lastName,occupation,dob,status,bio}=req.body;
   const id=req.params.id;
   var createdDateTime = new Date(dob + 'Z'); 

 
   await Customer.updateOne({_id:id},{$set:{firstName:firstName,lastName:lastName,dob:createdDateTime,status:status,bio:bio,profilePicture:req.file.filename}});
  
  res.json({msg:"update success"});
 }catch(err)
 {
   res.json({err:"error not found "})
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