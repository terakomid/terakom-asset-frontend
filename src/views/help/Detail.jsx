import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import http from "../../component/api/Api";
import { useParams } from "react-router-dom";

const Detail = () => {
   const [data, setData] = useState({});
   const { id } = useParams();
   const [isComplete, setIsComplete] = useState(false);

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         (async () => {
            setIsComplete(false);
            const res = await http.get(`/help/${id}`);
            setData(res.data.data);
            setIsComplete(true);
         })();
      }
      return () => (mounted = false);
   }, [id]);

   return (
      <div className="main-content">
         <div className="page-content">
            <div className="container-fluid">
               <div className="row">{isComplete && <Messages data={data} />}</div>
            </div>
         </div>
      </div>
   );
};

export default Detail;
