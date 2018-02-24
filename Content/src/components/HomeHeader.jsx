import React, { Component } from 'react';
import { Radio, Icon, Header, Search } from 'semantic-ui-react'

export default class HomeHeader extends Component {
    render() {
        var styles = {
            background:"#15BB9C"
            };

        return (
            <div style={styles}>
                <Header as='h3' icon textAlign='center'>
                    <Icon inverted name='database' circular />
                    <span style={{color:"#FFFFFF"}}>Clients database</span>
                    </Header>
                <Header textAlign='center'>
                </Header>
                <span style={{color:"#FFFFFF"}}> <h4>Clients</h4></span>
                {/* <Radio toggle onClick={this.props.toggle}>Clients</Radio> */}
            </div>)
    }
}
