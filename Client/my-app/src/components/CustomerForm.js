import React from 'react'
import {useForm,Controller} from "react-hook-form"
import axios from "axios"
import {useHistory,useLocation} from "react-router-dom"
import {useState,useEffect} from "react"
import CustomerTable from './CustomerTable'
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function CustomerForm() {
  
  const [state, setstate] = useState({
    profilePicture:""  
  });

  const [stateImage, setstateImage] = useState({
    currentFile: "",
    previewImage: ""
  })
const history=useHistory();
const {register,handleSubmit,control, setValue, reset,formState: { errors }} =useForm({mode:"onBlur"});

const loc=useLocation();

 const submit= async (data)=>{
    
  const formDate=new FormData();

  for ( var key in data) {
 formDate.append(key, data[key]);
  }
  formDate.append("file1",data.file1[0]);
     
  
    if(loc.editId)
    { 
       try{
      
           const res=await axios.put(`http://localhost:9000/ubdateCustomer/${loc.editId}`,formDate);
           alert(res.data.msg)
       }
       catch(err)
       {
         console.log(err.response);
       }
    }
  else
    {
     
    
      
 try{ 
   const res=  await  axios.post( "http://localhost:9000/addcustomer/", formDate);
   console.log(res.data.msg);
   alert(res.data.msg);
 }
 catch(err)
 {
   
   
    alert("Error  while saving the data please check your Server ...or connections ");
    console.log(err);
  
 
 }
      
    } 
   
        


}






useEffect(() => {
  
if(loc.editId)
{
 try{

    axios.get(`http://localhost:9000/customer/${loc.editId}`)
    .then((res)=>{
    const  cust=res.data.data;
  setstate({
        profilePicture:cust.profilePicture,
       });
    
        setValue("firstName",cust.firstName);
        setValue("lastName",cust.lastName);
        setValue("bio",cust.bio);
        setValue("occupation",cust.occupation);
        setValue("status",cust.status);
        setValue("dob",new Date(cust.dob));
     
    })
    
    

   }
   catch(err)
   {
       console.log(err);
   }
 }
}, [])


const Reset=()=>{


  setstate({
    profilePicture:"" 
  })
  setstateImage({
    currentFile: "",
    previewImage: ""
  })
  setValue("dob","");
}
   
 const  handleChange=(e)=>{
 setstate({...state,
   [e.target.name]:e.target.value,
   
 })
 
 }
const   handleImageChange=(e)=>{ 

  setstateImage({
    currentFile: e.target.files[0],
    previewImage: URL.createObjectURL(e.target.files[0]),
  })
}


    return (
      
     <form onSubmit={handleSubmit(submit)} >
      <div className="row mt-5 mx-5  " >  
        <div className="col-md-10 main ">
            
        <div className="card" >
            <div className="card-header">{ loc.editId?"You can update details "  :"Please  fill the following  information (Customer Entry Form)"}</div>
            <div className="card-body">
                
            <div className="form-group  mb-3 ">
    <label for="firstName">FirstName</label>
    <input type="text" className="form-control" {...register("firstName",  {required: "Required"})} data-testid="testName"  name="firstName" />
    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
  </div>

  <div className="form-group mb-4">
    <label for="lastName">Last Name</label>
    <input type="text" className="form-control"  {...register("lastName",{ required: "Required" })} name="lastName"   />
    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
  </div>
  
    
 
  <select className="form-select mb-3  form-select-sm"  name="occupation" {...register("occupation",{ required: "Required" })}   aria-label=".form-select-sm example">
  <option selected value=""  > Select Occuption</option>
  <option value="employed">Employed</option>
  <option value="bussines">Bussines</option>
  <option value="student">Student</option>
 </select>
 {errors.occupation && <p className="text-danger">{errors.occupation.message}</p>}

 <div className="form-group mb-3"  >
    <label htmlFor="date">DOB </label>
    
    <Controller
        control={control}
        name="dob"
              
        render={({ field}) =>
         
        ( 
           <div> 
             {}     
           <Datetime 
            
           {...field}
           
           {...register("dob",{ required: "Required"})}
           dateFormat="DD-MM-YYYY"
           timeFormat={false}
           isClearable="true"
           closeOnSelect="true"
           onChange={(e) => field.onChange(e._d)}
           selected={field.value}
           inputProps={{
            placeholder: "Select DOB",
            }}
          />
          </div>
        )
        
      }
      />
      {errors.dob && <p className="text-danger">{errors.dob.message}</p>}
  </div>


 <label htmlFor="status">status</label>
  <div className="form-check form-check-inline mb-3 mx-3" >
  <input className="form-check-input"   type="radio"   id="status" name="status"  {...register("status",{ required: "Required"})}  value="active"   />
  <label className="form-check-label"   for="active">Active</label>
  
</div>
<div className="form-check form-check-inline mb-3">
  <input className="form-check-input" type="radio" id="status"  name="status" {...register("status",{ required: "Required"})} value="inactive"   />
  <label className="form-check-label" for="inactive">Inactive</label>

</div>
{errors.status && <p className="text-danger">{errors.status.message}</p>}
<div className="form-group mb-3" >
    <label for="bio">Bio :</label>
    <textarea className="form-control"  {...register("bio",{ required: "Required" })} name="bio" rows="4" cols="40"  ></textarea>
    {errors.bio && <p className="text-danger">{errors.bio.message}</p>}
  </div>

  <div className=" row mb-3 ">
  <div className="col-xs-2">
    <label for="file1">{loc.editId?"Upload new profile photo": "Upload profile picture "}</label>
    <input type="file"   id="image"   accept="image/*" className="form-control btn btn-secondary   "  onInput={handleImageChange} name="file1"  {...register("file1",loc.editId?{ required: false }:{required:"Required"})}  />
    {errors.file1 && <p className="text-danger">{errors.file1.message}</p>}
    </div>
    
   
  </div>
   {loc.editId&&stateImage.currentFile&&<img className="img" src={stateImage.previewImage}  width="60px" height="60px"/>}

   {
     loc.editId&&state.profilePicture&&!stateImage.currentFile&&<img className="img" src={`http://localhost:9000/images/${state.profilePicture}`}  width="60px" height="60px"/>}

   {
   !loc.editId&&stateImage.currentFile&&<img className="img" src={stateImage.previewImage}  width="60px" height="60px"/>}
   {
      !loc.editId&&!stateImage.currentFile&&<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" width="60px" height="60px" />
   }   

{
      loc.editId&&!stateImage.currentFile&&!state.profilePicture&&<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" width="60px" height="60px" />}   
 
   </div>
         
        </div>
       <button className=" btn btn-primary mt-3 " type="submit" >{loc.editId?"Update":"Create"}</button>

        <button className=" btn btn-primary mt-3 mx-5 " onClick={()=>{history.push("\show")}} >Show Records</button>
        <button className=" btn btn-primary mt-3 mx-5 " type="reset" onClick={Reset}  >Reset</button>
        
        </div>
       </div>
      
       </form>
      
               
    )
}

export default CustomerForm

