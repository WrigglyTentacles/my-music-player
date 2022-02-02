import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function useAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
   

    useEffect(()=>{
        axios.post('http://localhost:3001/login',{
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            console.log('login complete token: ', res.data.accessToken)
        }).catch(() => {
            window.location= '/'
        })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        console.log('refreshing token standby for transmission expires in', expiresIn)
        
        axios.post('http://localhost:3001/refresh',{
            refreshToken,
        }).then((res) => {
            console.log('refresh done new token: ', res.data.accessToken)
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn) 
        }).catch(()=> {
            window.location = '/'
        })

    }, [refreshToken, expiresIn])

    return accessToken
};

