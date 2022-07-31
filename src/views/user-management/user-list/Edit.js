import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';
import http from '../../../component/api/Api'

const Edit = () => {
    const [data, setData] = useState({})
    const [complete, setComplete] = useState(false)
    const { id } =  useParams()
    
    useEffect(() => {
        let mounted = true
        if(mounted){
            (async() => {
                const res = await http.get(`user/${id}`)
                setData(res.data.data)
                setComplete(true)
            })()
        }

        return () => mounted = false
    }, [id])

    return (
        <div className='main-content'>
            <div className="page-content">
                <div className="container-fluid">
                    <div className='row'>
                        {complete &&
                            <Form title="edit" data={data} setComplete={setComplete} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit