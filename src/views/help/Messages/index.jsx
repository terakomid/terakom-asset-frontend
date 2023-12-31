import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Stack, Typography, Box, TextField, InputAdornment, Input, OutlinedInput, FormControl, InputBase, Rating } from '@mui/material'
import { AttachFile, CloseOutlined, Download, InsertDriveFile, MoreVert, Send, SendTimeExtensionRounded, Summarize } from '@mui/icons-material';
import moment from 'moment';
import http from '../../../component/api/Api'
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authentication } from '../../../store/Authentication';

const LeftMessage = (props) => {
    return (
        <Box sx={{ mr: 'auto', my: 1, display: 'flex', flexDirection: 'column',  backgroundColor: '#fff', width: '50%', borderRadius: 5, p: 2, color: 'black'}}>
            <Typography sx={{ mr: 'auto' }}>{props.message}</Typography>
            {props.attachment !== null && 
                <IconButton component="a" target="_blank" href={props.attachment}>
                    <Typography sx={{ mx: 2, fontSize: '12px' }}>{props.attachment.split('/').pop()}</Typography> 
                    <Download />
                </IconButton>
            }
            <Typography sx={{ ml: 'auto', fontSize: '12px' }}>{moment(props.tanggal).fromNow()}</Typography>
        </Box>
    )
}
const RightMessage = (props) => {
    return (
        <Box sx={{ ml: 'auto', my: 1, display: 'flex', flexDirection: 'column',  backgroundColor: '#7aff7a', width: '50%', borderRadius: 5, p: 2, color: 'black' }}>
            <Typography sx={{ mr: 'auto' }}>{props.message}</Typography>
            {props.attachment !== null && 
                <IconButton component="a" target="_blank" href={props.attachment}>
                  <Typography sx={{ mx: 2, fontSize: '12px' }}>{props.attachment.split('/').pop()}</Typography> 
                  <Download />
                </IconButton>
            }
            <Typography sx={{ ml: 'auto', fontSize: '12px' }}>{moment(props.tanggal).fromNow()}</Typography>
        </Box>
    )
}

