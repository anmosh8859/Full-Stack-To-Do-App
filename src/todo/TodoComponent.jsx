import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { useEffect, useState } from "react"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../api/TodoApiService"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"

export default function TodoComponent(){

    const {id} = useParams()

    const[description, setDescription] = useState('')

    const[targetDate, setTargetDate] = useState('')

    const username = useAuth().username

    const navigate = useNavigate()

    function retrieveTodo(){
        if(id != -1){
            retrieveTodoApi(username, id)
            .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
            .catch(error=> console.log(error))
        }
    }

    useEffect(
        () => retrieveTodo(), [id]
    )

    function onSubmit(values){
        const todo = {
            id,
            username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if(id==-1){
            createTodoApi(username, todo)
            .then((response) => {
                console.log(response + 'creating')
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }else {
            updateTodoApi(username, id, todo)
            .then((response) => {
                console.log(response + 'updating')
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {
            
        }
        if(values.description.length<5)
            errors.description = `Enter atleast 5 characters! ${values.description} has ${values.description.length} characters only!`

        if(!moment(values.targetDate).isValid()){
            errors.targetDate ='Enter the target Date!'
        }
        console.log(values)

        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                    enableReinitialize = {true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur = {false}
                    validateOnChange = {false}
                >{
                        (props) => (
                            <Form>
                                <ErrorMessage name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage name="targetDate"
                                    component='div'
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className='form-control' name='description' />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className='form-control' name='targetDate' />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type='submit'>Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}