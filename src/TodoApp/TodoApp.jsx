export default function TodoApp(){
    return(
        <div className="TodoApp">
            {/* Todo Management Application */}
            <LoginComponent />
            {/* <WelcomeComponent /> */}
        </div>
    )
}

function LoginComponent(){
    return (
        <div className="Login">
            <div className="Login Form">
                <div>
                    <label>User Name</label>
                    <input type = "text" name = "username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type = "password" name = "username" />
                </div>
                <div>
                    <button type = "button" name="login">LogIn</button>
                </div>
            </div>
        </div>
    )
}
function WelcomeComponent(){
    return(
        <div className="Welcome">
            Welcome Component
        </div>
    )
}