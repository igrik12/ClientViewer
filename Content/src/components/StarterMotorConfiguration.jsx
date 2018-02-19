import React, { Component } from 'react'
import { Popup, List } from 'semantic-ui-react'


export default class StarterMotorConfiguration extends Component {
    render() {
        var config = this.props.config
        var content = <List bulleted>
            <List.Item><b>Id:</b> {config.Identity.Id}</List.Item>
            <List.Item><b>Friendly Name:</b> {config.Identity.Name}</List.Item>
        </List>

        return (
            <div>
                <Popup
                    trigger={<div>{config.Identity.Name}</div>}
                    content={content}
                    offset={100}
                    position='left center'
                />
            </div>
        )
    }

}