import React,{Component} from 'react';
import {connect} from 'react-redux'

import * as usersActions from '../../actions/usersActions';
import * as publicationsActions from '../../actions/publicationsActions';

import PageLoading from '../../pages/PageLoading';
import PageError from '../../pages/PageError';
import Usuarios from '../Usuarios';

//cuando hay 2 metodos con el mismo nombre en 2 reducers no se traen los 2 metodos
//por ende tenemos que identificarlos para poder acceder a ambos
const {traerTodos: usersTraerTodos} = usersActions;
const {traerPorUserId: publicationsTraerPorUserId} = publicationsActions;

class Publications extends Component{
//el async sirve para saber que hay llamdas asincronas adentro y hasta que 
//termine uno puede comenzar el siguiente proceso
  async  componentDidMount(){
      console.log('entro a componentDidMountS')
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

        if(!('publications_key' in this.props.usersReducer.users[index])){
            console.log('entro a buscar pubs')
            publicationsTraerPorUserId(index);
        }
    }

    displayUserName(){
      
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

    displayPublications = () =>{
        const {
            publicationsReducer,
            usersReducer,
            usersReducer:{users},
            match:{params:{index }}
        } = this.props;


        if(!users.length) return;
        if(usersReducer.error) return;

        if(publicationsReducer.error){
            return <PageError error_msg={usersReducer.error} />
        }
        if(!publicationsReducer.publications.length || publicationsReducer.loading)
           return <PageLoading />

        if(!('publications_key' in this.props.usersReducer.users[index]))return;
        
        console.log( usersReducer.users[index].publications_key);

        const {publications_key} = users[index];

        const publications = publicationsReducer.publications[publications_key];
        

        return( <div className="container mt-5">
                   {publications.map(publication =>{
                        return(<div key={publication.id}>
                                    <h4>{publication.title}</h4>
                                    <p>{publication.body}</p>
                                </div>
                            );
                        })
                    }
                </div>
        );
        
    }
    render(){
        console.log('render');
        return(     
            <div className="container">
                {this.displayUserName()}
                {this.displayPublications()}
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