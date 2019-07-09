import axios from 'axios';
import { TREAR_TODOS, LOADING_DATA, ERROR,TRAER_POR_USERID} from '../types/publicationsTypes';

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

  
export const traerPorUserId = (index) => async(dispatch,getState) =>{
    const {users} = getState().usersReducer;
    const {publications} = getState().publicationsReducer;

    const userId = users[index].id;
    

    console.log("userid "+userId);
    dispatch({
        type:LOADING_DATA
    })
  
  try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
           
            const publications_actualized = [
                ...publications,
                response.data
            ]
        dispatch({
            type:TRAER_POR_USERID,
            payload:publications_actualized
        })
    }catch(e){
        dispatch({
            type:ERROR,
            payload:e.message
        })  
    }
  }