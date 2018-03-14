import React, { Component } from 'react';
import { Icon, Header} from 'semantic-ui-react'

export default class HomeHeader extends Component {
    render() {
        let styles = {
            background: "#15BB9C"
        };

        return (
            <div style={styles}>
                <Header style={{paddingTop:15}} as='h3' icon textAlign='center'>
                    <Icon inverted name='database' circular />
                    <span style={{color:"#FFFFFF", fontSize:"150%", fontFamily:"Palatino"}}>Clients database</span>
                    </Header>
                    <br/>
            </div>)
    }
}
