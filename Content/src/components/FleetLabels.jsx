import React, { Component } from 'react'
import FleetLabel from './FleetLabel'
import { Label, Segment, List } from 'semantic-ui-react';


export default class FleetLabels extends Component {
    render() {
        return (
            <List >
                {this.props.fleets && this.props.fleets.map((fleet, id) => {
                    return <List.Item key={id}>
                        <List.Content>
                            <Segment  >
                                <FleetLabel key={id} fleet={fleet} />
                            </Segment>
                        </List.Content>
                    </List.Item>
                })}
            </List>
        )
    }
}
