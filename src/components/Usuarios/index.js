import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import PageLoading from '../../pages/PageLoading';
import PageError from '../../pages/PageError';

class Usuarios extends Component{

    componentDidMount(){
        this.props.traerTodos();
    }

    ponerFilas = () =>(
        this.props.users.map(usuario =>(
          <div className="row" key={usuario.id}>
          <div className="col-4 d-flex justify-content-center ">{usuario.name}</div>
          <div className="col-4 d-flex justify-content-center">{usuario.email}</div>
          <div className="col-4 d-flex justify-content-center">{usuario.website}</div>
        </div>
        ))
     );
    render(){
        if(this.props.loading){
            return <PageLoading />
        }
        if(this.props.error){
            
            return <PageError error_msg={this.props.error}/>
        }
        return(
           <div className="container">
               <div className="row mb-2 mt-3">
                   <div className="col-4 d-flex justify-content-center text-info">
                        Name
                   </div>
                   <div className="col-4 d-flex justify-content-center text-info">
                        Email
                   </div>
                   <div className="col-4 d-flex justify-content-center text-info">
                        Website
                   </div>
               </div>

             {this.ponerFilas()}

           </div>
        )
    }
}

const mapStateToProps=(reducers)=>{
    return reducers.usersReducer;
 }
 export default connect(mapStateToProps,usersActions)(Usuarios);