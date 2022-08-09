import React, { useState, useEffect } from "react";
import Form from "./Form";
import http from "../../component/api/Api";
import { useParams, useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";

const Edit = () => {
   const { user } = useRecoilValue(authentication);
   const { id } = useParams();
   const [data, setData] = useState({});
   const [isComplete, setIsComplete] = useState(false);
   const navigate = useNavigate();

   const getData = async (id) => {
      setIsComplete(false);
      const res = await http.get(`asset_disposal/${id}`);
      // console.log(res.data)
      setData(res.data.data);
      setIsComplete(true);
   };

   useEffect(() => {
      let m = true;
      if (m) {
         Permission(user.permission, "update asset disposal") === true ? getData(id) : navigate("/disposal-asset");
      }
      return () => (m = false);
   }, [id]);

   return (
      <div className="main-content">
         <div className="page-content">
            <div className="container-fluid">
               <div className="row">{isComplete && <Form title="edit" data={data} />}</div>
            </div>
         </div>
      </div>
   );
};

export default Edit;
