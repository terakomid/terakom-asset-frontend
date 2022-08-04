import React, { useState, useEffect } from 'react';
import Form from '../Form';
import http from '../../../../component/api/Api'
import { useParams } from 'react-router-dom';

const Detail = () => {
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
        setData(res.data.data)
        setIsComplete(true)
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
                            <Form title="edit" type="non-it" data={data} detail={true}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail