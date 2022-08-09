import React, { useEffect } from "react";
import Form from "./Form";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   useEffect(() => {
      Permission(user.permission, "create asset disposal") === false && navigate("/disposal-asset");
   }, []);
   return (
      <div className="main-content">
         <div className="page-content">
            <div className="container-fluid">
               <div className="row">
                  <Form title="add" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Add;
