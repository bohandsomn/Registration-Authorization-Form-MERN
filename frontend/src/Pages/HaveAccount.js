import React, { Component } from 'react'

export default class HaveAccount extends Component {
    render() {
        const {question, redir, func} = this.props;
        return (
            <p>
                {question }
                <span className="text-primary" onClick={func}>{redir}</span>
            </p>
        )
    }
}
