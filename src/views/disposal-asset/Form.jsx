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
   CircularProgress,
   Autocomplete,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import http from "../../component/api/Api";
import { Close, Delete, DeleteForever, FileUploadOutlined, InsertDriveFile,  } from "@mui/icons-material";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import { produce } from "immer";
import moment from "moment";
import { useSnackbar } from "notistack";
import { NumberFormat } from "../../component/Format";


const Form = (props) => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar()
	const [id, setId] = useState('')
	const [rows, setRows] = useState([])
	const [tableData, setTableData] = useState([])
	const [disposalData, setDisposalData] = useState([])
	const [form, setForm] = useState({
		sk_number: "",
		description: "",
	});
	const [document, setDocument] = useState({
		file: '',
		file_url: ''
	})
	const [loading, setLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [errors, setErrors] = useState({});
	const [assetId, setAssetId] = useState([])
	const [disposalAssetId, setDisposalAssetId] = useState([''])

	const [params, setParams] = useState({
        search: "",
        order_by_name: 0,
        limit: 5,
        page: 1,
		paginate: 1,
    });

	const getData = () => {
		http
            .get(`/asset`, {
            	params: params,
            })
            .then((res) => {
           		setRows(res.data.data.data);
            })
            .catch((err) => {
            	//  console.log(err.response);
            });
	}
	const getDataMultipleAsset = () => {
		http
            .get(`/asset/get_multiple`, {
            	params: {
					ids: assetId
				},
            })
            .then((res) => {
				setTableData(res.data.data)
            })
            .catch((err) => {
            	//  console.log(err.response);
            });
	}
	useEffect(() => {
        setRows([]);
        let timer = setTimeout(() => {
        	if (params) getData();
        }, 500);
        	return () => clearTimeout(timer);

    }, [params]);
	useEffect(() => {
        getDataMultipleAsset()

    }, [assetId]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			Promise.all([getData()]).then((res) => {
				if (props.data) {
					const data = props.data
					setId(data.id)
					setForm({
						...form,
						sk_number: data.sk_number,
						description: data.description
					})
					if(data.document !== null){
						setDocument({
							...document,
							file_url: data.document
						})
					}
					const assetIdTemp = data.asset_disposal_data.map(v => v.asset.id)
					if(props.data.status === 'accepted'){
						setDisposalAssetId([...assetIdTemp])
						setDisposalData([...data.asset_disposal_data]);
					}else{
						setAssetId([...assetIdTemp])
					}
				}
				setIsComplete(true);
			});
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
		formData.append('sk_number', form.sk_number)
		formData.append('description', form.description)
		if (document.file !== "") formData.append("document", document.file);
		const assetIdTemp = [...new Set(assetId)]
		assetIdTemp.map((v, i) => {
			formData.append(`asset_disposal_data[${i}][asset_id]`, v)
		})

		// setTimeout(() => {
		// 	console.log(Object.fromEntries(formData))
		// 	setLoading(false)
		// }, 500);

		if (props.title == "add") {
			http
				.post("asset_disposal", formData)
				.then((res) => {
					// console.log(res.data)
					enqueueSnackbar("Add Disposal Successfull", { variant: 'success' })
					navigate("/disposal-asset");
				})
				.catch((err) => {
					// console.log(err.response)
				})
				.finally((res) => {
					setLoading(false);
				});
		} else {
			if (document.file !== "") formData.append("document", document.file);
			formData.append("_method", "PUT");
			http
				.post(`asset_disposal/${id}`, formData)
				.then((res) => {
					// console.log(res.data)
					enqueueSnackbar("Edit Disposal Successfull", { variant: 'success' })
					navigate("/disposal-asset");
				})
				.catch((err) => {
					// console.log(err.response)
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
										name="sk_number" 
										label="SK Number" 
										fullWidth 
										value={form.sk_number} 
										onChange={onChange} 
										disabled={props.title !== "add" && props.data.status === "accepted" ? true : false}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
								{
									document.file_url !== "" ? (
										<TextField
											variant="outlined"
											label="Supporting Document *"
											value={document.file_url}
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
															<IconButton disabled={props.title !== "add" && props.data.status === "accepted" ? true : false}  onClick={() => setDocument({ 
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
													let file_url = URL.createObjectURL(file)
													setDocument({
														file,
														file_url
													})
												}}
												hidden
												disabled={props.title !== "add" && props.data.status === "accepted" ? true : false} 
											 />
										</Button>
									)
								}
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField 
										name="description" 
										label="Description"
										multiline
										rows={4} 
										fullWidth 
										value={form.description} 
										onChange={onChange} 
										disabled={props.title !== "add" && props.data.status === "accepted" ? true : false}
									/>
								</Grid>
								<Grid item xs={12} md={12}>
									{/* Add */}
									{props.title !== "edit" &&
									<>
										<Autocomplete
											freeSolo
											disableClearable
											options={rows}
											fullWidth
											getOptionLabel={(option) => option.asset_name}
											inputValue={params.search}
											onInputChange={(event, newInputValue, reason) => {
												setParams({
													...params,
													search: reason === 'reset' ? '' : newInputValue
												})
											}}
											onChange={(e, value) => {
												setAssetId([...assetId, value.id])

											}}
											renderInput={(params) => (
											<TextField
												{...params}
												label="Search input"
												InputProps={{
												...params.InputProps,
												type: 'search',
												}}
											/>
											)}
										/>
									</>
									}

									{/* selain accepted */}
									{props.title !== "add" && props.data.status !== "accepted" && 
									<Grid item xs={12} md={12}>
										<Autocomplete
												freeSolo
												disableClearable
												options={rows}
												fullWidth
												getOptionLabel={(option) => option.asset_name}
												inputValue={params.search}
												onInputChange={(event, newInputValue, reason) => {
													setParams({
														...params,
														search: reason === 'reset' ? '' : newInputValue
													})
												}}
												onChange={(e, value) => {
													setAssetId([...assetId, value.id])

												}}
												renderInput={(params) => (
												<TextField
													{...params}
													label="Search input"
													InputProps={{
														...params.InputProps,
														type: 'search',
													}}
												/>
												)}
											/>
									</Grid>
									}


									{/* Accepted */}
									{props.title !== "add" && props.data.status === "accepted" && 
									<Grid container spacing={3}>
									{disposalAssetId.map((v, i) => {
										return (
											<Grid key={i} item xs={12} md={12}>
												<Stack direction={"row"} spacing={2} alignItems="center">
													<TextField
														id="outlined-select-currency"
														fullWidth
														label="Data Asset"
														disabled
														select
														value={v}
													>	
													{disposalData !== undefined && disposalData.length > 0 && disposalData.map(v => {
														return (
															<MenuItem key={v.asset.id} value={v.asset.id} disabled>{v.asset.asset_name}</MenuItem>
														)
													})}
													</TextField>
												</Stack>
												
											</Grid>
										)
									})}
									</Grid>
									}

								</Grid>
								<Grid item xs={12} md={12}>
									{assetId.length > 0 &&
									<TableContainer>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow
												sx={{
													"& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
													"& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
												}}
												>
												<TableCell align="center">No.</TableCell>
												<TableCell>Code Asset</TableCell>
												<TableCell>SAP Code </TableCell>
												<TableCell>Asset Name</TableCell>
												<TableCell>Category Asset</TableCell>
												<TableCell>Capitalized On</TableCell>
												<TableCell>Useful Life</TableCell>
												<TableCell>Acquisition Value</TableCell>
												<TableCell>Book Value</TableCell>
												<TableCell>Condition</TableCell>
												<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{tableData !== undefined ? (
												tableData.length > 0 ? (
													tableData.filter(v => assetId.includes(v.id)).map((value, key) => (
														<TableRow key={key}>
															<TableCell component="th" scope="row" align="center">
															{1 + key}.
															</TableCell>
															<TableCell>
															{value.asset_code}
															</TableCell>
															<TableCell>{value.sap_code}</TableCell>
															<TableCell>{value.asset_name}</TableCell>
															<TableCell>{value.category.category}</TableCell>
															<TableCell>{moment(value.capitalized).format('ll') }</TableCell>
															<TableCell>{value.sub_category.useful_life}</TableCell>
															<TableCell>{NumberFormat(value.acquisition_value, "Rp")}</TableCell>
															<TableCell>{NumberFormat(value.book_value, "Rp")}</TableCell>
															<TableCell>{value.condition.condition}</TableCell>
															<TableCell align="center">
																<IconButton 
																	onClick={() => {
																		if(assetId.length > 1){
																			setAssetId(currentAssetId => currentAssetId.filter((v, x) => v !== value.id))
																		}else{
																			setAssetId([])
																		}
																		// var index = array.indexOf(item);
																		// if (index !== -1) {
																		//   array.splice(index, 1);
																		// }
																	}}
																>
																	<DeleteForever color="error" />
																</IconButton>
															</TableCell>
														</TableRow>
													))
												) : (
													<TableRow>
													<TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
														<Loading />
													</TableCell>
												</TableRow>
												)
												) : (
												<TableRow>
													<TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
														<Loading />
													</TableCell>
												</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
									}

									{disposalAssetId[0] !== '' &&
									<TableContainer>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow
												sx={{
													"& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
													"& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
												}}
												>
												<TableCell align="center">No.</TableCell>
												<TableCell>Code Asset</TableCell>
												<TableCell>SAP Code </TableCell>
												<TableCell>Asset Name</TableCell>
												<TableCell>Category Asset</TableCell>
												<TableCell>Capitalized On</TableCell>
												<TableCell>Useful Life</TableCell>
												<TableCell>Acquisition Value</TableCell>
												<TableCell>Book Value</TableCell>
												<TableCell>Asset Condition</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{disposalData !== undefined ? (
												disposalData.length > 0 ? (
													disposalData.map((value, key) => (
														<TableRow key={key}>
															<TableCell component="th" scope="row" align="center">
															{1 + key}.
															</TableCell>
															<TableCell>
															{value.asset.asset_code}
															</TableCell>
															<TableCell>{value.asset.sap_code}</TableCell>
															<TableCell>{value.asset.asset_name}</TableCell>
															<TableCell>{value.asset.category.category}</TableCell>
															<TableCell>{moment(value.asset.capitalized).format('ll') }</TableCell>
															<TableCell>{value.asset.sub_category.useful_life}</TableCell>
															<TableCell>{NumberFormat(value.asset.acquisition_value, "Rp")}</TableCell>
															<TableCell>{NumberFormat(value.asset.book_value, "Rp")}</TableCell>
															<TableCell>{value.asset.condition.condition}</TableCell>
														</TableRow>
													))
												) : (
													<TableRow>
														<TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={10}>
															No result found
															{params.search !== "" && (
															<div style={{ display: "inline-block" }}>
																&nbsp;for "<b>{params.search}</b>"
															</div>
															)}
															.
														</TableCell>
													</TableRow>
												)
												) : (
												<TableRow>
													<TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
														<Loading />
													</TableCell>
												</TableRow>
												)}
											</TableBody>
										</Table>
									</TableContainer>
									}
								</Grid>
							</Grid>
							<LoadingButton disabled={props.title !== "add" && props.data.status === "accepted" ? true : false} sx={{ display: "flex", mt: 3, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
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
