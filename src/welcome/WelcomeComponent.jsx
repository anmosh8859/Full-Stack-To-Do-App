import { Link,useParams } from "react-router-dom"
import { useState } from "react"
import { retrieveHelloWorldBeanWithPathParam } from "../api/HelloWorldApiService"


function WelcomeComponent(){

    const {username} = useParams()

    const [message, setmessage] = useState(null)

    function callHelloWorldRestAPI(){

        retrieveHelloWorldBeanWithPathParam(username)
            .then( (response)=> succussfulResponse(response) )
            .catch( (error)=>errorResponse(error) )
            .finally( ()=> console.log('cleanup') )
            
    }

    function succussfulResponse(response) {
        setmessage(response.data.message)
        console.log(response)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>Manage your todos - <Link to="/todos">Go here</Link></div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI} >Call Hello World REST API</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent