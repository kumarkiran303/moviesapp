import { FormControl, Input, InputLabel , Button, FormHelperText} from "@material-ui/core";
import React, { useState } from "react";

import './RegisterForm.css'

export default function RegisterForm(props){

    const [isRegistered, setRegistered] = useState("");
    const [registerForm, setRegisterForm] = useState({
        first_name: '',
        last_name: '',
        email_address:'',
        mobile_number:'',
        password:''
    });
    const [validator, setValidator] = useState({
        firstNameRequired:"displayNone",
        lastNameRequired:"displayNone",
        emailRequired:"displayNone",
        passwordRequired:"displayNone",
        contactRequired:"displayNone"
    });    

    const inputChangedhandler = (e) => {
        const state = registerForm;
        state[e.target.name] = e.target.value;
        setRegisterForm({...state});
    }

    const registerHandler = (e) => {           
        e.preventDefault();
        const prevValidatorState = validator;
        registerForm.first_name === '' ? prevValidatorState["firstNameRequired"] = "displayBlock" : prevValidatorState["firstNameRequired"] = "displayNone" ;
        registerForm.last_name === '' ? prevValidatorState["lastNameRequired"] = "displayBlock" : prevValidatorState["lastNameRequired"] = "displayNone"  ;
        registerForm.email_address === '' ? prevValidatorState["emailRequired"] = "displayBlock" : prevValidatorState["emailRequired"] = "displayNone"  ;
        registerForm.password === '' ? prevValidatorState["passwordRequired"] = "displayBlock" : prevValidatorState["passwordRequired"] = "displayNone"  ;
        registerForm.mobile_number === '' ? prevValidatorState["contactRequired"] = "displayBlock" : prevValidatorState["contactRequired"] = "displayNone" ;        
        
        setValidator({...prevValidatorState});             

        if(registerForm.first_name === '' ||
            registerForm.last_name === '' ||
            registerForm.email_address === '' ||
            registerForm.mobile_number === '' ||
            registerForm.password === '' ){
                return;
        }

        userRegisterHandler(registerForm);        
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
        if(rawResponse.ok){
            setRegistered(data.status);        
            setRegisterForm({first_name: '',last_name: '',email_address:'',mobile_number:'',password:''});
        }
        else{
            alert(rawResponse.statusText);
        }
        
    }
    
    return(
        <div className="form-container">
            <form className="register-form" onSubmit={registerHandler} noValidate>
                <FormControl required className="form-control">
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input id="firstName" type="text" name="first_name" value={registerForm.first_name} onChange={inputChangedhandler}></Input>
                    <FormHelperText className={validator.firstNameRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl><br/><br/>
                <FormControl required className="form-control">
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input id="lastName" type="text" name="last_name" value={registerForm.last_name} onChange={inputChangedhandler} ></Input>
                    <FormHelperText className={validator.lastNameRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl><br/><br/>
                <FormControl required className="form-control">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="email" name="email_address" value={registerForm.email_address} onChange={inputChangedhandler} ></Input>
                    <FormHelperText className={validator.emailRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl><br/><br/>
                <FormControl required className="form-control">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" name="password" value={registerForm.password} onChange={inputChangedhandler} ></Input>
                    <FormHelperText className={validator.passwordRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl><br/><br/>
                <FormControl required className="form-control">
                    <InputLabel htmlFor="contactNum">Contact No.</InputLabel>
                    <Input id="contactNum" type="text" name="mobile_number" value={registerForm.mobile_number} onChange={inputChangedhandler} ></Input>
                    <FormHelperText className={validator.contactRequired}>
                        <span className="red">required</span>
                    </FormHelperText>
                </FormControl><br/><br/>
                {(isRegistered === "ACTIVE") && <span>Registration Successful. Please Login!</span>}<br/>
                <div style={{"display":"flex"}}>
                    <Button type="submit" variant="contained" className="custom-btn" id="register-btn" color="primary">Register</Button>
                </div>
            </form>
        </div>
    );
}