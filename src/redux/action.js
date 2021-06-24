import { GET_TODO,ADD_TODO} from "./actionTypes";
import axios from "axios";
export const getTodos = (users) =>{
    return {
        type:GET_TODO,
        users:users
    };
};

export const addTodos = (todo) =>{
    return {
        type:ADD_TODO,
        payload:todo
    };
};


export const getTodosApi = ()=>{
    return (dispatch) => {
        axios.get("http://localhost:7070/api/users")
        .then(res=>{
            console.log(res.data);
            dispatch(getTodos(res.data));
        }).catch(e =>{
            console.log(e.message);
        });
    };
};

export const addTodoApi = (todo) =>{
    return (dispatch) =>{
        axios.post("http://localhost:7070/api/users/5",{
              "completed": todo.completed,
              "id": 0,
              "title": todo.title
            })
            .then(res=>{
                console.log(res.data);
                dispatch(addTodos(res.data.todos));
            }).catch(e =>{
                console.log(e.message);
            });
    };
};

export const editTodoApi = (todo) =>{
    return (dispatch) => {
        axios.put(`http://localhost:7070/api/users/todo/${todo.id}`,{
                "id": todo.id,
                "title": todo.title,
                "completed": todo.completed
              })
            .then(res=>{
                console.log(res.data);
                dispatch(getTodosApi());
            }).catch(e =>{
                console.log(e.message);
            });
    };
};

export const deleteTodoApi = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:7070/api/users/todo/${id}`)
            .then(res=>{
                console.log(res.data);
                dispatch(getTodosApi());
            }).catch(e =>{
                console.log(e.message);
            });
    };
};