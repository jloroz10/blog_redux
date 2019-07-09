import React from 'react';
import './styles/Badges.css';

import BadgesList from '../components/BadgesList.js';
import {Link} from 'react-router-dom';

import PageLoading from '../components/PageLoading';
import MiniLoader from '../components/MiniLoader';
import PageError from '../components/PageError';
import confLogo from '../images/badge-header.svg';
import api from '../api';
class Badges extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loading:true,
            error:null,
            data: undefined
          };
    }

    componentDidMount(){
        this.fetchData();

        this.intervalId = setInterval(this.fetchData,5000);

    }

    
    fetchData = async () =>{
      
        this.setState({
            loading:true,
            error:null
        })

        try{
            const data = await api.badges.list();
            this.setState({
                loading:false,
                data:data
            })
        
        }catch(e){
            this.setState({
                loading:false,
                error:e
            })
        }
    }
    componentDidUpdate(prevProps,prevState){
       
        // console.log({
        //     prevProps:prevProps,prevState:prevState
        // })

        // console.log({
        //     props:this.props,state:this.state
        // })
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);

    }
    render(){
        if(this.state.loading===true && !this.state.data){
            return <PageLoading />;
        }

        if(this.state.error){
            return <PageError error={this.state.error}/>;
        }

        return(
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img src={confLogo} alt="Logo"/>
                        </div>
                    </div>
                </div>

                <div className="Badges__container">
                    <div className="Badges__buttons">
                        {/* sirve igual que el ancla 'a' pero evita que toda la pagina se renderice */}
                        <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
                    </div>

                    <div className="Badges__list">
                        <div className="Badges__container">
                             <BadgesList badges={this.state.data}/>
                        </div>
                        {this.state.loading && <MiniLoader />}
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default Badges;

