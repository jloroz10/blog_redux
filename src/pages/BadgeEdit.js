import React from 'react';

import headerImg from '../images/platziconf-logo.svg';
import Badge from '../components/Badge.js';
import BadgeForm from '../components/BadgeForm.js';
import './styles/BadgeEdit.css';
import api from '../api';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component{

    // para no ver el mensaje de que un elemento paso a no controlado
    // se deben inicializar las variables
    state = {
        loading:true,
        error:null,
        form:{
            firstName:'',
            lastName:'',
            jobTitle:'',
            twitter:'',
            hashtag:'',
            email:'',
            avatarUlr:''
        }
    }

    
    handleChange = e =>{
        this.setState({
            form:{
                //para que se copie el estado anterior antes de agregar un nuevo cambio,
                //de otro modo solo se tendria un atributo en el form
                ...this.state.form, 
                [e.target.name]:e.target.value
            }
        })
    }

    handleSubmit= async e=>{
        e.preventDefault();
        this.setState({loading:true,error:null});
        try{
           await api.badges.update(this.props.match.params.badgeId,this.state.form);

            this.setState({
                loading:false,
                form:{
                    firstName:'',
                    lastName:'',
                    jobTitle:'',
                    twitter:'',
                    hashtag:'',
                    email:'',
                    avatarUrl:''
                }})
            // console.log(this.props);
            this.props.history.push('/badges');
            // this.setState({loading:false});
        }catch(e){
            console.log("error");
            this.setState({loading:false,error:e})
        }
      
    }

    componentDidMount= async () =>{

        try{
            // console.log(this.props);
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({
                form:data,
                loading:false
                
            })
            
        }catch(e){
            console.log(e.message);
        }
        

    }

    render(){

        if(this.state.loading){
            return <PageLoading />;
        }

        return (
            <React.Fragment>
              
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={headerImg} alt="header logo"/>
                </div>

                <div className="container">
                    <div className="row">
                            <div className="col-12 col-md-6">
                                <BadgeForm type='Edit'
                                formValues={this.state.form} 
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                error={this.state.error}/>
                            </div>

                            <div className="col-12 col-md-6">
                                <Badge  firstName={this.state.form.firstName || 'FIRST_NAME'}
                                        lastName={this.state.form.lastName || 'LAST_NAME'}
                                        jobTitle={this.state.form.jobTitle || 'JOB_TITLE'} 
                                        twitter={this.state.form.twitter || 'twitter'}
                                        email={this.state.form.email || 'email@email.com'}
                                        footerMsg={this.state.form.hashtag || '#hasttag'}
                                         />
                            </div>

                          
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;