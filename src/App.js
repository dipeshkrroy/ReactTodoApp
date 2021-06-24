import './App.css'
import Todo from './todo';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,} from 'react-bootstrap';
import ModalComponent from './components/Modal';
import {getTodosApi,addTodoApi,editTodoApi,deleteTodoApi} from './redux/action';
import {connect} from 'react-redux';
import {Navbar,Row,Col} from 'react-bootstrap';
import { FaPlusCircle, FaReact,FaUser,FaEnvelope } from 'react-icons/fa';

function App(props) {
  console.log(props);
  const [show, setShow] = useState(false);
  const [showEdit,setEditShow] = useState(false);
  const [todo, setTodo1] = useState("");
  const handleEditClose = ()=> setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    props.getTodo();  
  },[]);
    
  function addTodo(todo){
    console.log("Add");
    props.addTodoAction(todo);
  }
  function editTodo(todo){
    console.log("edit",todo);
    props.editTodoAction(todo);    
  }

  function deleteTodo(id){
    console.log("Delete");
    props.deleteTodoAction(id);
  }
    
  return (
    <div className="container">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <FaReact size={30} />{' '}
          React Todo App
        </Navbar.Brand>
      </Navbar>
      <div className="card my-2 col-12">
        <div className="card-body">
          <h2><FaUser size="35" className="colorRed" /> {props.user.name}</h2>
          <p className="ml-4"><FaEnvelope size="15" className="colorRed" /> {props.user.email} </p>
          <Button variant="primary" onClick={()=>{setTodo1({"title":"","completed":""}); handleShow()}}><FaPlusCircle size={20} /> Add Todo</Button>
        </div>
      </div>
      <Row className="row bg-primary text-white">
              <Col md={1}>
                  <p>ID</p>
              </Col>
              <Col md={6}>
                  <p>Title</p>
              </Col>
              <Col md={2}>
                  <p>Completed?</p>
              </Col>
              <Col md={3}>
                  <p>Actions</p>
              </Col>
        </Row>
        <Todo todos= {props.todos} setTodo1={setTodo1} handleShow={handleEditShow} deleteTodo={deleteTodo} />
      <div className="row">
        <ModalComponent heading="Add Todo" show={show} handleClose ={handleClose} handleShow={handleShow} addTodo={addTodo} todo={todo}  />
        <ModalComponent heading="Edit Todo" show={showEdit} handleClose ={handleEditClose} handleShow={handleEditShow} addTodo={editTodo} todo={todo}  />
      </div>

    </div>
  );
}

const mapStateToProps = state => {
 return { "todos": state.todos,
           "user":state.user
         }
}
const mapDispatchToProps = dispatch => {
  return {
    getTodo: () => dispatch(getTodosApi()),
    addTodoAction: (todo) => dispatch(addTodoApi(todo)),
    editTodoAction: (todo) => dispatch(editTodoApi(todo)),
    deleteTodoAction: (id) => dispatch(deleteTodoApi(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
