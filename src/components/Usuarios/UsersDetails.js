import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
 function ponerFilas(props){
    return(
    props.users.map((usuario,index) =>(
      <div className="row" key={usuario.id}>
      <div className="col-3 d-flex justify-content-center ">{usuario.name}</div>
      <div className="col-3 d-flex justify-content-center">{usuario.email}</div>
      <div className="col-3 d-flex justify-content-center">{usuario.website}</div>
      <div className="col-3 d-flex justify-content-center">
        <Link to={`/Publications/${index}`} className="eye-solid icon"></Link>
      </div>
    </div>
    ))
    );
 };

const UsersDetails = (props) =>{
    return(
        <div className="container">
            <div className="row mb-2 mt-3">
                <div className="col-3 d-flex justify-content-center text-info">
                    Name
                </div>
                <div className="col-3 d-flex justify-content-center text-info">
                    Email
                </div>
                <div className="col-3 d-flex justify-content-center text-info">
                    Website
                </div>
                <div className="col-3 d-flex justify-content-center text-info">
                    
                </div>
            </div>

        {ponerFilas(props)}

        </div>
    )
    
}


const mapStateToProps = (reducers)=>{
    return reducers.usersReducer;
}
//como Usuarios/index.js llama a la funcion traerTodos() el arreglo users ya tiene la lista completa
//aqui solo se llama al arreglo para desplegar
export default connect(mapStateToProps)(UsersDetails);