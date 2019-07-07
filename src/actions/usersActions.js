import axios from 'axios';
import {TREAR_TODOS,LOADING_DATA,ERROR} from '../types/usersTypes';

export const traerTodos = () => async(dispatch) =>{
    
    dispatch({
        type:LOADING_DATA,
        loading:true,
        error:null
    })
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
        dispatch({
            type:TREAR_TODOS,
            payload:response.data,
            loading:false
        })

    }catch(e){
        dispatch({
            type:ERROR,
            loading:false,
            error:e.message
        })
    }
}
