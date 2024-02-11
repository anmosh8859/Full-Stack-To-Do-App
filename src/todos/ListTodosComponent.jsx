import { useEffect, useState } from "react";
import { retrieveAllTodosForUsername, deleteTodoApi } from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){

    const [todos, setTodos] = useState([])

    const username = useAuth().username

    const navigate = useNavigate()

    const [message, setMessage] = useState(null)

    function refreshTodos(){

        retrieveAllTodosForUsername(username)
        .then(response => {
            setTodos(response.data)
        })
        .catch(error => console.log(error))

    }

    useEffect( () =>{refreshTodos()}, [])

    function deleteTodo(id){
        deleteTodoApi(username, id)
        .then(
            ()=>{
                setMessage(`Deletion of todo with id: ${id} is successful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function addTodo(){
        navigate('/todo/-1')
    }

    return(
        <div className="container">
            <h1>Things you want to do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                            <td>Update</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                               todo=>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                               )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent