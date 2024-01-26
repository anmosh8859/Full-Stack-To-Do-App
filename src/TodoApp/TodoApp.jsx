export default function TodoApp(){
    return(
        <div className="TodoApp">
            Todo Management Application
            <LoginComponent />
            {/* <WelcomeComponent /> */}
        </div>
    )
}

function LoginComponent(){
    return (
        <div className="Login">
            Login Component
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