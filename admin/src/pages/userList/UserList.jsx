import "./userList.css";
import React from "react"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../components/wrapper";
import {userRequest} from "../../requestMethods"


export default function UserList() {
  const [data, setData] = React.useState([])

  const getUsers = async () => {
    const res = await userRequest.get('/users')
    return res.data
  }

  React.useEffect(()=>{
      getUsers().then((s) => {
          setData(s.reduce((acc, curr) => {
            return [
              ...acc,
              {
                ...curr, 
                id: curr._id,
                status: "active",
                transaction:  "$12"
              }
            ]
          }, []))
        }).catch((err) => console.log(err))
  },[])


  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" /*src={params.row.avatar}*/ src= "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <div className="userList">
        <DataGrid
          rows={data.length > 0 ? data : []}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </Wrapper>
  );
}
