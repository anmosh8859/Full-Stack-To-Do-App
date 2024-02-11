import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    const valueToBeUsed = {token, username, isAuthenticated, login, logout}

    // function login(username, password){
    //     if(username==='anand' && password==='pass'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     } 
    // }

    // async function login(username, password){

    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)

    //     // console.log(baToken + " " + 'YW5hbmQ6cGFzcw==')

    //     const response = await executeBasicAuthenticationService(baToken)

    //     try {
    //         if(response.status==200){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         apiClient.interceptors.request.use(
    //             (config) => {
    //                 config.headers.Authorization = baToken
    //                 return config
    //             }
    //         )

    //         return true
    //         }
    //         else{
    //             logout()
    //             return false
    //         }
    //     } catch(error){
    //         logout()
    //         return false
    //     }
    // }

    async function login(username, password){
        try {
            const response = await executeJwtAuthenticationService(username, password)

            if(response.status==200){     
                
                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true
            }
            else{
                logout()
                return false
            }
        } catch(error){
            logout()
            return false
        }
    }


    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }
    
    return(
       <AuthContext.Provider value={valueToBeUsed}>
        {children}
       </AuthContext.Provider> 
    )
}