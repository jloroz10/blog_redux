import axios from 'axios';
import { TREAR_TODOS, LOADING_DATA, ERROR,TRAER_POR_USERID} from '../types/publicationsTypes';

import * as usersTypes from  '../types/usersTypes';

const {TRAER_TODOS: USUARIOS_TRAER_TODOS} = usersTypes;

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
        ];

        const publications_key = publications_actualized.length - 1;
        const users_actualized = [...users];

        //adding a new attribute to identify which users had publications assigned
        users_actualized[index] ={
            ...users[index],
            publications_key // = a "publication_key:publication_key" en ES6 si ambos se llaman igual se puede poner solo 1 vez
        }

        dispatch({
            type:USUARIOS_TRAER_TODOS,
            payload:users_actualized
        })

        //llamando al dispatch de usersActions

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