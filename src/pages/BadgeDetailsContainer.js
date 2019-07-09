import React,{Component} from 'react';

import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';

import BadgeDetails from './BadgeDetails';
import api from '../api';

export default class BadgeDetailsContainer extends Component{
    state={
        loading:true,
        error:null,
        data:undefined,
        modalIsOpen:false
    }

    componentWillMount = async () =>{
        this.setState({loading:true,error:null})
        try{
            const data = await api.badges.read(this.props.match.params.badgeId);
            this.setState({loading:false,data:data})
        }catch(e){
            this.setState({loading:false,error:e})
        }

    }

    handleOpenModal= () =>{
        this.setState({modalIsOpen:true})
    }

    handleCloseModal= () =>{
        this.setState({modalIsOpen:false})
    }

    handleDeleteBadge= async()=>{
        this.setState({loading:true,error:null})

        try{
            await api.badges.remove(this.props.match.params.badgeId);
            this.setState({loading:false})

            this.props.history.push('/badges');
        }catch(e){
            this.setState({loading:false,error:e})
        }
    }
    render(){

        if(this.state.loading){
            return <PageLoading />
        }

        if(this.state.error){
            return <PageError error={this.state.error} />
        }
    
        return (
            <BadgeDetails onCloseModal={this.handleCloseModal}
                          onOpenModal={this.handleOpenModal}
                          modalIsOpen={this.state.modalIsOpen}
                          badge={this.state.data}
                          onDeleteBadge={this.handleDeleteBadge}/>
        );
    }
}