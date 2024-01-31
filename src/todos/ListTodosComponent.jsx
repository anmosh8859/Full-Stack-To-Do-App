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

export default ListTodosComponent