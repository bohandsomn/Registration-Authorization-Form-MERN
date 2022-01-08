import React from "react"

export default class HomeComponent extends React.Component {
    render = () => {
        return (
            <div>
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Это домашняя страница</h1>
                        <p className="col-md-8 fs-4">Данная верстка не служит для того чтобы что-то показать. Она была добавленна для того, что бы вы понимали, что это Домашняя страница.</p>
                        <button className="btn btn-primary btn-lg" type="button">Кнопка никода не переводит</button>
                    </div>
                </div>
                <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h2>Темный блочек</h2>
                            <p>Он так же был добавлен для красоты. Главная причина его добавления - контрастность при маршрутизации.</p>
                            <button className="btn btn-outline-light" type="button">Кнопка никода не переводит</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 p-5 bg-light border rounded-3">
                            <h2>Светлый блок</h2>
                            <p>В добавлении к предыдущему, данный блок также является декором.</p>
                            <button className="btn btn-outline-secondary" type="button">Кнопка никода не переводит</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}