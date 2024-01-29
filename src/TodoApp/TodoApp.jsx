import { useState } from 'react'
import './TodoApp.css'
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'

export default function TodoApp(){
    return(
        <div className="TodoApp">

            <HeaderComponent />

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome/:username' element={<WelcomeComponent />} />
                    <Route path='/*' element={<ErrorComponent />} />
                    <Route path='/todos' element={<ListTodosComponent />} />
                    <Route path='/logout' element={<LogoutComponent />} />
                </Routes>
            </BrowserRouter>

            <FooterComponent />

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


    const[errorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate()

    function handleSubmit(){
        if(username==='anand' && password==='pass'){
            console.log('success')
            setSuccessMessage(true)
            setErrorMessage(false)
            navigate(`/welcome/${username}`)
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

    const {username} = useParams()



    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>Manage your todos - <Link to="/todos">Go here</Link></div>
        </div>
    )
}

function ErrorComponent(){
    return(
        <div className="ErrorComponent">
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404. Reach out to our team at ABC-DEF-GHIJ.
            </div>
        </div>
    )
}

function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth, today.getDay())

    const todos = [
                    {id:1, description: 'Learn AWS', done:false.toString(), targetDate: targetDate.toString()},
                    {id:2, description: 'Learn Azure', done:false.toString(), targetDate: targetDate.toString()},
                    {id:3, description: 'Learn Kubernet', done:false.toString(), targetDate: targetDate.toString()}
                ]

    return(
        <div className="container">
            <h1>Things you want to do!</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                               todo=>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done}</td>
                                    <td>{todo.targetDate}</td>
                                </tr>
                               )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function HeaderComponent(){
    return(
        <div className="header">
            Header <hr />
        </div>
    )
}

function FooterComponent(){
    return(
        <div className="footer">
            <hr /> Footer 
        </div>
    )
}

function LogoutComponent(){
    return(
        <div className="LogoutComponent">
            <h1>You are logged out!</h1>
            <div>
                Thank you for using our App. Come back soon!    
            </div>
        </div>
    )
}