import { useState } from 'react'
import './TodoApp.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome' element={<WelcomeComponent />} />
                    <Route path='/*' element={<ErrorComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent(){

    const [username, setUsername] = useState("anand")

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    const [password, setPassword] = useState('')

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    const[successMessage, setSuccessMessage] = useState(false)

    // function ShowSuccessMessage(){
    //     if(successMessage){
    //         return (
    //             <div className='successMessage'>Authenticated Succefully</div>
    //         )
    //     } else return null
    // }

    const[errorMessage, setErrorMessage] = useState(false)

    // function ShowErrorMessage(){
    //     if(errorMessage){
    //         return (
    //             <div className='errorMessage'>Authenticated Failed, Please check your credentials.</div>
    //             )
    //     } else return null
    // }

    const navigate = useNavigate()

    function handleSubmit(){
        if(username==='anand' && password==='pass'){
            console.log('success')
            setSuccessMessage(true)
            setErrorMessage(false)
            navigate('/welcome')
        }
        else{
            console.log('failed')
            console.log(username)
            console.log(password)
            setSuccessMessage(false)
            setErrorMessage(true)
        } 
    }

    return (
        <div className="Login">
            {/* <ShowErrorMessage/>
            <ShowSuccessMessage/> */}

            <h1>Time to login</h1>
            {errorMessage && <div className='errorMessage'>Authenticated Failed, Please check your credentials.</div>}
            {successMessage && <div className='successMessage'>Authenticated Succefully</div>}
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
        </div>
    )
}
function WelcomeComponent(){
    return(
        <div className="WelcomeComponent">
            <h1>Welcome Component</h1>
        </div>
    )
}

function ErrorComponent(){
    return(
        <div className="ErrorComponent">
            <h1>Error</h1>
        </div>
    )
}