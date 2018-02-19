import React, { Component } from "react";
import { Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


export default class ClientLabel extends Component {
    render() {
        return <div>
            {/* <Link to={{
                pathname: '/clientpage',
                state: this.props.client
            }} > */}
                <Label ribbon="right" horizontal as='a' color='teal' image size='small'>
                    <Image size='large' src="http://www.planetcreation.co.uk/createpic/create-avatar.JPG" />
                    {this.props.name}
                </Label>
            {/* </Link> */}
        </div>
    }
}
