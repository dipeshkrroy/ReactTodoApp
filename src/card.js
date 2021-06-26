import { useState, useEffect } from 'react';
import './card.css';
import {Row,Col,Button} from 'react-bootstrap';
import {FaEdit,FaTrashAlt} from 'react-icons/fa'
function Card(props){
    var [isCompleted,setCompleted] = useState();
    useEffect(()=>{
        if(props.todo.completed){
            setCompleted("true");
        }else{
            setCompleted("false");
        }
        
    },[props]);
    return (
        <Row
        style={{
            borderBottom:"1px solid #35682b"
        }}>
            <Col md={1}><p>{props.todo.id}</p></Col>
            <Col md={6}><p>{props.todo.title}</p></Col>
            <Col md={2}><p>{isCompleted}</p></Col>
            <Col md={3}>
                <Button className="m-1" onClick={()=>{props.setTodo1(props.todo);props.handleShow()}}><FaEdit size={20} /></Button>
                <Button variant="danger" onClick={()=>{props.deleteTodo(props.todo.id)}}><FaTrashAlt size={20}/></Button>
            </Col>
        </Row>
    )
}

export default Card;