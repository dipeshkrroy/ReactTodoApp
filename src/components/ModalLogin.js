import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal,InputGroup,FormControl,Alert } from 'react-bootstrap';
import {FaEnvelope} from "react-icons/fa";

function ModalLogin(props){
    const [error,setError] = useState("");
    function Login(){
        var email = document.getElementById("email").value;
        var pattern = /^[^\s@]+@[^\s@]+$/i;
        if(pattern.test(email)){
            props.handleLogin(email);
        }else{
            setError("Invalid Email");
        }
        console.log(email);
    }
    return (
        <>
        <Modal animation={false} show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.error?<Alert  variant="danger">
                                    {props.error}{error}
                                 </Alert>:<></>
                }
                {
                    error?<Alert  variant="danger">
                                    {error}
                                 </Alert>:<></>
                }
            
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FaEnvelope size={15} /></InputGroup.Text>
                <FormControl
                placeholder="Username"
                id="email"
                type="email"
                />
            </InputGroup>
                <Button className="mr-1" variant="success" onClick={Login}>
                    Login
                </Button>
                <Button className="" variant="info" onClick={props.handleClose}>
                    Cancel
                </Button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
        )
}

export default ModalLogin;