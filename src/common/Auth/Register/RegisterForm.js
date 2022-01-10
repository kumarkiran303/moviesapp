import { FormControl, Input, InputLabel , Button} from "@material-ui/core";
import React, { useState } from "react";

export default function RegisterForm(props){

    const [isRegistered, setRegistered] = useState("");
    const [registerForm, setRegisterForm] = useState({
        first_name: '',
        last_name: '',
        email_address:'',
        mobile_number:'',
        password:''
    });

    const inputChangedhandler = (e) => {
        const state = registerForm;
        state[e.target.name] = e.target.value;
        setRegisterForm({...state});
    }

    const registerHandler = (e) => {
        e.preventDefault();
        userRegisterHandler(registerForm);
        setRegisterForm({first_name: '',last_name: '',email_address:'',mobile_number:'',password:''});
    }

    async function userRegisterHandler(newUser){
        const rawResponse = await fetch(`${props.baseUrl}signup`, {
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(newUser)
        });
    
        const data = await rawResponse.json();        
        setRegistered(data.status);        
    }
    
    return(
        <div className="form-container">
            <form className="register-form" onSubmit={registerHandler.bind(this)}>
                <FormControl>
                    <InputLabel htmlFor="firstName">First Name*</InputLabel>
                    <Input required id="firstName" type="text" name="first_name" value={registerForm.first_name} onChange={inputChangedhandler}></Input>
                </FormControl><br/><br/>
                <FormControl>
                    <InputLabel htmlFor="lastName">Last Name*</InputLabel>
                    <Input required id="lastName" type="text" name="last_name" value={registerForm.last_name} onChange={inputChangedhandler} ></Input>
                </FormControl><br/><br/>
                <FormControl>
                    <InputLabel htmlFor="email">Email*</InputLabel>
                    <Input required id="email" type="email" name="email_address" value={registerForm.email_address} onChange={inputChangedhandler} ></Input>
                </FormControl><br/><br/>
                <FormControl>
                    <InputLabel htmlFor="password">Password*</InputLabel>
                    <Input required id="password" type="password" name="password" value={registerForm.password} onChange={inputChangedhandler} ></Input>
                </FormControl><br/><br/>
                <FormControl>
                    <InputLabel htmlFor="contactNum">Contact No.*</InputLabel>
                    <Input required id="contactNum" type="text" name="mobile_number" value={registerForm.mobile_number} onChange={inputChangedhandler} ></Input>
                </FormControl><br/><br/>
                {(isRegistered === "ACTIVE") && <span>Registration Successful. Please Login!</span>}<br/>
                <Button type="submit" variant="contained" className="custom-btn" color="primary">Register</Button>
            </form>
        </div>
    );
}