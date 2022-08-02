import React from "react";
import { Box, Button, Card, CardContent, FormControl, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ForgotPassword() {
   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
         <Card sx={{ width: "400px" }}>
            <CardContent sx={{ textAlign: "center" }}>
               <img alt="Logo" src="/assets/images/logo.webp" />
               <Typography variant="h6" mt={5} mb={3} fontWeight="bold">
                  Forgot your password?
               </Typography>
               <Typography variant="caption">
                  Please enter the email address associated with your account and We will email you a link to reset your password.
               </Typography>
               <Box component="form" px={2} mt={5} mb={1}>
                  <TextField label="Email" margin="normal" fullWidth required autoFocus />
                  <FormControl margin="dense" fullWidth>
                     <Button variant="contained">Send Request</Button>
                  </FormControl>
                  <FormControl margin="dense" fullWidth>
                     <Button variant="outlined" component={RouterLink} to="/login">
                        Login
                     </Button>
                  </FormControl>
               </Box>
            </CardContent>
         </Card>
      </Box>
   );
}
