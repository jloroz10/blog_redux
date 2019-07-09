import React,{Component} from 'react';
import {connect} from 'react-redux'

import * as usersActions from '../../actions/usersActions';
import * as publicationsActions from '../../actions/publicationsActions';

import PageLoading from '../../pages/PageLoading';
import PageError from '../../pages/PageError';

//cuando hay 2 metodos con el mismo nombre en 2 reducers no se traen los 2 metodos
//por ende tenemos que identificarlos para poder acceder a ambos
const {traerTodos: usersTraerTodos} = usersActions;
const {traerPorUserId: publicationsTraerPorUserId} = publicationsActions;

class Publications extends Component{
//el async sirve para saber que hay llamdas asincronas adentro y hasta que 
//termine uno puede comenzar el siguiente proceso
  async  componentDidMount(){
      const {
          publicationsTraerPorUserId,
          usersTraerTodos,
          match:{ params :{ index }} //for each . we have to destructure i.e. this.props.match.params.index
      } = this.props;

        //se tratara de leer la informacion de los usuarios solo cuando este vacio el arrlego,
        //si lo esta quiere decir que se refresco la pagina estando en publications
        if(!this.props.usersReducer.users.length){
           await usersTraerTodos();
        }

        if(this.props.usersReducer.error)
            return;

        if(!('publications_key' in this.props.usersReducer.users[index]))
             publicationsTraerPorUserId(index);
    }

    mostrarUserName(){
      
        //how this method is being called from render() we can destructure the userReducer
        const {
            usersReducer,
            match:{params:{ index}}
        } = this.props;

        if(usersReducer.error){
            return <PageError error_msg={usersReducer.error} />
        }
        if(!usersReducer.users.length || usersReducer.loading)
           return <PageLoading />

        // console.log(this.props.usersReducer.users[userId].name);
        const name = usersReducer.users[index].name
         return (
            <h1>
                Publicaciones de {name}
            </h1>
         );
            
    }

  
    render(){
      
        return(     
            <div className="container">
                {this.mostrarUserName()}
            </div>

       );
    }
}

const mapStateToProps = ({usersReducer,publicationsReducer}) =>{
    return {publicationsReducer,
            usersReducer}
} 

//se podrian traer los reducers completos
//pero es mejor traer las funciones individualemente
const mapDispatchToProps = {
    usersTraerTodos,
    publicationsTraerPorUserId
}

export default connect(mapStateToProps,mapDispatchToProps)(Publications);