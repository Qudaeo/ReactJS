import { useEffect, lazy, Suspense } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initialize} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {getInitialized} from "./redux/appSelectors";
import {Redirect} from "react-router";

const LoginContainer = lazy(() => import('./components/Login/LoginContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))

const App = props => {
    useEffect(() => {
        const initialize = props.initialize

        initialize()
    }, [props.initialize])

    if (!props.initialized) return <Preloader/>

    return (
        <div className={'app-wrapper'}>
            <HeaderContainer/>
            <Navbar/>

            <div className="app-wrapper-content">
                <Suspense fallback={<Preloader/>}>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/profile/:userId?/' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer pageTitle='Самураи'/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>

                    <Redirect from="/" to="/profile"/>
                </Suspense>
            </div>
        </div>
    )
}

let mapStateToProps = state => ({
    initialized: getInitialized(state)
})

export default connect(mapStateToProps, {initialize})(App);