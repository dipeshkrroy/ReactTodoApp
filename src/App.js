import './App.css';
import Todo from './todo';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalComponent from './components/Modal';
import ModalLogin from './components/ModalLogin';
import {getTodosApi,addTodoApi,editTodoApi,deleteTodoApi,loginApi} from './redux/action';
import {connect} from 'react-redux';
import {Button,Navbar,Row,Col} from 'react-bootstrap';
import { FaPlusCircle, FaReact,FaUser,FaEnvelope } from 'react-icons/fa';
import ToastComponent from "./components/toast";

function App(props) {
  const [show, setShow] = useState(false);
  const [showEdit,setEditShow] = useState(false);
  const [todo, setTodo1] = useState("");
  const [login,setLogin] = useState(false);
  const [toast,setToast] = useState(false);
  const [toastMessage,setMessage] = useState("");

  useEffect(() => {
      console.log("UseEffect");
      if(props.error){
        setLogin(false);
        setToast(true);
      }
  },[props.error]);
    
  function addTodo(todo){
    console.log(todo);
    props.addTodoAction(props.user.id,todo);
    handleToast("Add successful");
  }
  function editTodo(todo){
    handleToast("Edit successful");
    props.editTodoAction(props.user.id,todo);    
  }

  function deleteTodo(id){
    props.deleteTodoAction(id,props.user.id);
    handleToast("Deleted successfully");
  }
  function handleLogin(email){
    handleToast("Logged In");
    props.loginAction(email);
    setLogin(true);
  }
  function handleToast(message){
    setToast(true);
    setMessage(message);
  }  
  return (
    <div className="container"
    style={{
      position:'relative'
    }}>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <FaReact size={30} />{' '}
          React Todo App
        </Navbar.Brand>
      </Navbar>
      <div className="card my-2 col-12">
        <div className="card-body">
          {
            (!props.error)?<>
            <h2><FaUser size="35" className="colorRed" /> {props.user.name}</h2>
            <p className="ml-4"><FaEnvelope size="15" className="colorRed" /> {props.user.email} </p>
            <Button variant="primary" onClick={()=>{setTodo1({"title":"","completed":"",id:0}); setShow(true)}}><FaPlusCircle size={20} /> Add Todo</Button></>
            :<><Button className="mr-1" variant="success" onClick={()=>setLogin(false)} >Login</Button></>
          }          
          
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
        {
          (!props.error)?<Todo todos= {props.todos} setTodo1={setTodo1} handleShow={()=>setEditShow(true)} deleteTodo={deleteTodo} />:<p>Please login to view List</p>

        }
      <div className="row">
        <ModalComponent heading="Add Todo" show={show} handleClose ={() => setShow(false)}  addTodo={addTodo} todo={todo}  />
        <ModalComponent heading="Edit Todo" show={showEdit} handleClose ={()=> setEditShow(false)} addTodo={editTodo} todo={todo}  />
      </div>
      <Row>
        {
          <ModalLogin show ={!login} handleClose={(email)=>props.loginAction(email)} handleLogin={(email)=>handleLogin(email)} error = {props.error} />

        }
      </Row>
      <Row>
        {
          (props.error)?<ToastComponent color ="#fff" bg="rgb(219, 57, 57)" setToast={() =>setToast(false)} toast ={toast} toastMessage={props.error} />
          :<ToastComponent color ="#fff" bg="#35682b" setToast={() =>setToast(false)} toast ={toast} toastMessage={toastMessage} />
        }
      </Row>

    </div>
  );
}

const mapStateToProps = state => {
 return { "todos": state.todos,
           "user":state.user,
           "error" : state.error
         }
}
const mapDispatchToProps = dispatch => {
  return {
    getTodo: () => dispatch(getTodosApi()),
    addTodoAction: (id,todo) => dispatch(addTodoApi(id,todo)),
    editTodoAction: (id,todo) => dispatch(editTodoApi(id,todo)),
    deleteTodoAction: (id,userId) => dispatch(deleteTodoApi(id,userId)),
    loginAction: (email) => dispatch(loginApi(email))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
