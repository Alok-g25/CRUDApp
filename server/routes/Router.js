const Router=require("express").Router()
const user=require("../models/user")

// Router.get("/",(req,res)=>{
//       console.log("hello server")
// })


// create data
Router.post("/register",async (req,res)=>{
      // console.log(req.body)
      const {name,email,mobile,age,work,address,description}=req.body;

      if(!name || !email || !mobile || !age || !work || !address || !description){
            res.status(400).send({reasult:"failed", reason:"Please fill up following criteria"})
            return;
      }
      try{
            const preUser=await user.findOne({email:email})
            if(preUser){
                  res.status(400).send({reasult:"failed", reason:"user allready exist"})
                  return;
            }
            else{
                  const addUser=new user({
                        name,email,mobile,age,work,address,description
                  })
                  await addUser.save()
                  res.send({reasult:"done", reason:"data save successfully",data:addUser})
            }
      }
      catch (error){
            res.status(500).send({reasult:"failed", reason:"Internal server error"})
            return;
      }
})

//get data
Router.get("/getdata",async(req,res)=>{
      try {
            const data= await user.find({})
            if(data){
                  res.send({result:"Done",count:data.length,data:data})
            }
            else{
                  res.status(404).send({result:"failed",reason:"data not found"})
                  return;
            }
      } catch (error) {
            res.status(500).send({result:"failed",reason:"Internal server error"})
            return;
      }
})

//get single data
Router.get("/getuser/:id",async(req,res)=>{
      try {
            const data=await user.findOne({_id:req.params.id})
            if(data){
                  res.send({result:"Done", data:data})
            }
            else{
                  res.status(404).send({result:"failed",reason:"data not found"})
                  return;
            }
      } catch (error) {
            res.status(500).send({result:"failed",reason:"Internal server error"})
            return;
      }
})


//update user
Router.put("/updateuser/:id",async (req,res)=>{
      try {
            let data= await user.findOne({_id:req.params.id})
      if(data){
            data.name=req.body.name || data.name
            data.email=req.body.email || data.email
            data.age=req.body.age || data.age
            data.mobile=req.body.mobile || data.mobile
            data.work=req.body.work || data.work
            data.address=req.body.address || data.address
            data.description=req.body.description || data.description
            await data.save()
            res.send({result:"done",data:data})
      }
      else{
            res.status(404).send({result:"failed",reason:"data not found"})
            return;

      }
      } catch (error) {
            res.status(500).send({result:"failed",reason:"Internal server error"})
            return;
      }
})

// delete Data

Router.delete("/deletedata/:id",async (req,res)=>{
      try {
            const data= await user.findOne({_id:req.params.id})
            if(data){
                  await data.deleteOne()
                  res.send({result:"done"})
            }else
            res.status(404).send({result:"failed",reason:"data not found"})
      } catch (error) {
            res.status(500).send({result:"failed",reason:"Internal Server Error"})
      }
})

module.exports=Router;