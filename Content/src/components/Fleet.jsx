import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Vehicle from './Vehicle.jsx'


export default class Fleet extends Component {
    render() {
        const { fleet } = this.props;

        return <Panel hideIcon={true} title={<Label color={"green"} size="large" basic style={{ width: "100%" }}>Fleet: {fleet.Identity.Name}</Label>}>
            <Card.Group>{
                fleet.Vehicles.map(function (item, i) {
                    return <Vehicle key={i}  vehicle={item} />
                })
            }</Card.Group>
        </Panel>
    }
}