const Index = (props) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useRecoilState(authentication)

    const [data, setData] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const [message, setMessage] = useState('')
    const [document, setDocument] = useState({
        file: '',
        file_url: ''
    })
    const [rating, setRating] = useState(0)
    const [loadingRating, setLoadingRating] = useState(false)
    const getData = async () => {
        setIsComplete(false)
        const res = await http.get(`/help_message?help_id=${props.data.id}`)
        setData([...res.data.data])
        setIsComplete(true)
    }
    useEffect(() => {
        let mounted = true
        if(mounted && props.data){
            getData()
        }

        return () => mounted = false
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('help_id', props.data.id)
        if(message !== '') formData.append('message', message)
        if(document.file !== '') formData.append('attachment', document.file)
        http.post(`/help_message`, formData)
            .then(res => {
                getData()
                setMessage('')
                setDocument({
                    file: '',
                    file_url: ''
                })
            })
            .catch(err => {
                // console.log(err.response)
            })
    }

    const onSubmitRating = (e) => {
        e.preventDefault()
        setLoadingRating(true)
        http.patch(`help/${props.data.id}/rating`, {}, {
            params: {
                rating,
            }
        })
        .then(res => {
            navigate('/help')
        })
        .catch(err => {
            if(err.response){
                console.log(err.response)
            }
        })
        .finally(() => {
            setLoadingRating(false)
        })
    }

    return (
        <Stack>
            <Typography variant="h5" sx={{ fontWeight: 'bold',  }}>Chat</Typography>
            <Grid container mt={5}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>Help Detail</Typography>
                            <Grid container spacing={3} marginTop={2}>
                                <Grid item xs={12} md={6}> 
                                    <TextField
                                        label="Title" 
                                        value={props.data.title}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}> 
                                    <TextField 
                                        value={moment(props.data.created_at).format('yyyy-MM-DD HH:mm')}
                                        disabled
                                        fullWidth
                                        label="Created At"
                                    />
                                </Grid>
                                {props.data.file !== null &&  
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Supporting Document *"
                                        value={props.data.file.split('/').pop()}
                                        disabled
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <InsertDriveFile />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment component="a" href={props.data.file} target="_blank"  position="end">
                                                    <Download />
                                                </InputAdornment>
                                            )
                                            
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                }
                                <Grid item xs={12} md={12}> 
                                    <TextField 
                                        value={props.data.purpose}
                                        disabled
                                        label="Purpose"
                                        fullWidth
                                    />
                                </Grid>
                                {props.data.status !== 'open' && props.data.rating === 0 && auth.user.id === props.data.created_by.id &&
                                <Grid item xs={12} md={12}>
                                    <Box component="form" onSubmit={onSubmitRating}> 
                                        <Grid container>
                                            <Grid item xs={12} md={12}>
                                                <Typography>Rating</Typography>
                                                <Rating 
                                                    value={rating}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <LoadingButton loading={loadingRating} variant="contained" type="submit">
                                                    Submit Rating
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                }
                                {props.data.status !== 'open' && props.data.rating !== 0 && 
                                <Grid item xs={12} md={12}>
                                    <Box component="form" onSubmit={onSubmitRating}> 
                                        <Grid container>
                                            <Grid item xs={12} md={12}>
                                                <Typography>Rating</Typography>
                                                <Rating 
                                                    value={props.data.rating}
                                                    readOnly
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                }
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ backgroundColor: '#0d4c92', color: 'white', height: '500px', overflowY: 'auto' }}>
                                        <CardHeader 
                                            avatar={
                                                <Avatar>
                                                    R
                                                </Avatar>
                                            }
                                            title={auth.user.role === "Employee" || auth.user.role === "Admin Department" ? 'Helper': props.data.created_by.name}
                                        />
                                        <CardContent sx={{ backgroundColor: '#f3f3f3',  }}>
                                        {isComplete &&
                                        <Stack sx={{ position: 'relative' }} minHeight={"500px"}>
                                            <Box sx={{ minHeight: '500px' }}>
                                            {data.length > 0 && data.map((v, i) => {
                                                if(auth.user.id === v.from.id){
                                                    return (
                                                        <RightMessage key={v.id} attachment={v.attachment} message={v.message} tanggal={v.created_at}/>
                                                    )
                                                }else{
                                                    return (
                                                        <LeftMessage key={v.id} attachment={v.attachment} message={v.message} tanggal={v.created_at} />
                                                    )
                                                }
                                            })}

                                            </Box>
                                            
                                            <Box component="form" sx={{ width: '100%', mt: 3, px: 3, py: 1, position: 'sticky', bottom: 25 }} onSubmit={onSubmit}>
                                                {document.file !== "" && 
                                                <FormControl sx={{ borderRadius: 25, backgroundColor: '#fff', pl: 1, p:1, mb: 1, width: '30%' }} variant="standard" fullWidth>
                                                    <InputBase
                                                        value={document.file_url}
                                                        fullWidth
                                                        id="standard-adornment-password"
                                                        disabled
                                                        startAdornment={
                                                            <>
                                                                <InputAdornment position="start">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        component="label"
                                                                    >   
                                                                    
                                                                        <Summarize />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            </>
                                                        }
                                                        endAdornment ={
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    component="label"
                                                                    onClick={() => setDocument({
                                                                        file: '',
                                                                        file_url: ""
                                                                    })}
                                                                >   
                                                                
                                                                    <CloseOutlined />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                }
                                                <FormControl sx={{ borderRadius: 25, backgroundColor: '#fff', p:1 }} variant="standard" fullWidth>
                                                    <InputBase
                                                        sx={{ pl: 1, }}
                                                        value={message}
                                                        disabled={props.data.status !== 'open' ? true : false}
                                                        fullWidth
                                                        id="standard-adornment-password"
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        endAdornment={
                                                            <>
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    component="label"
                                                                    disabled={props.data.status !== 'open' ? true : false}
                                                                >   
                                                                    <input type="file" hidden onChange={(e) => {
                                                                        let file = e.target.files[0]
                                                                        let file_url = file.name
                                                                        setDocument({
                                                                            file,
                                                                            file_url
                                                                        })
                                                                    }} />
                                                                    <AttachFile />
                                                                </IconButton>
                                                            </InputAdornment>
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    type="submit"
                                                                    disabled={props.data.status !== 'open' ? true : false}
                                                                >
                                                                    <Send />
                                                                </IconButton>
                                                            </InputAdornment>
                                                            </>
                                                        }
                                                    />
                                                </FormControl>
                                            </Box>
                                            
                                        </Stack>
                                        }
                                        </CardContent>
                                    </Card>

                                </Grid>
                            </Grid>
                        </CardContent>

                    </Card>

                </Grid>
            </Grid>
        </Stack>
        
    );
};

export default Index;