import { GET_TODO,ADD_TODO,LOGIN,ON_ERROR} from "./actionTypes";


const initialState = {
    user :{},
    todos :[],
    loggedIn:false,
    error:""
};

const reducer = (state = initialState,action) => {
    switch (action.type){
        case GET_TODO : state.user=action.users;
                        state.todos=state.user.todos;
                        state.loggedIn = true;
                        state.error = ""; 
                        return {...state,"user":state.user,"todos":state.todos};
        case ADD_TODO : state.todos = action.payload;
                        return {...state,"todos":state.todos,"error":""};
        case LOGIN: state.loggedIn = true;
                    state.user =action.payload;
                    state.todos=action.payload.todos;
                    return ({...state,"error":""});
        case ON_ERROR:
                    return {
                        ...state,
                        "error":action.payload
                    };
        default: return state;
    }

}

export default reducer;