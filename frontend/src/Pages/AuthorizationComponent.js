import React from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types'

import "../index.css"
import HaveAccount from "./HaveAccount"

toast.configure()

export default class AuthorizationComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            isSuccess: false
        }
    }

    updateData = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    notify = data => {
        if (data.isSuccess) {
            toast.success(data.message)
            this.setState({
                isSuccess: data.isSuccess,
                token: data.token
            })
        } else {
            toast.error(data.message)
            if (data.errors) {
                data.errors.forEach(err => {
                    toast.error(err)
                })
            }
        }
    }
    submit = async e => {
        e.preventDefault()

        const data = await fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password,
            })
        })
        .then(data => data.json())
        .catch(error => console.log(error))

        if (data.token) this.props.setToken(data.token)
        if (data.isSuccess) this.props.setIsLoggedAction(data.isSuccess)

        this.notify(data)
    }

    render = () => {
        if (this.props.isLogged) return <Redirect to="/cabinet"/>
        if (this.state.isSuccess) return < Redirect to="/registration" />
        
        return (
            <main className="form-signin">
                <form className="form-signin" onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Форма авторизации</h1>
                    <input 
                        type="text" 
                        className="form-floating form-control" 
                        placeholder="Введите ваш логин"
                        onChange={this.updateData}
                        name="login"
                    />
                    <input 
                        type="password" 
                        className="form-floating form-control" 
                        placeholder="Введите пароль"
                        autoComplete="suggested: username"
                        onChange={this.updateData}
                        name="password"
                    />
                    <input 
                        className="w-100 btn btn-lg btn-primary" 
                        type="submit"
                        value="Войти"
                    />
                </form>
                < HaveAccount 
                    question="У вас нет аккаутна?" 
                    redir=" Перейти на страницу регистрации" 
                    func={() => this.setState({isSuccess: !this.state.isSuccess})}
                />
            </main>
        );
    }
}

AuthorizationComponent.propTypes = {
    token: PropTypes.string.isRequired,
    setToken: PropTypes.func.isRequired,
}