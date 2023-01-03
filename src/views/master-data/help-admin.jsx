import React, { useEffect, useState } from "react";
import {
   Button,
   Autocomplete,
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
} from "@mui/material";
import { CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import http from "../../component/api/Api";
import Loading from "../../component/Loading";
import ModalDelete from "../../component/Delete";

import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";
import { ImportModal } from "../../component/ImportModal";
import { Capitalize } from "../../component/Format";
import { exportTableToExcel } from "../../help/ExportToExcel";

export default function HelpAdmin() {
   const { user } = useRecoilValue(authentication);
   const { enqueueSnackbar } = useSnackbar();

   const [rows, setRows] = useState();
   const [data, setData] = useState({
      user_id: "",
      category: "",
   });
   const [error, setError] = useState("");
   const [params, setParams] = useState({
      search: "",
   });
   
   const [employeeData, setEmployeeData] = useState([])
   const [employeeParams, setEmployeeParams] = useState({
        search: '',
        limit: 3,
        paginate: 1,
        vacant: 0,
        role: ["IT", "GA"]
   })

    const getDataEmployee = () => {
        http
            .get(`/user`, {
                params: employeeParams,
            })
            .then((res) => {
                setEmployeeData([...res.data.data.data])
            })
            .catch((err) => {
            });
    }
   const getData = async () => {
      http
         .get(`help_admin`)
         .then((res) => {
            // console.log(res.data.data);
            setRows([...res.data.data.data]);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };
   useEffect(() => {
        setEmployeeData([]);
        let timer = setTimeout(() => {
            if (employeeParams) getDataEmployee();
        }, 500);
        return () => clearTimeout(timer);

    }, [employeeParams]);

   useEffect(() => {
      setRows(undefined);
      let timer = setTimeout(() => {
         if (params) getData();
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
         formData.append("user_id", data.user_id);
         formData.append("category", data.category);
         // console.log(Object.fromEntries(formData));
         http
            .post(`help_admin`, formData)
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
         formData.append("_method", "patch");
         formData.append("user_id", data.user_id);
         formData.append("category", data.category);
         http
            .post(`help_admin/${staging.id}`, formData)
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
      setEmployeeParams({
        ...employeeParams,
        search: "",
      })
      setData({
        user_id: "",
        category: "",
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
      // console.log(staging)
      setData({
        ...data,
        category: staging.category,
        user_id: staging.user.id
      });
      setEmployeeParams({
        ...employeeParams,
        search: `${staging.user.code} - ${staging.user.name}`
      })
      setError("");
      handleMenu();
   };

   const handleExport = async () => {
      exportTableToExcel("#table-export", "Department");
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`help_admin/${staging.id}`)
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

   const [openModalImport, setOpenModalImport] = useState(false);
   const handleModalImport = () => {
      setOpenModalImport(!openModalImport);
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2">
                  <h3 className="fw-bold mb-0">Master Help Admin</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileDownload />} onClick={handleModalImport}>
                        Import
                     </Button>
                     {rows !== undefined &&
                        rows.length > 0 &&
                        <Stack direction="row" spacing={1}>
                           <Button variant="contained" startIcon={<FileUpload />} onClick={handleExport}>
                              Export
                           </Button>
                        </Stack>
                     }
                 </Stack>
               </div>
               <div className="row">
                  <div
                     className={`${
                        Permission(user.permission, "create department") || Permission(user.permission, "update department") ? "col-xl-6" : ""
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
                              <Table aria-label="simple table">
                                 <TableHead>
                                    <TableRow
                                       sx={{
                                          "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                          "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                       }}
                                    >
                                       <TableCell align="center">No.</TableCell>
                                       <TableCell>Name</TableCell>
                                       <TableCell>Category</TableCell>
                                       {Permission(user.permission, "update department") || Permission(user.permission, "delete department") ? (
                                          <TableCell align="center">Action</TableCell>
                                       ) : null}
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
                                                <TableCell>{value.user.name}</TableCell>
                                                <TableCell>{value.category === "it" ? "IT" : "Non IT"}</TableCell>
                                                {Permission(user.permission, "update department") || Permission(user.permission, "delete department") ? (
                                                   <TableCell align="center">
                                                      <IconButton onClick={(e) => handleClick(e, value)}>
                                                         <MoreVert />
                                                      </IconButton>
                                                   </TableCell>
                                                ) : null}
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
                     {rows !== undefined && rows.length > 0 && (
                        <table border={1} id="table-export" style={{ display: "none" }}>
                           <thead>
                              <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td>Category</td>
                              </tr>
                           </thead>
                           <tbody>
                              {rows.map((value, key) => {
                                 return (
                                    <tr key={key}>
                                       <td>{value.id}</td>
                                       <td>{value.dept}</td>
                                    </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     )}
                  </div>
                  <div
                     className={`${
                        Permission(user.permission, "create department") || Permission(user.permission, "update department") ? "col-xl-6 col-12 mt-3" : "d-none"
                     } `}
                  >
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                              {method === "add" ? "Add" : "Edit"} Help Admin
                           </Typography>
                           <Box component="form" noValidate={true} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <Autocomplete
                                            freeSolo
                                            disableClearable
                                            options={employeeData.filter(v => {
                                                    return !rows?.map(v => v.user.id).includes(v.id)
                                                })
                                            }
                                            fullWidth
                                            getOptionLabel={(option) => {
                                                return `${option.code} - ${option.name}`;
                                            }}
                                            inputValue={employeeParams.search}
                                            onInputChange={(event, newInputValue, reason) => {
                                                setEmployeeParams({
                                                    ...employeeParams,
                                                    search: newInputValue
                                                })
                                            }}
                                            onChange={(e, value) => {
                                                setData({
                                                    ...data,
                                                    category: value.role === "IT" ? "it" : "non-it",
                                                    user_id: value.id
                                                })
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Employ Name / PIC"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: "search",
                                                }}
                                            />
                                            )}
                                        />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Category"
                                        value={data.category}
                                        onChange={(e) => {
                                          setData({
                                             ...data,
                                             category: e.target.value
                                          })
                                        }}
                                    >
                                        <MenuItem value="it">IT</MenuItem>
                                        <MenuItem value="non-it">Non IT</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                              <FormControl margin="normal">
                                 <Stack direction="row" spacing={1}>
                                    <LoadingButton type="submit" loading={loading} variant="contained">
                                       Save
                                    </LoadingButton>
                                    <Button type="reset" onClick={handleClear} variant="outlined">
                                       Reset
                                    </Button>
                                 </Stack>
                              </FormControl>
                           </Box>
                        </CardContent>
                     </Card>

                     {/* utils */}
                     <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />

                     {/* menu */}
                     {Permission(user.permission, "update department") || Permission(user.permission, "delete department") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update department") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete department") && (
                              <MenuItem onClick={handleModal}>
                                 <ListItemIcon>
                                    <Delete />
                                 </ListItemIcon>
                                 Delete
                              </MenuItem>
                           )}
                        </Menu>
                     ) : null}
                     <ImportModal
                        buttonTitle={"Import Data Department (.xlsx)"}
                        handleClose={handleModalImport}
                        url={"dept/import_excel"}
                        open={openModalImport}
                        getData={getData}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
