import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Product from './Product.jsx'

export default class Vehicle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { vehicle } = this.props;

        return <Panel hideIcon={true} title={<Label color={"green"} size="large" basic style={{ width: "100%" }}>Vehicle: {vehicle.Identity.Name}</Label>}>
            <Card.Group>{
                vehicle.Products.map(function (item, i) {
                    return <Product key={item.Identity.Name} product={item} />
                })
            }</Card.Group>
        </Panel>
    }
}