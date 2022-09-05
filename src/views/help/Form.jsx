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
   InputBase,
   Chip,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Menu,
   ListItemIcon,
   Tooltip,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import http from "../../component/api/Api";
import { Close, Delete, DeleteForever, FileUploadOutlined, InsertDriveFile,  } from "@mui/icons-material";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import { produce } from "immer";
import moment from "moment";

const Form = (props) => {
	const navigate = useNavigate();
	const [id, setId] = useState('')
	const [rows, setRows] = useState([])
	const [form, setForm] = useState({
		title: "",
		purpose: "",
		status: "",
		category: "",
	});
	const [document, setDocument] = useState({
		file: '',
		file_url: ''
	})
	const [loading, setLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [errors, setErrors] = useState({});

	const [params, setParams] = useState({
        search: "",
        order_by_name: 0,
        limit: 10,
        page: 1,
		paginate: 0,
    });

	
	
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (props.data) {
				const data = props.data
				setForm({
					...form,
					title: data.title,
					purpose: data.purpose,
					status: data.status,
				})
				setId(data.id)
				setDocument({
					...document,
					file_url: data.file
				})
				setIsComplete(true);
			}else{
				setIsComplete(true);
			}
		}

		return () => (mounted = false);
	}, [props]);

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
		formData.append('title', form.title)
		formData.append('purpose', form.purpose)
		formData.append('category', form.category)

		// setTimeout(() => {
		// 	console.log(Object.fromEntries(formData))
		// 	setLoading(false)
		// }, 500);
		if (props.title == "add") {
			if(document.file !== "") formData.append('file', document.file)
			http
				.post("help", formData)
				.then((res) => {
					// console.log(res.data)
					navigate("/help");
				})
				.catch((err) => {
					console.log(err.response)
				})
				.finally((res) => {
					setLoading(false);
				});
		} else {
			if (document.file !== "") formData.append("file", document.file);
			formData.append('status', form.status)
			formData.append("_method", "PUT");
			console.log(Object.fromEntries(formData))
			http
				.post(`help/${id}`, formData)
				.then((res) => {
					// console.log(res.data)
					navigate("/help");
				})
				.catch((err) => {
					console.log(err.response)
				})
				.finally((res) => {
					setLoading(false);
				});
		}
	};

	return (
		<Grid container spacing={2}>
			{isComplete && 
			<Grid item md xs={12}>
				<Card>
					<CardContent>
						<Box component="form" onSubmit={onSubmit} autoComplete="off">
							<Grid container spacing={3} alignItems="center" >
								<Grid item xs={12} md={6}>
									<TextField 
										name="title" 
										label="Title" 
										fullWidth 
										value={form.title} 
										onChange={onChange} 
									/>
								</Grid>
								<Grid item xs={12} md={6}>
								{
									document.file_url !== "" ? (
										<TextField
											variant="outlined"
											label="Supporting Document *"
											value={document.file_url.split('/').pop()}
											disabled
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<InsertDriveFile />
													</InputAdornment>
												),
												endAdornment: (
													<InputAdornment position="end">
														<Tooltip title="Delete">
															<IconButton onClick={() => setDocument({ 
																file: '',
																file_url: '' 
															})}>
																<Close />
															</IconButton>
														</Tooltip>
													</InputAdornment>
												),
											}}
											fullWidth
										/>
									) : (
										<Button size="large" variant="outlined" component="label" fullWidth startIcon={<FileUploadOutlined />}>
											Supporting Document *
											<input 
												name="document" 
												type="file" 
												onChange={(e) => {
													let file = e.target.files[0]
													let file_url = file.name
													setDocument({
														file,
														file_url
													})
												}}
												hidden 
											/>
										</Button>
									)
								}
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField 
										name="category" 
										value={form.category} 
										onChange={onChange} 
										label="Category"
										fullWidth
										select 
									>
										<MenuItem value="it">IT</MenuItem>
										<MenuItem value="non_it">NON-IT</MenuItem>
									</TextField>
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField 
										name="purpose" 
										label="Purpose"
										multiline
										rows={4} 
										fullWidth 
										value={form.purpose} 
										onChange={onChange} />
								</Grid>
								
							</Grid>
							<LoadingButton sx={{ display: "flex", mt: 3, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
								{props.title !== "add" ? "Save" : "Create"}
							</LoadingButton>
						</Box>
					</CardContent>
				</Card>
			</Grid>
			}
			{!isComplete && (
				<Grid item xs={12} md={12}>
					<Loading />
				</Grid>
			)}
		</Grid>
	);
};

export default Form;
