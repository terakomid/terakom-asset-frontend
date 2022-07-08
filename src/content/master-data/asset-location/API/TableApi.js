import React, { Component } from 'react'

import axios from "axios"
import { Get } from "react-axios"

const axiosInstance = axios.create({
    baseURL: 'http://10.54.8.30:8000/api/',
    timeout: 2000,
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmExMTg2ZTcxMjMyOGIyZjI5MzI5Zjk4M2ViZTFlODBmMjhhMDAwYTRmMmVjNjc5ZjgzYTQxYmVmNDEzNTdhOGVjZmRjMzdmZDdiY2I2NzciLCJpYXQiOjE2NTcxNzM5MjMuNzQxNTE1LCJuYmYiOjE2NTcxNzM5MjMuNzQxNTIsImV4cCI6MTY4ODcwOTkyMy42Nzc5NzQsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.gl8LmVqxINuwnuivlGI4R3wd1a1WU5gqVa8MwJ13ZJDsa32ORFwIibvXUjWWZ-p8-3B6mpgVB5L32QC7l2U8tDaEjK79rPEQtL-2eYIi-SFGOvhrefIVRNZu_p9S_j1DkTmq-L6Y4WVvOLx_kqxJF2HYiZqdjd-EGxn6BK_42blBRVyVzN1AuAfcF5IhTiEdDmrCGc0UEtrAbKq7cAQCc_LFpnch5A6XjgXvKaFjr5vAQF3g7ESDU8caIjhbdv0Oh7F7yEnUvLenWLfw6C3lMyyaH1KteCMu0bomoH3dWhejWS8lTegr8BGytiB71Bz85ebyOmMIrUScTTJ7e2kPPnLZPf1wXXtRyGICR1uTdSwXaiz3OoxiShGzyNfXFtqMLR-r7ZySO8bMcPFq2abgMwi94h1Lxq7Z5W57XP7B6sJVpDkL99ZnmiU2NsZEgyKIZIpBsfeyuJfw3HstOznjoE-ILTvGcCPruiEadEodpGy_4nMwdsZe4zbvcmx9VKIk0k2o9RNu8SREQ8tNcqifblSETEEUAP1aj8Qi5G56xl0N1dG2Juf-iKgT1umPjwfiXQ0o2RMF8g4mUFLhZedc3L8cYD2kY3-LOCwfBeKlad77HGwr2iWeoh95FC2Nr1-hCfl9K3hioKBD6Vv0GL66GaObWVGNo0sIKEPHw-4LpJE'
    }
});

export function dataTable() {
    
    <Get url="location" instance={axiosInstance}>
        {(error, response, isLoading, makeRequest, axios) => {
            console.log(isLoading)

            return isLoading
        }}
    </Get>
}