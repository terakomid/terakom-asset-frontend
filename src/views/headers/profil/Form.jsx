import React, { useState, useEffect } from "react";
import {
   Card,
   Grid,
   CardContent,
   Avatar,
   Stack,
   Typography,
   TextField,
   Box,
   MenuItem,
   Button,
   OutlinedInput,
   InputLabel,
   FormControl,
   InputAdornment,
   FormHelperText,
   IconButton,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import http from "../../../component/api/Api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/Loading";
import { useRecoilState } from "recoil";
import { authentication } from "../../../store/Authentication";

const Form = (props) => {

    const [auth, setAuth] = useRecoilState(authentication);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        employ_code: "",
        full_name: "",
        phone_number: "",
        email: "",
        department: "",
        role: "",
        address: "",
        location_id: "",
        status: "1",
        old_password: "",
        password: "",
        password_confirmation: "",
    });
    const [image, setImage] = useState({
        image_preview: "",
        image_file: "",
    });
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [errors, setErrors] = useState({});
    
    const resetDataUser = async () => {
        let auth = false;
        let user = null;
        try {
            const { data } = await http.get(`/profile`);
            auth = data.meta.status === "success" ? true : false;
            user = data.data;
        } catch {
            auth = false;
            user = null;
        }
        setAuth({
            auth,
            user,
        })
    }

    const getDepartment = async () => {
        const res = await http.get(`dept`);
        setDepartmentOptions([...res.data.data]);
        return 1;
    };

    const getRole = async () => {
        const res = await http.get(`role`);
        setRoleOptions([...res.data.data]);
        return 1;
    };

    const getLocation = async () => {
        const res = await http.get('location')
        setLocationOptions([...res.data.data])
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            Promise.all([getDepartment(), getRole(), getLocation()]).then((res) => {
                setIsComplete(true);
                if (auth.auth) {
                    const data = auth.user;
                    setForm({
                        ...form,
                        employ_code: data.code,
                        full_name: data.name,
                        phone_number: data.phone_number === null ? "" : data.phone_number,
                        email: data.email,
                        department: data.dept.id,
                        role: data.role,
                        location_id: data.location === null ? "" : data.location.id,
                        address: data.address === null ? "" : data.address,
                        status: data.status,
                    });
                    setImage({
                        ...image,
                        image_preview: data.photo_url === null ? "" : data.photo_url,
                    });
                
                }
            });
        }

        return () => (mounted = false);
    }, [props]);

    const handleImage = (e) => {
        let image_preview = URL.createObjectURL(e.target.files[0]);
        let image_file = e.target.files[0];
        setImage({
            image_preview,
            image_file,
        });
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("code", form.employ_code);
        formData.append("name", form.full_name);
        formData.append("phone_number", form.phone_number);
        formData.append("email", form.email);
        formData.append("department_id", form.department);
        formData.append("location_id", form.location_id);
        formData.append("address", form.address);
        formData.append("status", form.status);
        formData.append("role", form.role);

        if (image.image_file !== "") formData.append("photo", image.image_file);
            formData.append("_method", "PUT");
            http
                .post(`user/${auth.user.id}`, formData)
                .then((res) => {
                    resetDataUser().then(res => {
                        navigate("/user-list");
                    })
                })
                .catch((err) => {
                    if(err.response){
                        setErrors(err.response.data.errors)
                    }
                })
                .finally((res) => {
                    setLoading(false);
                });
    };

    return (
        <div className='main-content'>
            <div className="page-content">
                <div className="container-fluid">
                    <div className='row'>
                    <Grid container spacing={2}>
                    {isComplete && (
                        <>
                        <Grid item md={4} xs={12}>
                            <Card>
                                <CardContent>
                                    <Stack direction="column" alignItems={"center"}>
                                    <input
                                        onChange={handleImage}
                                        type="file"
                                        name="image"
                                        style={{ display: "none" }}
                                        id="image"
                                        accept="image/png, image/gif, image/jpeg, image/jpg"
                                        required
                                    />
                                    <Box component="label" htmlFor="image">
                                        <Avatar
                                            sx={{ height: "20vh", width: "20vh", boxShadow: 1, mb: 2, cursor: "pointer" }}
                                            alt="Remy Sharp"
                                            src={image.image_preview !== "" ? image.image_preview : "/assets/images.default.png"}
                                        />
                                    </Box>
                                    <Typography color="primary" variant="caption">
                                        Allowed *.jpeg, *.jpg, *.png, *.gif,{" "}
                                    </Typography>
                                    <Typography variant="caption">Max Size 3.1 MB </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md xs={12}>
                            <Card>
                                <CardContent>
                                    <Box component="form" onSubmit={onSubmit} autoComplete="off">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                                name="employ_code" 
                                                label="Employe code" 
                                                fullWidth 
                                                value={form.employ_code} 
                                                onChange={onChange}
                                                required
                                                helperText={typeof errors?.code !== 'undefined' ? errors.code[0] : ''}
                                                error={typeof errors?.code !== 'undefined' ? true : false} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                                name="full_name" 
                                                label="Full Name" 
                                                fullWidth 
                                                value={form.full_name} 
                                                onChange={onChange} 
                                                helperText={typeof errors?.full_name !== 'undefined' ? errors.full_name[0] : ''}
                                                error={typeof errors?.full_name !== 'undefined' ? true : false} 
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                                name="phone_number" 
                                                label="Phone Number" 
                                                fullWidth 
                                                value={form.phone_number} 
                                                onChange={onChange} 
                                                helperText={typeof errors?.phone_number !== 'undefined' ? errors.phone_number[0] : ''}
                                                error={typeof errors?.phone_number !== 'undefined' ? true : false}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                                name="email" 
                                                label="Email" 
                                                fullWidth 
                                                value={form.email} 
                                                onChange={onChange} 
                                                helperText={typeof errors?.email !== 'undefined' ? errors.email[0] : ''}
                                                error={typeof errors?.email !== 'undefined' ? true : false}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                name="department"
                                                label="Department"
                                                fullWidth
                                                select
                                                value={form.department}
                                                onChange={onChange}
                                                disabled={!isComplete}
                                                required
                                            >
                                                {departmentOptions.length > 0 &&
                                                departmentOptions.map((v) => (
                                                    <MenuItem key={v.id} value={v.id}>
                                                        {v.dept}
                                                    </MenuItem>
                                                ))}
                                                {departmentOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField name="role" label="Role" fullWidth select value={form.role} onChange={onChange} disabled={!isComplete} required>
                                                {roleOptions.length > 0 &&
                                                roleOptions.map((v) => (
                                                    <MenuItem key={v.id} value={v.name}>
                                                        {v.name}
                                                    </MenuItem>
                                                ))}
                                                {roleOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField 
                                                name="location_id" 
                                                label="Location" 
                                                fullWidth 
                                                multiline 
                                                rows={4} 
                                                value={form.location_id} 
                                                onChange={onChange} 
                                                helperText={typeof errors?.location_id !== 'undefined' ? errors.location_id[0] : ''}
                                                error={typeof errors?.location_id !== 'undefined' ? true : false}
                                                select
                                            >
                                                {locationOptions.length > 0 &&
                                                locationOptions.map((v) => (
                                                    <MenuItem key={v.id} value={v.id}>
                                                    {`${v.code} - ${v.location}`}
                                                    </MenuItem>
                                                ))}
                                                {locationOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField 
                                                name="address" 
                                                label="Address" 
                                                fullWidth 
                                                multiline 
                                                rows={4} 
                                                value={form.address} 
                                                onChange={onChange} 
                                                helperText={typeof errors?.address !== 'undefined' ? errors.address[0] : ''}
                                                error={typeof errors?.address !== 'undefined' ? true : false}
                                            />
                                        </Grid>
                                    </Grid>
                                    <LoadingButton sx={{ display: "flex", mt: 2, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
                                        {props.title !== "add" ? "Save" : "Create"}
                                    </LoadingButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        </>
                    )}
                    {!isComplete && (
                        <Grid item xs={12} md={12}>
                        <Loading />
                        </Grid>
                    )}
                </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
