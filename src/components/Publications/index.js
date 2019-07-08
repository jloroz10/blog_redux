import React,{Component} from 'react';

class Publications extends Component{
    render(){
        console.log(this.props.match.params.index);
        return(<h1>Pubs</h1>);
       
    }
}
export default Publications;