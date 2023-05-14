import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Nav} from "./Components/Nav/Nav";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {Sidebar} from "./Components/Sidebar/Sidebar";
import {addPost, RootStateType, updateNewPostText} from "./redux/state";


const App = (props: RootStateType) => {


    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Nav/>
                <div className='App-content'>
                    <Route path='/profile'
                           render={() =>
                               <Profile
                                   posts={props.profilePage.posts}
                                   addPostCallback={addPost}
                                   updateNewPostText={updateNewPostText}
                                   newPostText={props.profilePage.newPostText}/>}/>
                    <Route path='/dialogs'
                           render={() =>
                               <Dialogs dialogs={props.dialogsPage.dialogs} messages={props.dialogsPage.messages}/>}/>
                    <Route path='/news'
                           render={() =>
                               <News/>}/>
                    <Route path='/music'
                           render={() =>
                               <Music/>}/>
                    <Route path='/settings'
                           render={() =>
                               <Settings/>}/>
                </div>
                <Sidebar/>
            </div>
        </BrowserRouter>
    );
}

export default App;
