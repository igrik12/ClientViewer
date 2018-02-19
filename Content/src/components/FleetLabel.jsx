import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

export default class FleetLabel extends Component {
    render() {
        return (
            <div>
                <Label ribbon="right" horizontal as='a' color='teal' image size='medium'>
                    {/* <Image size='large' src={'/assets/avatars/users-' + this.props.id + '.svg'} /> */}
                    {this.props.fleet.Identity.Name}
                </Label>
            </div>
        )
    }
}