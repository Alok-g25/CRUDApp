require("dotenv").config()
const express=require("express")
const app=express()
require("./dbConnect")
const cors=require("cors")
const users=require("./models/user")
const Router=require("./routes/Router")

app.use(cors())
app.use(express.json())
app.use(Router)


const port=8003

app.listen(port,()=>{
      console.log(`server is running on http://localhost:${port}`)
})