import React, { useState, useEffect } from 'react';
import Form from '../Form';
import http from '../../../../component/api/Api'
import { useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isComplete, setIsComplete] = useState(false)

    const getDataAssetById = async (id) => {
        setIsComplete(false)
        const res = await http.get(`asset/${id}`, {
            params: {
                by: 'id'
            }
        })
        setData(res.data)
        setIsComplete(true)
        console.log(res.data)
    }

    useEffect(() => {
        let m = true
        if(m){
            getDataAssetById(id)
        }

        return () => m = false
    }, [id])

    return (
        <div className='main-content'>
            <div className="page-content">
                <div className="container-fluid">
                    <div className='row'>
                        {isComplete &&
                            <Form title="edit" type="it" data={data} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit