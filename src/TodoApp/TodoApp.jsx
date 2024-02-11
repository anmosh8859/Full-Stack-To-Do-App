import './TodoApp.css'
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import HeaderComponent from '../header/HeaderComponent'
import ListTodosComponent from '../todos/ListTodosComponent'
import LogoutComponent from '../logout/LogoutComponent'
import LoginComponent from '../login/LoginComponent'
import WelcomeComponent from '../welcome/WelcomeComponent'
import FooterComponent from '../footer/FooterComponent'
import ErrorComponent from '../error/ErrorComponent'
import AuthProvider, { useAuth } from '../security/AuthContext'
import TodoComponent from '../todo/TodoComponent'

export default function TodoApp(){

    function AuthenticatedRoute({children}){
        const isAuthenticated = useAuth().isAuthenticated
        if(isAuthenticated) return children
        else return <Navigate to="/" />
    }

    return(
        <div className="TodoApp">
            <AuthProvider>
                <Router>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />

                        <Route path='/welcome/:username' element={
                        
                        <AuthenticatedRoute>
                            <WelcomeComponent />
                        </AuthenticatedRoute>
                        
                        } />
                        <Route path='/todos' element={
                    
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>
                            
                        } />
                        <Route path='/logout' element={
                    
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>

                        } />

                        <Route path='/todo/:id' element={
                    
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        
                        } />

                        <Route path='/*' element={
                    
                            <AuthenticatedRoute>
                                <ErrorComponent />
                            </AuthenticatedRoute>
                        
                        } />
                        
                    </Routes>
                    <FooterComponent />
                </Router>
            </AuthProvider>

        </div>
    )
}