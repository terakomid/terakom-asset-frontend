import React, { useState } from "react";
import {
   Alert,
   Box,
   Button,
   Card,
   CardContent,
   Collapse,
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   TextField,
   Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CheckCircleOutlineRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import http from "../../component/api/Api";

export default function NewPassword() {
   const { token } = useParams();
   const [error, setError] = useState();
   const [alert, setAlert] = useState(false);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [data, setData] = useState({
      password: "",
      password_confirmation: "",
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
      formData.append("token", token);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      await http
         .post(`reset_password/token`, formData)
         .then((res) => {
            setSuccess(true);
         })
         .catch((xhr) => {
            console.log(xhr.response);
            let err = xhr.response.data;
            if (err.data) {
               if (err.data.message === "expired token !") {
                  setAlert(true);
                  setLoading(false);
                  setError("Expired link.");
               }
            } else {
               if (err.message === "The given data was invalid.") {
                  setAlert(true);
                  setLoading(false);
                  setError("The password confirmation does not match.");
               }
            }
         });
   };

   const [visibility, setVisibility] = useState({
      password: false,
      confirmation: false,
   });
   const handleClickShowPassword = (name) => {
      setVisibility({
         ...visibility,
         [name]: !visibility[name],
      });
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
         <Card sx={{ width: "400px" }}>
            <CardContent sx={{ textAlign: "center", mt: 5 }}>
               <img alt="Logo" src="/assets/images/logo.webp" />
               {success === false ? (
                  <Box sx={{ px: 2 }}>
                     <Typography variant="h6" mt={5} fontWeight="bold">
                        Create New Password
                     </Typography>
                     <Box component="form" onSubmit={handleSubmit} mb={1}>
                        <Collapse in={alert} sx={{ my: 2 }}>
                           <Alert severity="error">{error}</Alert>
                        </Collapse>
                        <FormControl margin="normal" variant="outlined" fullWidth>
                           <InputLabel>New Password *</InputLabel>
                           <OutlinedInput
                              name="password"
                              label="New Password"
                              type={visibility.password ? "text" : "password"}
                              onChange={handleChange}
                              inputProps={{ minLength: 8, maxLength: 32 }}
                              endAdornment={
                                 <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword("password")} onMouseDown={handleMouseDownPassword} edge="end">
                                       {visibility.password ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                    </IconButton>
                                 </InputAdornment>
                              }
                              fullWidth
                              required
                              autoFocus
                           />
                        </FormControl>
                        <FormControl margin="normal" variant="outlined" fullWidth>
                           <InputLabel>Password Confirmation *</InputLabel>
                           <OutlinedInput
                              name="password_confirmation"
                              label="Password Confirmation"
                              type={visibility.confirmation ? "text" : "password"}
                              inputProps={{ minLength: 8, maxLength: 32 }}
                              onChange={handleChange}
                              endAdornment={
                                 <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword("confirmation")} onMouseDown={handleMouseDownPassword} edge="end">
                                       {visibility.confirmation ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                    </IconButton>
                                 </InputAdornment>
                              }
                              fullWidth
                              required
                           />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                           <LoadingButton type="submit" variant="contained" loading={loading}>
                              Change Password
                           </LoadingButton>
                        </FormControl>
                     </Box>
                  </Box>
               ) : (
                  <Box sx={{ px: 2 }}>
                     <Box sx={{ my: 5 }}>
                        <CheckCircleOutlineRounded fontSize={"large"} />
                        <Typography variant="h6" my={2} fontWeight="bold">
                           Password Changed Successfully!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           Always keep your account safe. Change passwords periodically.
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
