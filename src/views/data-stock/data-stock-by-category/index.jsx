import React, { useEffect, useState } from "react";
import {
   Button,
   Box,
   Card,
   CardContent,
   Grid,
   IconButton,
   InputAdornment,
   MenuItem,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
   Stack,
   Menu,
   ListItemIcon,
   FormControl,
   TablePagination,
   Link,
} from "@mui/material";
import { CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import http from "../../../component/api/Api";
import { Link as RouterLink, useParams } from "react-router-dom";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { Capitalize } from "../../../component/Format";
import { exportTableToExcel } from "../../../help/ExportToExcel";

export default function index() {
   const { user } = useRecoilValue(authentication);
   const { enqueueSnackbar } = useSnackbar();
   const { id } = useParams()
   const [rows, setRows] = useState();
   const [category, setCategory] = useState([])
   const [data, setData] = useState({
      code: "",
      category: "",
   });
   const [error, setError] = useState("");
   const [params, setParams] = useState({
      search: "",
   });

   const getData = async () => {
      http
         .get(`category`, {
            params: params,
         })
         .then((res) => {
            // console.log(res.data.data);
            // setRows(res.data.data);
            setCategory(res.data.data)
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };
   const setDataDummy = () => {
    setRows([
        {
            asset_code: '2005/FA/65D5/ID01/110000000006',
            asset_name: 'LAPTOP ACER NX.A28SN.007',
            category: 'Computer'
        },
        {
            asset_code: '2022/FA/65D1/ID08/20000001896',
            asset_name: 'LAPTOP ASUS NX.A28SN.007',
            category: 'Computer'
        },
    ]);
   }

   useEffect(() => {
      setRows(undefined);
      let timer = setTimeout(() => {
         if (params) setDataDummy();
         if(category.length == 0) getData()
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params]);

   const [method, setMethod] = useState("add");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      if (method === "add") {
         let formData = new FormData();
         formData.append("code", data.code);
         formData.append("category", data.category);
         // console.log(Object.fromEntries(formData));
         http
            .post(`category`, formData)
            .then((res) => {
               // console.log(res.data.data);
               handleClear();
               getData();
               enqueueSnackbar(Capitalize(res.data.meta.message), { variant: "success" });
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
            })
            .finally(() => {
               setLoading(false);
            });
      } else {
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("code", data.code);
         formData.append("category", data.category);
         http
            .post(`category/${data.id}`, formData)
            .then((res) => {
               // console.log(res.data.data);
               setMethod("add");
               handleClear();
               getData();
               enqueueSnackbar(Capitalize(res.data.meta.message), { variant: "success" });
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleClear = (e) => {
      setMethod("add");
      setError("");
      setData({
         code: "",
         category: "",
      });
   };

   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };

   const handleSearch = (e) => {
      setPage(0);
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
   };

   const handleEdit = () => {
      setMethod("edit");
      setData(staging);
      setError("");
      handleMenu();
   };

   const handleExport = async () => {
      exportTableToExcel("#table-export", "Asset-Category");
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`category/${staging.id}`)
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
         })
         .catch((err) => {
            // console.log(err.response.data);
            setLoading(false);
         });
   };

   const [staging, setStaging] = useState();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event, value) => {
      setAnchorEl(event.currentTarget);
      setStaging(value);
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2">
                  <h3 className="fw-bold mb-0">Data Stock Category - {category.find(v => v.id == id)?.category}</h3>
               </div>
               <div className="row">
                  <div
                     className={`${
                        Permission(user.permission, "create category") || Permission(user.permission, "update category") ? "col-xl-12" : ""
                     } col-12 mt-3`}
                  >
                     <Card>
                        <CardContent>
                           <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs>
                                 <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search"
                                    autoComplete="off"
                                    onChange={handleSearch}
                                    value={params.search}
                                    InputProps={{
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <Search fontSize="small" />
                                          </InputAdornment>
                                       ),
                                       endAdornment: params.search !== "" && (
                                          <InputAdornment position="end">
                                             <IconButton onClick={() => setParams({ ...params, search: "" })}>
                                                <CloseRounded />
                                             </IconButton>
                                          </InputAdornment>
                                       ),
                                    }}
                                    fullWidth
                                 />
                              </Grid>
                           </Grid>
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
                                       <TableCell>Asset Code</TableCell>
                                       <TableCell>Asset Name</TableCell>
                                       <TableCell>Category</TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows !== undefined ? (
                                       rows.length > 0 ? (
                                          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                             <TableRow key={key}>
                                                <TableCell component="th" scope="row" align="center">
                                                   {page * rowsPerPage + key + 1}.
                                                </TableCell>
                                                <TableCell>
                                                      {value.asset_code}
                                                   {/* <Link component={RouterLink} to={`/data-stock/${value.id}`}>
                                                   </Link> */}
                                                </TableCell>
                                                <TableCell>{value.asset_name}</TableCell>
                                                <TableCell>{value.category}</TableCell>
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
                           {rows !== undefined && rows.length > 0 && (
                              <TablePagination
                                 rowsPerPageOptions={[5, 10, 25]}
                                 component="div"
                                 count={rows.length}
                                 page={page}
                                 rowsPerPage={rowsPerPage}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                                 showFirstButton
                                 showLastButton
                              />
                           )}
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
