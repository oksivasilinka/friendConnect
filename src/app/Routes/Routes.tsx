import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from 'pages/usersPage'
import { Login } from 'pages/loginPage'
import ProfilePage from 'pages/profilePage/ProfilePage'
import ChatPage from 'pages/chatPage/ChatPage'
import { NewsPage } from 'pages/newsPage/NewsPage'


export const RoutesPages = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'/profile'} />} />
            <Route path='/profile/:userId?' element={<ProfilePage />} />
            <Route path='/users' element={<UsersPage pageTitle={'Users'} />} />
            <Route path='/news' element={<NewsPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/chat' element={<ChatPage />} />
        </Routes>
    )
}