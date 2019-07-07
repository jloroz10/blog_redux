import {TREAR_TODOS,LOADING_DATA} from '../types/usersTypes';

const INITIAL_STATE={
    users:[],
    loading:false
}

export default(state = INITIAL_STATE,action) =>{
    switch(action.type){
        case TREAR_TODOS:
            return {...state,users:action.payload,loading:action.loading};
        case LOADING_DATA:
            return {...state,loading:action.loading};

        default: return state;
    }
}