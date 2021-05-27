import React from 'react'
import {useEffect,useState}  from "react"
import axios from "axios";
import {useHistory} from "react-router-dom"
import Modal from "react-bootstrap/Modal";

function CustomerTable() {
  let cust;
       const history=    useHistory();
      const [state, setstate] = useState({data:[],load:false});
      const [isOpen, setIsOpen] = useState(false);
      const [modelDate,setModelDate] =useState({});
      
const fetchData= async()=>{
    try{
  
        const res= await axios.get("http://localhost:9000/getcustomers/");
        setstate({data:res.data.data,load:true});
        console.log(res.data.data);
        }
        catch(err)
        {
            console.log(err);
        }
}



const handleClickDelete=(e)=>{
   // alert(e.target.id);
   const confirmBox = window.confirm(
    "Do you really want to delete this record?"
  )
  if (confirmBox === true) {
    
         axios.delete(`http://localhost:9000/delcustomer/${e.target.id}`).then(res=>{
           console.log(res.data.msg);
           fetchData();
         }).catch((err)=>{
        console.log(err);
          })       
        }  

}

const handleClickEdit=(e)=>{
  const confirmBox = window.confirm(
    "Do you  want to edit this record?"
  )
  if (confirmBox === true) 
    history.push({pathname:"/",editId:e.target.id});
}
const showModal = (e) => {
  console.log("inside show model");
  fetchModelDate(e.target.id);
  setIsOpen(true);
  
};

const hideModal = () => {
  setIsOpen(false);
};


const  fetchModelDate= async(id)=>{
   console.log(id);
   try{
    const res= await axios.get(`http://localhost:9000/customer/${id}`);
     console.log(res.data.data);
      cust=res.data.data;
     setModelDate({...cust});

   }
   catch(err)
   {
     console.log(err);
   }


}



const CustomerList=()=>(
    <div className="container">
    <h2>Customer Details</h2>
                                                                                         
    <div className="table-responsive">          
    <table className="table table-dark table-striped">
      <thead>
        <tr> 
          <th>#</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>status</th>
          <th>occupation</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
         { 
         
         state.data.map((customer,index)=>(
            <tr key={index}>
            <td>{index+1}</td>
            <td >{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.status}</td>
            <td>{customer.occupation}</td>
       
           <td> <div  onClick={handleClickEdit} >
             <box-icon id={customer._id} type="solid" color='#f1e4e2' size="sm" name="edit"></box-icon>
         </div> </td> 

          <td>  <div  onClick={handleClickDelete} >
             <box-icon id={customer._id} type="solid" color='#f1e4e2' size="sm" name="trash"></box-icon>
         </div></td>
        
           <td> <div  onClick={showModal} >
             <box-icon id={customer._id} type="solid" color='#f1e4e2' size="sm" name="user-detail"></box-icon>
         </div></td>
      
            </tr>
         ))
      
}
      </tbody>
    </table>
    </div>
  </div>
      
)


useEffect( () => {
   fetchData();
}, [])
    
    return (
        <div>
          {console.log(isOpen)}
          <Modal dialogClassName="my-modal" show={isOpen} onHide={hideModal}>
  <Modal.Header>
  <Modal.Title> PREVIEW CUSTOMER DETAILS</Modal.Title>
  </Modal.Header>
   <Modal.Body>
   <div className="row   " >  
        <div className="col-md-30  ">
     <div className="card">
     <img src={`http://localhost:9000/images/${modelDate.profilePicture}`}  width="50%" height="50%"  />
     <h2>{`${modelDate.firstName} ${modelDate.lastName}`}</h2>
     <p>Dob : {modelDate.dob?modelDate.dob.substring(0,10):null}</p>
     <h4 className="title">{modelDate.bio}</h4>
     <   p>Occuption  : {modelDate.occupation}</p>
    <p>Status  : {modelDate.status}</p>
     </div>
     </div>
     </div>
   </Modal.Body>

   <Modal.Footer>
   <a href="#"><i class="fa fa-dribbble"></i></a>
  <a href="#"><i class="fa fa-twitter"></i></a>
  <a href="#"><i class="fa fa-linkedin"></i></a>
  <a href="#"><i class="fa fa-facebook"></i></a>
  <p><button className="btn btn-primary" >Contact</button></p>
<button className="btn btn-primary" onClick={hideModal}>Cancel</button>

</Modal.Footer>
</Modal>
         <div>{!state.load?"loading":<CustomerList/>}</div>
         <model/>
         <div>
          <button className="btn btn-primary" onClick={()=>{history.goBack()}}>Back</button>   
         </div>
        
            
        </div>
    )
}

export default CustomerTable


