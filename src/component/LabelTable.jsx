import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { ConvertLabel } from "../help/LabelHelp";

export const LabelTable = (props) => {
   const [asset_code, setAssetCode] = useState([]);

   useEffect(() => {
      let mounted = true;
      if (mounted) {
         if (props.capitalizedSplit) {
            setAssetCode(ConvertLabel(props.data, props.capitalizedSplit));
         } else {
            setAssetCode(ConvertLabel(props.data));
         }
      }
      return () => (mounted = false);
   }, []);

   return (
      <table style={{ border: "2px solid black", width: "302px", height: "188px" }}>
         <tbody>
            <tr>
               <td rowSpan={4} style={{ border: "2px solid black", padding: "40px 5px", background: "#fff" }}>
                  <QRCode size={80} value={asset_code.join("/")} />
               </td>
            </tr>
            <tr>
               <td colSpan={5} style={{ border: "2px solid black", padding: "0px 10px" }}>
                  <Typography variant="subtitle2" fontWeight="bold" textAlign="center" color="black">
                     PT. Haier Sales Indonesia
                  </Typography>
               </td>
            </tr>
            <tr>
               <td style={{ border: "2px solid black" }}>
                  <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                     {asset_code[0]}
                  </Typography>
               </td>
               <td style={{ border: "2px solid black" }}>
                  <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                     {asset_code[1]}
                  </Typography>
               </td>
               <td style={{ border: "2px solid black" }}>
                  <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                     {asset_code[2]}
                  </Typography>
               </td>
               <td style={{ border: "2px solid black" }}>
                  <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                     {asset_code[3]}
                  </Typography>
               </td>
               <td style={{ border: "2px solid black" }}>
                  <Typography variant="body2" fontWeight="bold" textAlign="center" color="black">
                     {asset_code[4]}
                  </Typography>
               </td>
            </tr>
            <tr>
               <td colSpan={5} style={{ border: "2px solid black", padding: "0px 10px" }}>
                  <Typography
                     variant="p"
                     fontWeight="bold"
                     textAlign="center"
                     color="black"
                  >{`${props.data.asset_name} - ${props.data.employee.name} - ${props.data.department.dept}`}</Typography>
               </td>
            </tr>
         </tbody>
      </table>
   );
};
