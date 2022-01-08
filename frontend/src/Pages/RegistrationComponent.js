import React from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Redirect } from "react-router-dom"

import "../index.css"
import HaveAccount from "./HaveAccount"

toast.configure()

export default class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            login: '',
            email: '',
            password: '',
            isSuccess: false,
            clickToAuth: false
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
                isSuccess: data.isSuccess
            })
        } else {
            toast.error(data.message)
            if (data.errors) {
                data.errors.forEach(err => {
                    toast.error(err);
                })
            }
        }
    }

    submit = async e => {
        e.preventDefault()

        const data = await fetch('http://localhost:5000/api/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.username,
                login: this.state.login,
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        this.notify(data)
    }
    render = () => {
        if (this.state.isSuccess) {
            return < Redirect to="/authorization" />
        }

        return (
            <main className="form-signin">
                <form className="form-signin" onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Форма регистрации</h1>
                    <input 
                        type="text" 
                        className="form-floating form-control" 
                        placeholder="Введите ваше имя"
                        name="username"
                        onChange={this.updateData}
                    ></input>
                    <input 
                        type="text" 
                        className="form-floating form-control" 
                        placeholder="Введите ваш логин"
                        onChange={this.updateData}
                        name="login"
                    ></input>
                    <input 
                        type="email" 
                        className="form-floating form-control" 
                        placeholder="Введите ваш email"
                        onChange={this.updateData}
                        name="email"
                    ></input>
                    <input 
                        type="password" 
                        className="form-floating form-control" 
                        placeholder="Введите пароль"
                        autoComplete="suggested: username"
                        onChange={this.updateData}
                        name="password"
                    ></input>
                    <input 
                        className="w-100 btn btn-lg btn-primary" 
                        type="submit"
                        value="Зарегистрироваться"
                    ></input>
                </form>
                < HaveAccount 
                    question="У вас уже есть аккаутн?" 
                    redir=" Перейти на страницу авторизации" 
                    func={() => this.setState({isSuccess: !this.state.isSuccess}) } 
                />
            </main>
        )
    }
}