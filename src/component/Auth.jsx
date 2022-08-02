import React from "react";
import { Box } from "@mui/material";

export default function Auth(props) {
   const background = {
      backgroundImage: `url("/assets/images/background.webp")`,
      backgroundReapet: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "100vh",
   };
   const overlay = {
      background: `rgba(13, 76, 146, 0.5)`,
      height: "100vh",
   };

   return (
      <Box sx={background}>
         <Box sx={overlay}>{props.render}</Box>
      </Box>
   );
}
