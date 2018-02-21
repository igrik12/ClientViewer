import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Framework from './Framework.jsx'


export default class Product extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { product } = this.props;

        return <Panel hideIcon={true} title={<Label color={"green"} size="large" basic style={{ width: "100%" }}>Product: {product.Identity.Name}</Label>}>
            <Card.Group>{
                product.Frameworks.map(function (item, i) {
                    return <Framework key={i} framework={item} />
                })
            }</Card.Group>
        </Panel>
    }
}