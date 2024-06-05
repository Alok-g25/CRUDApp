import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [getUserData, setGetUserData] = useState([]);
  // console.log(getUserData);
  const Navigate = useNavigate();

  async function getData() {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const myData = await res.json();
    // console.log(myData)
    if (res.status === 500 || res.status === 404 || !myData) {
      alert("error");
      console.log("something error");
    } else {
      setGetUserData(myData.data);
      //  console.log("data get successfully")
    }
  }

  async function deleteData(id) {
    const res = await fetch(`/deletedata/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const myData = await res.json();
    // console.log(myData)
    if (myData.status === 404 || myData.status === 500 || !myData)
      alert(myData.reason);
    else {
      alert("data delete succesfully");
      Navigate("/");
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="my-2 text-end">
          <Link to="/adduser" className="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Add Data
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table text-center table-responsive">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getUserData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.work}</td>
                    <td>{item.mobile}</td>
                    <td className="d-flex justify-content-around gap-1">
                      <Link
                        to={`/detail/${item._id}`}
                        className="btn btn-success"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Link>

                      <Link
                        to={`/edituser/${item._id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link
                        onClick={() => deleteData(item._id)}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
