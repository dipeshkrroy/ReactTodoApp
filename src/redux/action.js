import { GET_TODO,ADD_TODO,LOGIN,ON_ERROR} from "./actionTypes";
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

export const loggedIn =(user) =>{
    return {
        type:LOGIN,
        payload:user
    }
}

export const onError = (error) =>{
    return {
        type : ON_ERROR,
        payload:error
    }
}

export const getTodosApi = (id)=>{
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
        .then(res=>{
            dispatch(getTodos(res.data));
        }).catch(e =>{
            dispatch(onError("GetTods: "+e.message));
        });
    };
};

export const addTodoApi = (id,todo) =>{
    return (dispatch) =>{
        axios.post(`${process.env.REACT_APP_API_URL}/api/users/${id}`,{
              "completed": todo.completed,
              "id": 0,
              "title": todo.title
            })
            .then(res=>{
                dispatch(addTodos(res.data.todos));
            }).catch(e =>{
                dispatch(onError("AddTods: "+e.message));
            });
    };
};

export const editTodoApi = (id,todo) =>{
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/users/todo/${todo.id}`,{
                "id": todo.id,
                "title": todo.title,
                "completed": todo.completed
              })
            .then(res=>{
                dispatch(getTodosApi(id));
            }).catch(e =>{
                dispatch(onError("EditTods: "+e.message));
            });
    };
};

export const deleteTodoApi = (id,userId) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/users/todo/${id}`)
            .then(res=>{
                dispatch(getTodosApi(userId));
            }).catch(e =>{
                dispatch(onError("DeleteTods: "+e.message));
            });
    };
};

export const loginApi = (email) =>{
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/email/${email}/`)
            .then(res =>{
                dispatch(loggedIn(res.data));
            }).catch(e =>{
                dispatch(onError("Login: "+e.message));
            });
    };
};