import React, { Component } from 'react';
import { Icon, Header} from 'semantic-ui-react'

export default class HomeHeader extends Component {
    render() {
        let styles = {
            background: "#15BB9C"
        };

        return (
            <div style={styles}>
                <Header as='h3' icon textAlign='center'>
                    <Icon inverted name='database' circular />
                    <span style={{color:"#FFFFFF"}}>Clients database</span>
                    </Header>
                    <br/>
            </div>)
    }
}
