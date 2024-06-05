const mongoose =require("mongoose")


const DB="mongodb+srv://alokkumar9506492158:NKmFjZBnX4BWAsdM@cluster0.y06usrp.mongodb.net/MERN_Crud_app"

mongoose.connect(DB)
.then(()=>{
      console.log(`database is connect ${mongoose.connection.host}`)
}).catch((error)=>{
      console.log(error)
})