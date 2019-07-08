import React,{Component} from 'react';
import {connect} from 'react-redux'

import * as usersActions from '../../actions/usersActions';

class Publications extends Component{

    componentDidMount(){
        //se tratara de leer la informacion de los usuarios solo cuando este vacio el arrlego,
        //si lo esta quiere decir que se refresco la pagina estando en publications
        if(!this.props.users.length){
            console.log('users is empty');
            this.props.traerTodos();
        }
    }

    mostrarUserName(){
        console.log(this.props);
        if(this.props.users.length>0){
            const userId = this.props.match.params.index;
            console.log(this.props.users[userId].name);
            return  this.props.users[userId].name;
            
        }
        else return '';
    }
    render(){
      
        return(     
            <div className="container">
                <h1>Publicaciones de {this.mostrarUserName()}</h1>
            </div>

       );
    }
}

const mapStateToProps = reducers => reducers.usersReducer;


export default connect(mapStateToProps,usersActions)(Publications);