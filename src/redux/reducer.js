import { GET_TODO,ADD_TODO } from "./actionTypes";


const initialState = {
    user :{},
    todos :[]
};

const reducer = (state = initialState,action) => {
    switch (action.type){
        case GET_TODO : state.user=action.users[0];
                        state.todos=state.user.todos; 
                        return {"user":state.user,"todos":state.todos};
        case ADD_TODO : state.todos = action.payload;
                        return {...state,"todos":state.todos};
        default: return state;
    }

}

export default reducer;