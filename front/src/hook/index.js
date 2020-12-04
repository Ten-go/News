import {useState, useEffect, useCallback} from "react";

export default function useAuth() {
    const [auth, setAuth] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((id, creator) => {
        const myAuth = {id: id, creator: creator}
        localStorage.setItem('myAuth', JSON.stringify(myAuth))
        setAuth(myAuth)
    },[]) 

    const logout =  useCallback(() => {
        localStorage.removeItem('myAuth')
        setAuth(false)
    }, [])

    useEffect(()=>{
            console.log(auth)
        if (auth) return
        const key = localStorage.getItem('myAuth')
        if (key) setAuth(JSON.parse(key))
            else console.log("нет ключа")
        setReady(true)
    },[auth])

    return {auth, login, logout, ready}
}