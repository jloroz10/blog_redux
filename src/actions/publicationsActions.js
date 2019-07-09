import axios from 'axios';
import { TREAR_TODOS, LOADING_DATA, ERROR } from '../types/publicationsTypes';

export const traerTodos = () => async(dispatch) =>{
    dispatch({
        type:LOADING_DATA
    })
  
  try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type:TREAR_TODOS,
            payload:response.data
        })
    }catch(e){
        dispatch({
            type:ERROR,
            payload:e.message
        })  
    }
  }