import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function LoginPage(props) {

    let userName = useSelector(state => state.userName)
    let isAuthenticated = useSelector(state => state.isAuthenticated)
    const dispatch = useDispatch();

    let getUsername = (value) => {
        userName = value
    };
    let toggleLoginLogout = () => {
        if (!isAuthenticated) {
            return <button onClick={() => dispatch({ type: "LOGIN", payload: userName })} className="btn btn-primary">
                Login
</button>
        } else {
            return <button onClick={() => dispatch({ type: "LOGOUT" })} className="btn btn-primary">
                Logout
</button>
        }

    };
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        onChange={(e) => getUsername(e.target.value)}
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
                {toggleLoginLogout()}
            </form>
        </div>
    )
}
