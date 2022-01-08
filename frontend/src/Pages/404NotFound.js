import React from "react"
import { Redirect } from "react-router-dom"

import "../index.css"

export default class NotFound extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSuccess: false
        }
    }
    render = () => {
        if (this.state.isSuccess) {
            return < Redirect to="/" />
        }
        return (
            <div class="d-flex justify-content-center align-items-center">
                <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">404 NOT FOUND</h1>
                <div class="inline-block align-middle">Вернуться на
                    <span 
                        class="lead" 
                        onClick={() => this.setState({isSuccess: !this.state.isSuccess}) }
                    > Главную страницу</span>
                </div>
            </div>
        );
    }
}