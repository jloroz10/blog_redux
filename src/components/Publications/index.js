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

class Publications extends Component{

    componentDidMount(){
        //se tratara de leer la informacion de los usuarios solo cuando este vacio el arrlego,
        //si lo esta quiere decir que se refresco la pagina estando en publications
        if(!this.props.usersReducer.users.length){
            console.log('users is empty');
            this.props.usersTraerTodos();
        }
    }

    mostrarUserName(){
        console.log(this.props);
        if(this.props.usersReducer.users.length>0){
            const userId = this.props.match.params.index;
            console.log(this.props.usersReducer.users[userId].name);
            return  this.props.usersReducer.users[userId].name;
            
        }
        else return '';
    }
    render(){
        if(this.props.loading){
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
    publicationsTraerTodos
}

export default connect(mapStateToProps,mapDispatchToProps)(Publications);