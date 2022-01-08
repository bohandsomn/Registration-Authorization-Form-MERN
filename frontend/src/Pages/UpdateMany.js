import React, { Component } from 'react'

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

export default class UpdateMany extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            data: {
                confirmPassword: ''
            }
        }
    }
    updateData = e => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    notify = data => {
        if (data.isSuccess) {
            toast.success(data.message)
        } else {
            toast.error(data.message)
            if (data.errors) {
                data.errors.forEach(err => {
                    toast.error(err);
                })
            }
        }
    }

    getData = async () => {
        const {token} = this.props;
        await fetch('http://localhost:5000/api/cabinet/get-data', {
            headers: {
                'Content-Type': 'application/json',
                'change': `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => this.setState({...data, data}))
        .catch(err => console.log(err));
    }

    componentDidMount = async () => {
        await this.getData();
    }

    submit = async e => {
        e.preventDefault()

        const { token } = this.props

        const data = await fetch('http://localhost:5000/api/cabinet/change-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'change': `bearer ${token}`
            },
            body: JSON.stringify({
                changeData: {
                    ...this.state.data
                }
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err));

        this.notify(data)
        this.getData()
        this.setState({
            data: {
                ...this.state.data,
                confirmPassword: '',
                password: ''
            }
        })
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.submit}>
                <h1 className="h3 mb-3 fw-normal">Обновить данные</h1>
                {
                    Object.entries(this.state.data)
                        .filter( ([key, ]) => !['confirmPassword', 'gender', 'place', ''].includes(key) )
                        .map( ([key, ]) => 
                            <div className="mb-3">
                                <h5>Ваш {key}</h5>
                                <input 
                                    type="text" 
                                    className="form-floating form-control" 
                                    placeholder={`Введите новый ${key}`}
                                    onChange={this.updateData}
                                    key={key}
                                    value={this.state.data[key]}
                                    name={key}
                                />
                            </div>
                        )
                }
                {
                    Object.keys(this.state.data)
                        .filter( key => ['gender'].includes(key) )
                        .map( key => 
                            <div>
                                <h5>Ваш {key}</h5>
                                <label className="d-flex align-items-center h6">
                                    <input 
                                        type="radio" 
                                        className="form-check-input m-1" 
                                        onChange={this.updateData}
                                        key={key}
                                        value="Male"
                                        checked={this.state.data.gender === "Male"}
                                        name={key}
                                    /> Male
                                </label>
                                <label className="d-flex align-items-center h6">
                                    <input 
                                        type="radio" 
                                        className="form-check-input m-1" 
                                        onChange={this.updateData}
                                        key={key}
                                        value="Female"
                                        checked={this.state.data.gender === "Female"}
                                        name={key}
                                    /> Female
                                </label>
                                <label className="d-flex align-items-center h6">
                                    <input 
                                        type="radio" 
                                        className="form-check-input m-1" 
                                        onChange={this.updateData}
                                        key={key}
                                        value="Other"
                                        checked={this.state.data.gender === "Other"}
                                        name={key}
                                    /> Other
                                </label>
                            </div>
                        )
                }
                {
                    Object.keys(this.state.data)
                        .filter( key => ['place'].includes(key) )
                        .map( key => 
                            <div>
                                <h5>Ваш {key}</h5>
                                <select onChange={this.updateData} name={key} class="form-select">
                                    <option 
                                        selected={this.state.data.place === 'metropolis'} 
                                        value="metropolis"
                                    >Мегаполис</option>
                                    <option 
                                        selected={this.state.data.place === 'town'} 
                                        value="town"
                                        name={key}
                                    >Город</option>
                                    <option 
                                        selected={this.state.data.place === 'village'} 
                                        value="village"
                                        name={key}
                                    >Село</option>
                                    <option 
                                        selected={this.state.data.place === 'other'} 
                                        value="other"
                                        name={key}
                                    >Другое</option>
                                </select>
                            </div>
                        )
                }
                <h5>Подтвердите ваш password</h5>
                <input 
                    type="password" 
                    className="form-floating form-control mb-3" 
                    placeholder="Введите текущий password"
                    onChange={this.updateData}
                    value={this.state.data.confirmPassword}
                    name="confirmPassword"
                />
                <input 
                    className="w-100 btn btn-lg btn-primary" 
                    type="submit"
                    value="Обновить"
                />
            </form>
        )
    }
}
