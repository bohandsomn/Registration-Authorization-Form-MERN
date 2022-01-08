import React from "react"
import { toast } from "react-toastify"
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import { connect } from 'react-redux'

import HomeComponent from "./Pages/HomeComponent.js"
import RegistrationComponent from "./Pages/RegistrationComponent.js"
import AuthorizationComponent from "./Pages/AuthorizationComponent.js"
import AboutComponent from "./Pages/AboutComponent.js"
import CabinetComponent from "./Pages/CabinetComponent.js"
import NotFound from "./Pages/404NotFound.js"

toast.configure()

function setToken(token) {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}
function setIsLogged(isLogged) {
    return {
        type: 'SET_LOGGED',
        payload: isLogged
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: false
        }
    }
    render = () => {
        const { token, setTokenAction, isLogged, setIsLoggedAction } = this.props

        return (
            <Router>
                <div className="container">
                    <header className="d-flex justify-content-center py-3">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Домашняя</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cabinet" className="nav-link">Кабинет</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">О нас</Link>
                            </li>
                            {
                                isLogged === false && 
                                <li className="nav-item">
                                    <Link to="/registration" className="nav-link">Войти</Link>
                                </li>
                            }
                            {    
                                isLogged === true &&
                                <li className="nav-item nav-link" onClick={() => {
                                    setTokenAction('');
                                    setIsLoggedAction(!isLogged);
                                    toast.success('Вы вышли из учетной записи');
                                }}>
                                    <span>Выйти</span>
                                </li>
                            }
                        </ul>
                    </header>
                    <Switch>
                        <Route exact path="/">
                            < HomeComponent />
                        </Route>
                        <Route path="/Registration">
                            < RegistrationComponent />
                        </Route>
                        <Route path="/Authorization">
                            < AuthorizationComponent 
                                token={token} 
                                setToken={setTokenAction} 
                                isLogged={isLogged}
                                setIsLoggedAction={setIsLoggedAction}
                            />
                        </Route>
                        <Route path="/Cabinet">
                            < CabinetComponent  
                                token={token} 
                                isLogged={isLogged}
                                setIsLoggedAction={setIsLoggedAction}
                            />
                        </Route>
                        <Route path="/About">
                            < AboutComponent />
                        </Route>
                        <Route>
                            < NotFound />
                        </Route>
                    </Switch>
                    <footer className="pt-4 my-md-5 pt-md-5 border-top">
                        <div className="row">
                            <div className="col-12 col-md">
                                <img className="mb-2" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24"></img>
                                <small className="d-block mb-3 text-muted">© 2021-2022</small>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Features</h5>
                                <ul className="list-unstyled text-small">
                                <li><p className="text-muted">Cool stuff</p></li>
                                <li><p className="text-muted">Random feature</p></li>
                                <li><p className="text-muted">Team feature</p></li>
                                <li><p className="text-muted">Stuff for dpvelopers</p></li>
                                <li><p className="text-muted">Another one</p></li>
                                <li><p className="text-muted">Last time</p></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Resources</h5>
                                <ul className="list-unstyled text-small">
                                <li><p className="text-muted">Resource</p></li>
                                <li><p className="text-muted">Resource name</p></li>
                                <li><p className="text-muted">Another resource</p></li>
                                <li><p className="text-muted">Final resource</p></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>About</h5>
                                <ul className="list-unstyled text-small">
                                <li><p className="text-muted">Team</p></li>
                                <li><p className="text-muted">Locations</p></li>
                                <li><p className="text-muted">Privacy</p></li>
                                <li><p className="text-muted">Terms</p></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = store => {
    return {
        token: store.token.token,
        isLogged: store.isLogged.isLogged,
    }
}

const mapDispatchToProps = dispatch => ({
    setTokenAction: token => dispatch(setToken(token)),
    setIsLoggedAction: isLogged => dispatch(setIsLogged(isLogged)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

