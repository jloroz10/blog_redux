import React from 'react';

import headerImg from '../images/platziconf-logo.svg';
import Badge from '../components/Badge.js';
import BadgeForm from '../components/BadgeForm.js';
import './styles/BadgeNew.css';
import api from '../api';
import PageLoading from '../components/PageLoading';
class BadgeNew extends React.Component{

    // para no ver el mensaje de que un elemento paso a no controlado
    // se deben inicializar las variables
    state = {
        loading:false,
        error:null,
        form:{
            firstName:'',
            lastName:'',
            jobTitle:'',
            twitter:'',
            hashtag:'',
            email:''
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
            api.badges.create(this.state.form);

            this.setState({
                loading:false,
                form:{
                    firstName:'',
                    lastName:'',
                    jobTitle:'',
                    twitter:'',
                    hashtag:'',
                    email:''
                }})
            console.log(this.props);
            this.props.history.push('/badges');
            // this.setState({loading:false});
        }catch(e){
            console.log("error");
            this.setState({loading:false,error:e})
        }
      
    }
    render(){

        if(this.state.loading){
            return <PageLoading />;
        }

        return (
            <React.Fragment>
              
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={headerImg} alt="header logo"/>
                </div>

                <div className="container">
                    <div className="row">
                            <div className="col-12 col-md-6">
                                <BadgeForm 
                                type="New"
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

export default BadgeNew;