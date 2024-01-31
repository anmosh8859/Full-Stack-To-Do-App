import './TodoApp.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import HeaderComponent from '../header/HeaderComponent'
import ListTodosComponent from '../todos/ListTodosComponent'
import LogoutComponent from '../logout/LogoutComponent'
import LoginComponent from '../login/LoginComponent'
import WelcomeComponent from '../welcome/WelcomeComponent'
// import FooterComponent from '../footer/FooterComponent'
import ErrorComponent from '../error/ErrorComponent'
import AuthProvider from '../security/AuthContext'

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/welcome/:username' element={<WelcomeComponent />} />
                        <Route path='/*' element={<ErrorComponent />} />
                        <Route path='/todos' element={<ListTodosComponent />} />
                        <Route path='/logout' element={<LogoutComponent />} />
                    </Routes>
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}