import {TREAR_TODOS,LOADING_DATA,ERROR} from '../types/publicationsTypes';

const INITIAL_STATE={
    publications:[],
    loading:false,
    error:null
}

export default(state = INITIAL_STATE,action) =>{
    //actions dispara el dispatch y si hay 2 casos con el mismo nombre en 
    //dos reducers los 2 se ejecutaran
    //se recomienda tener 2 achivos types para difereciar los casos
    switch(action.type){
         case TREAR_TODOS:
             return {...state,
                     publications:action.payload,
                     loading:false};
         case LOADING_DATA:
             return {...state,loading:true,error:null};
         case ERROR:
             return {...state,loading:false,error:action.payload};
        default: return state;
    }
}