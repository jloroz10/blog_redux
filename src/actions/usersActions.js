import axios from 'axios';
import {TREAR_TODOS,LOADING_DATA,ERROR} from '../types/usersTypes';

export const traerTodos = () => async(dispatch) =>{
    
    dispatch({
        type:LOADING_DATA,
    })
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
        dispatch({
            type:TREAR_TODOS,
            payload:response.data,
        })

    }catch(e){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal, intente mas tarde'
            
        })
    }
}
