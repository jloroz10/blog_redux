import {TREAR_TODOS,LOADING_DATA,ERROR} from '../types/usersTypes';

const INITIAL_STATE={
    users:[],
    loading:false,
    error:null
}

export default(state = INITIAL_STATE,action) =>{
    switch(action.type){
        case TREAR_TODOS:
            return {...state,users:action.payload,loading:action.loading};
        case LOADING_DATA:
            return {...state,loading:action.loading,error:action.error};
        case ERROR:
            return {...state,loading:action.loading,error:action.error};
        default: return state;
    }
}