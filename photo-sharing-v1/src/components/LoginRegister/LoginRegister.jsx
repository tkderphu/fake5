import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { createUser } from "../../services/users";
import { saveAuthInfo } from "../../utils/token";

export default function LoginRegister() {
    const [req, setReq] = useState({
        login_name: "",
        password: ""
    })
    const navigate = useNavigate()
    const [err, setErr] = useState()
    const handleSubmit = () => {
        login(req).then(resp => {
            console.log("data: ", resp.data)
            saveAuthInfo(resp.data)
            window.location.href = "/"
        }).catch(err => {
            console.log("login user: ", err)
            setErr(err.response?.data.msg || "Error please check again")
        })
    }
    const [registerReq, setRegisterReq] = useState({
        first_name: "",
        last_name: "",
        login_name: "",
        password: "",
        rePassword: "",
        occupation: "",
        description: "",
        location: ""
    })
    const onChangeRegister = (e) => {
        const {name, value}= e.target
        setRegisterReq((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmitRegister = () => {
        console.log("submit register: ", registerReq)
        if(registerReq.password != registerReq.rePassword) {
            alert("Password invalid")
            return
        }
        createUser(registerReq).then(resp => {
            setRegisterReq({
                first_name: "",
                last_name: "",
                login_name: "",
                password: "",
                rePassword: "",
                occupation: "",
                description: "",
                location: ""
            })
        }).catch(err => {
            console.log("err: ", err)
            setErrorRegister(err.response.data.msg || err.response.data || "Please check backend")
        })
    }
    const [errorRegister, setErrorRegister] = useState()
    return (
        <div className="row">
        <div className="col-4 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">Login</h1>
            <div className="mt-3">
                <TextField id="outlined-basic" label="Login name" name="username" onChange={(e) => {
                    setReq({
                        ...req,
                        'login_name': e.target.value
                    })
                }} />
            </div>
            <div className="mt-3">
                <TextField id="outlined-basic-password" type={'password'} label="Password" name='password' onChange={(e) => {
                    setReq({
                        ...req,
                        'password': e.target.value
                    })
                }} />
            </div>
            {err && (
                <div className="mt-3">
                    <div className="alert alert-danger">{err}ádasd</div>
                </div>
            )}
            <button onClick={handleSubmit} className="btn btn-primary mt-2">Login</button>
        </div>
        <div className="col-8 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">Register</h1>
            <div className="mt-3">
                <TextField  value={registerReq.login_name}  id="outlined-basic" className="me-3" label="Login name" name="login_name" onChange={onChangeRegister} />
                  <TextField  value={registerReq.password} id="outlined-basic-password" type={'password'} label="Password" name='password' onChange={onChangeRegister}
                 />
            </div>
          
        
            <div className="mt-3">
                <TextField value={registerReq.first_name}  id="outlined-basic-password" className="me-3" type={'text'} label="First name" name='first_name' onChange={onChangeRegister} />
                <TextField id="outlined-basic-password" value={registerReq.last_name} type={'text'} label="Last name" name='last_name' onChange={onChangeRegister} />
            </div>
          
            <div className="mt-3">
                <TextField value={registerReq.location}  id="outlined-basic-password" className="me-3" type={'text'} label="Location" name='location' onChange={onChangeRegister} />
                <TextField value={registerReq.description}  id="outlined-basic-password" type={'text'} label="Description" name='description' onChange={onChangeRegister} />
            </div>
            <div className="mt-3">
                
            </div>
            <div className="mt-3">
                <TextField  value={registerReq.occupation} id="outlined-basic-password" type={'text'} className="me-3" label="Occupation" name='occupation' onChange={onChangeRegister}/>
                 <TextField  value={registerReq.rePassword} id="outlined-basic-password" type={'password'} label="Enter your password again" name='rePassword' onChange={(e) => {
                    if(e.target.value != registerReq.password) {
                        setErrorRegister("Password invalid")
                    } else {
                        setErrorRegister(null)
                    }
                    onChangeRegister(e)
                 }} />
            </div>
            <div className="mt-3">
               
            </div>
            {errorRegister && (
                <div className="mt-3">
                    <div className="alert alert-danger">{errorRegister}</div>
                </div>
            )}
            <button onClick={handleSubmitRegister} className="btn btn-primary mt-2">Register me</button>
        </div>
        </div>
    )
}