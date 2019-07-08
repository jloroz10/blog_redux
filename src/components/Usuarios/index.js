import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import PageLoading from '../../pages/PageLoading';
import PageError from '../../pages/PageError';
import UsersDetails from './UsersDetails.js';

class Usuarios extends Component{

    componentDidMount(){
        this.props.traerTodos();
    }

    render(){
        if(this.props.loading){
            return <PageLoading />
        }
        if(this.props.error){
            
            return <PageError error_msg={this.props.error}/>
        }
        return(
            <React.Fragment>
                 <h1 className="col-12 d-flex justify-content-center mt-3">Users</h1>
                 <UsersDetails />
            </React.Fragment>
      
        )
    }
}

const mapStateToProps=(reducers)=>{
    return reducers.usersReducer;
 }
 export default connect(mapStateToProps,usersActions)(Usuarios);