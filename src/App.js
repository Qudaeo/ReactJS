import React from 'react'
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";

const App = (props) => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar
                store={props.store}
            />
            <div className="app-wrapper-content">
                <Route path='/dialogs' render={() => <DialogsContainer
                    store={props.store}
                />}/>
                <Route path='/profile' render={() => <Profile
                    store={props.store}
                />}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>

                <Route path='/friends' render={() => <FriendsContainer/>}/>

                <Route exact path='/' render={() => <Profile
                    store={props.store}
                />}/>
            </div>
        </div>
    );
}

export default App;