import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"

function AddUser() {
      const [data,setData]=useState({
            name:"",
            email:"",
            age:"",
            mobile:"",
            work:"",
            address:"",
            description:""
      })
      const navigate=useNavigate()

      function handleData(e){
            const {name,value}=e.target;
            setData(preData=>{
                  return {...preData,[name]:value}
            })
      }
      async function submitData(e){
            e.preventDefault()
            const {name,email,mobile,age,work,address,description}=data;
            const res= await fetch("/register",{
               method:"POST",
               headers:{
                  "content-type":"application/json"
               },
               body:JSON.stringify({name,email,mobile,age,work,address,description})
            })

            const myData= await res.json()
            // console.log(myData)
            if(res.status===500 || res.status ===400 || !myData){
               alert("error")
               // console.log("something error")
            }
            else{
               alert("data add successfully",myData)
               navigate("/")
               // console.log("data add successfully")
            }

            
      }
  return (
    <>
      <div className="container mt-4">
        <Link to="/">Home</Link>
        <h3 className="text-center bg-black text-light p-2">Add User</h3>
        
        <form>
            <div className="row d-flex mt-3">
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                  <input type="text" onChange={handleData}  name="name" className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                  <input type="email" onChange={handleData}  name="email" className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
                  <input type="text" onChange={handleData} name="age"  className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mobile</label>
                  <input type="text" onChange={handleData} name="mobile" className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Work</label>
                  <input type="text" onChange={handleData} name="work" className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-6">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                  <input type="text" onChange={handleData} name="address" className="form-control" id="exampleFormControlInput1"/>
               </div>
               <div className="mb-1 col-md-12">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                  <textarea name="description" onChange={handleData}  className="form-control" rows={3} id="exampleFormControlInput1"></textarea>
               </div>
            </div>
            <button onClick={submitData} className="btn mt-2 btn-primary w-100">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddUser;
