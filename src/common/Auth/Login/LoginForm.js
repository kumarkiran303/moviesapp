import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import React, { useState } from "react";

export default function LoginForm(props){

    const [loginForm, setLoginForm] = useState({user_name: '', password:''});

    const loginHandler = (e) => {        
        e.preventDefault();     
        const encodedCred = window.btoa(`${loginForm.user_name}:${loginForm.password}`) 
        userLoginAuth(encodedCred);
        setLoginForm({user_name: '', password:''});
    }

    function inputChangeHandler(e){
        const state = loginForm;
        state[e.target.name] = e.target.value;
        setLoginForm({...state});
    }

    async function userLoginAuth(encodedCred){
        try{
            const rawResponse = await fetch(`${props.baseUrl}auth/login`,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json;charset=UTF-8",
                    authorization: `Basic ${encodedCred}`
                }
            })

            const result = await rawResponse.json();

            if(rawResponse.ok){                
                props.modalHandler(false);
            }
            else{
                const error = new Error();
                error.message = result.message;
            }
        } catch(e){
            alert(`Error: ${e.message}`);
        }
    }

    return(
        <div className="form-container">
            <form className="login-form" onSubmit={loginHandler}>
                <FormControl>
                    <InputLabel htmlFor="userName">UserName*</InputLabel>
                    <Input required id="userName" type="text" name="user_name" value={loginForm.user_name} onChange={inputChangeHandler}/>
                </FormControl><br/><br/>
                <FormControl>
                    <InputLabel htmlFor="password">Password*</InputLabel>
                    <Input required id="password" type="password" name="password" value={loginForm.password} onChange={inputChangeHandler}/>
                </FormControl><br/><br/>                                
                <Button type="submit" variant="contained" className="custom-btn" color="primary">Login</Button>
            </form>            
        </div>
    );
}