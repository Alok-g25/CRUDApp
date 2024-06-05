import React, {useState,useEffect} from "react";
import { useParams,Link, useNavigate } from "react-router-dom";

function Details() {
  const [getUserData, setGetUserData] = useState([]);
  // console.log(getUserData);
  const {id}=useParams()
  // console.log(id)
  const Navigate =useNavigate()


  async function getData() {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const myData = await res.json();
    if (res.status === 500 || res.status === 404 || !myData) {
      alert("error");
      console.log("something error");
    } else {
      setGetUserData(myData.data);
      //  console.log("data get successfully")
    }
  }

  async function deleteData(id){
    const res= await fetch(`/deletedata/${id}`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json"
      }
    })

    const myData=await res.json()
    // console.log(myData)
    if(myData.status===404 || myData.status===500 || !myData)
      alert(myData.reason)
    else{
      alert("data delete succesfully")
      Navigate("/")
    }
  }

  useEffect(() => {
    getData();
  }, []);
 
  return (
    <>
      <div className="container mt-4">
        <h2>Hello, Alok Kumar</h2>

        <div className="card border-0 shadow" style={{maxWidth:"550px"}}>
          <div className="card-body row">
          <div className="d-flex justify-content-between">
                <img src="/assets/userImg.png" style={{width:"100px"}} className="rounded-circle mb-2" />
                <div>
                        <Link to={`/edituser/${id}`} className="btn btn-primary me-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                        <Link onClick={()=>deleteData(id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></Link>
                </div>
          </div>
            <div className="left-view col-md-6 col-sm-12">
                  <h6> Name : <span className="mt-5 fw-light">{getUserData.name}</span></h6>
                  <h6> Age : <span className="mt-5 fw-light">{getUserData.age}</span></h6>
                  <h6> <i className="fa-solid fa-envelope"></i> Email : <span className="mt-5 fw-light">{getUserData.email}</span></h6>
                  <h6> <i className="fa-solid fa-briefcase"></i>Occuption : <span className="mt-5 fw-light">{getUserData.work}</span></h6>
                  <h6><i className="fa-solid fa-mobile-screen"></i> Mobile : <span className="mt-5 fw-light">{getUserData.mobile}</span></h6>
                  <h6><i className="fa-solid fa-location-dot"></i> Location : <span className="mt-5 fw-light">{getUserData.address}</span></h6>
            </div>
            <div className="right-view col-md-6 col-sm-12">
                  <h6> Description : <span className="mt-5 fw-light">{getUserData.description} </span></h6>
                  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
