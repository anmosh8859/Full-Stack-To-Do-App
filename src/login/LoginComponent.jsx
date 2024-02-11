import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../security/AuthContext'
function LoginComponent(){

    const authContext = useAuth()

    const [username, setUsername] = useState("anand")

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    const [password, setPassword] = useState('')

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    const[errorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(){
        if(await authContext.login(username, password)) navigate(`/welcome/${username}`)
        else setErrorMessage(true)
    }

    return (
        <header className="Login">
            
            <h1>Time to login</h1>
            {errorMessage && <div className='errorMessage'>Authenticated Failed, Please check your credentials.</div>}
            <div className="Login Form">
                <div>
                    <label>User Name</label>
                    <input type = "text" name = "username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type = "password"  name = "password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type = "button" name="login" onClick={handleSubmit}>LogIn</button>
                </div>
            </div>
        </header>
    )
}

export default LoginComponent