import React from 'react'

export default function Homepage(props) {

    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input

                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>

                <button onClick={(e) => {e.preventDefault(); props.checkAuth()}}  className="btn btn-primary">
                    Login
  </button>
            </form>
        </div>
    )
}
