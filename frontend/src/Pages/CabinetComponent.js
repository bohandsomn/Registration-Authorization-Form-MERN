import React from "react"
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "../index.css"
import UpdateMany from "./UpdateMany"

toast.configure()

export default class CabinetComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                name: '',
                login: '',
                email: ''
            }
        }
    }
    notify = data => {
        if (data.isSuccess) {
            this.setState({
                user: data.user
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
    componentDidMount = async () => {
        const token = this.props.token || ''

        const data = await fetch('http://localhost:5000/api/cabinet', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
        .then(data => data.json())
        .catch(error => console.log(error))

        this.notify(data)
    }
    render = () => {
        if (!this.props.isLogged) {
            return < Redirect to="/registration" />
        }

        return (
            <div>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Это кабинет пользователя</h1><br /><br />
                        <p className="display-8">Тут вы можете добавить некоторую информацию о себе</p>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    < UpdateMany token={this.props.token || ''} />
                </div>
            </div>
        )
    }
}