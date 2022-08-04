import React, { useState, useEffect } from 'react';
import Form from './Form';
import { useParams } from 'react-router-dom';
import http from '../../component/api/Api'

const Edit = () => {
    const [data, setData] = useState({})
    const { id } = useParams()
    const [isComplete, setIsComplete] = useState(false)

    const getData = async (id) => {
        setIsComplete(false)
        const res = await http.get(`/asset_disposal/${id}`)
        // console.log(res.data)
        setData(res.data.data)
        setIsComplete(true)
    }

    useEffect(() => {
        let m = true
        if(m){
            getData(id)
        }

        return () => m = false
    }, [id])

    return (
        <div className='main-content'>
            <div className="page-content">
                <div className="container-fluid">
                    <div className='row'>
                        {isComplete && 
                            <Form title="edit" data={data} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit