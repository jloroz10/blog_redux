import React,{Component} from 'react';
import {connect} from 'react-redux'

import * as usersActions from '../../actions/usersActions';
import * as publicationsActions from '../../actions/publicationsActions';

import PageLoading from '../../pages/PageLoading';
import PageError from '../../pages/PageError';

//cuando hay 2 metodos con el mismo nombre en 2 reducers no se traen los 2 metodos
//por ende tenemos que identificarlos para poder acceder a ambos
const {traerTodos: usersTraerTodos} = usersActions;
const {traerTodos: publicationsTraerTodos} = publicationsActions;
const {traerPorUserId: publicationsTraerPorUserId} = publicationsActions;

class Publications extends Component{
//el async sirve para saber que hay llamdas asincronas adentro y hasta que 
//termine uno puede comenzar el siguiente proceso
  async  componentDidMount(){
        //se tratara de leer la informacion de los usuarios solo cuando este vacio el arrlego,
        //si lo esta quiere decir que se refresco la pagina estando en publications
        if(!this.props.usersReducer.users.length){
           await this.props.usersTraerTodos();
        }
         this.props.publicationsTraerPorUserId(this.props.match.params.index);
    }

    mostrarUserName(){
      
        if(this.props.usersReducer.users.length>0){
            const userId = this.props.match.params.index;
            // console.log(this.props.usersReducer.users[userId].name);
            return  this.props.usersReducer.users[userId].name;
            
        }
        else return '';
    }
    render(){
        console.log(this.props)
        if(this.props.publicationsReducer.loading || this.props.usersReducer.loading){
           return <PageLoading />
        }
        return(     
            <div className="container">
                <h1>Publicaciones de {this.mostrarUserName()}</h1>
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
    publicationsTraerTodos,
    publicationsTraerPorUserId
}

export default connect(mapStateToProps,mapDispatchToProps)(Publications);