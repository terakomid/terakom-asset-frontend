import React, { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Collapse, FormControl, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import http from "../../component/api/Api";

export default function ResetPassword() {
   const [error, setError] = useState();
   const [alert, setAlert] = useState(false);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [data, setData] = useState({
      email: "",
   });
   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      setAlert(false);
      setLoading(true);
      let formData = new FormData();
      formData.append("email", data.email);
      await http
         .post(`reset_password/mail`, formData)
         .then((res) => {
            setSuccess(true);
         })
         .catch((xhr) => {
            console.log(xhr.response);
            let err = xhr.response.data;
            if (err.message === "The given data was invalid.") {
               setAlert(true);
               setLoading(false);
               setError("Invalid email address.");
            }
         });
   };

   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
         <Card sx={{ width: "400px" }}>
            <CardContent sx={{ textAlign: "center", mt: 5 }}>
               <img alt="Logo" src="/assets/images/logo.webp" />
               {success === false ? (
                  <Box sx={{ px: 2 }}>
                     <Typography variant="h6" mt={5} mb={2} fontWeight="bold">
                        Forgot your password?
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        Please enter your email and we will send you a link to get back into your account.
                     </Typography>
                     <Box component="form" onSubmit={handleSubmit} mb={1}>
                        <Collapse in={alert} sx={{ my: 2 }}>
                           <Alert severity="error">{error}</Alert>
                        </Collapse>
                        <TextField
                           label="Email Address"
                           name="email"
                           type="email"
                           margin="normal"
                           value={data.email}
                           onChange={handleChange}
                           fullWidth
                           required
                           autoFocus
                        />
                        <FormControl margin="dense" fullWidth>
                           <LoadingButton type="submit" variant="contained" loading={loading}>
                              Send Request
                           </LoadingButton>
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                           <Button variant="outlined" component={RouterLink} to="/login">
                              Login
                           </Button>
                        </FormControl>
                     </Box>
                  </Box>
               ) : (
                  <Box sx={{ px: 2 }}>
                     <Box sx={{ my: 5 }}>
                        <CheckCircleOutlineRounded fontSize={"large"} />
                        <Typography variant="h6" my={2} fontWeight="bold">
                           Request Sent Successfully!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           Please check your email, we've sent a link confirmation.
                        </Typography>
                     </Box>
                     <Box component="form">
                        <FormControl margin="dense" fullWidth>
                           <Button variant="outlined" component={RouterLink} to="/login">
                              Ok
                           </Button>
                        </FormControl>
                     </Box>
                  </Box>
               )}
            </CardContent>
         </Card>
      </Box>
   );
}
