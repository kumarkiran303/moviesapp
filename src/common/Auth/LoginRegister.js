import { Button, Tab, Tabs } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
// import { TabPanel } from '@material-ui/lab';

import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import './LoginRegister.css'

export default function LoginRegister(props) {

    const [tabSelected, setTabSelected] = useState(0);

    // const onTabSelect = (useTab) => {
    //     setTabSelected(useTab);
    // }

    const tabSelectedhandler = (event, tabValue) => {
        setTabSelected(tabValue);
    }

    function DisplayTabContent() {
        let displaytab;

        if (tabSelected === 0) {
            displaytab = <LoginForm baseUrl={props.baseUrl} modalHandler={props.modalHandler}/>
        }
        else {
            displaytab = <RegisterForm baseUrl={props.baseUrl} />

        }

        return displaytab
    }


    return (
        <Fragment>                           
            <Modal isOpen={props.modalState} id="modal-container" centered>
                    <div className="modal-content">
                        <div className="close-btn" onClick={() => props.modalHandler(false, false)}>X</div>
                        <Tabs value={tabSelected}
                            onChange={tabSelectedhandler}
                            centered>
                            <Tab label="Login" value={0} />
                            <Tab label="Register" value={1} />
                        </Tabs>
                        <DisplayTabContent className="form-container"/>          
                    </div>      
                </Modal>                        
        </Fragment>
    );
}