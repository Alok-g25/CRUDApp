import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  function handleData(e) {
    const { name, value } = e.target;
    setData((preData) => {
      return { ...preData, [name]: value };
    });
  }

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
      setData(myData.data);
      //  console.log("data get successfully")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function updateData(e) {
    e.preventDefault();
    const { name, email, mobile, age, work, address, description } = data;
    const res = await fetch(`/updateuser/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        age,
        work,
        address,
        description,
      }),
    });

    const myData2 = await res.json();
    if (res.status === 500 || res.status === 404 || !myData2) {
      alert("error");
      // console.log("something error")
    } else {
      alert("data update successfully");
      navigate("/");
    }
  }


  return (
    <>
      <div className="container mt-4">
        <Link to="/">Home</Link>

        <h3 className="text-center bg-black text-light p-2">Edit User</h3>

        <form>
          <div className="row d-flex mt-3">
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                value={data.name}
                type="text"
                onChange={handleData}
                name="name"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                value={data.email}
                type="email"
                onChange={handleData}
                name="email"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Age
              </label>
              <input
                value={data.age}
                type="text"
                onChange={handleData}
                name="age"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Mobile
              </label>
              <input
                value={data.mobile}
                type="text"
                onChange={handleData}
                name="mobile"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Work
              </label>
              <input
                value={data.work}
                type="text"
                onChange={handleData}
                name="work"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Address
              </label>
              <input
                value={data.address}
                type="text"
                onChange={handleData}
                name="address"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="mb-1 col-md-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Description
              </label>
              <textarea
                value={data.description}
                name="description"
                onChange={handleData}
                className="form-control"
                rows={3}
                id="exampleFormControlInput1"
              ></textarea>
            </div>
          </div>
          <Link onClick={updateData} className="btn mt-2 btn-primary w-100">
            Submit
          </Link>
        </form>
      </div>
    </>
  );
}

export default EditUser;
