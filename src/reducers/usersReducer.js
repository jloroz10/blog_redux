import {TRAER_TODOS,LOADING_DATA,ERROR} from '../types/usersTypes';

const INITIAL_STATE={
    users:[],
    loading:false,
    error:null
}

export default(state = INITIAL_STATE,action) =>{
    switch(action.type){
        case TRAER_TODOS:
            return {...state,users:action.payload,loading:false};
        case LOADING_DATA:
            return {...state,loading:true,error:null};
        case ERROR:
            return {...state,loading:false,error:action.payload};
        default: return state;
    }
}