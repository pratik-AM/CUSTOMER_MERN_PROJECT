const express=require("express");
const app=express();
const cors=require("cors");

require("./Conn");

app.use(express.static('upload'));  
app.use('/images', express.static('upload')); 
app.use(cors());
app.use(express.json());

app.use(require("./Routers/CustomersRouter"));




app.listen(9000,()=>{
    console.log("server is running on port 9000");
})


