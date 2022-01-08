import React from 'react'

export default class AboutComponent extends React.Component {
    render() {
        return (
            <main>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Columns with icons</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="feature col">
                            <div className="feature-icon bg-primary bg-gradient">
                            </div>
                            <h2>Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <p className="icon-link">Call to action</p>
                        </div>
                        <div className="feature col">
                            <div className="feature-icon bg-primary bg-gradient">
                            </div>
                            <h2>Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <p className="icon-link">Call to action</p>
                        </div>
                        <div className="feature col">
                            <div className="feature-icon bg-primary bg-gradient">
                            </div>
                            <h2>Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <p className="icon-link">Call to action</p>
                        </div>
                    </div>
                </div>
                <div className="container px-4 py-5" id="hanging-icons">
                    <h2 className="pb-2 border-bottom">Hanging icons</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="col d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        </div>
                        <div>
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <p className="btn btn-primary">Primary button</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        </div>
                        <div>
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        <p className="btn btn-primary">Primary button</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3"></div>
                            <div>
                                <h2>Featured title</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                <p className="btn btn-primary">Primary button</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container px-4 py-5" id="custom-cards">
                    <h2 className="pb-2 border-bottom">Custom cards</h2>

                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: "url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-1.jpg')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>Earth</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <small>3d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: "url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-2.jpg')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>Pakistan</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <small>4d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: "url('https://getbootstrap.com/docs/5.0/examples/features/unsplash-photo-3.jpg')"}}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Another longer title belongs here</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>California</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <small>5d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
