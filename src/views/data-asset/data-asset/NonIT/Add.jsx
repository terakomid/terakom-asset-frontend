import React, { useEffect } from "react";
import Form from "../Form";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../../store/Authentication";
import { Permission } from "../../../../component/Permission";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   useEffect(() => {
      Permission(user.permission, "create asset") === false && navigate("/data-asset");
   }, []);
   return (
      <div className="main-content">
         <div className="page-content">
            <div className="container-fluid">
               <div className="row">
                  <Form title="add" type="non-it" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Add;
