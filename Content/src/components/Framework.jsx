import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card, Label } from 'semantic-ui-react'
import Plugin from './Plugin.jsx'


export default class Framework extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { framework } = this.props;

        return <Panel hideIcon={true} title={<Label color={"green"} size="large" basic style={{ width: "100%" }}>Framework: {framework.Identity.Name}</Label>}>
            <Card.Group>{
                framework.StarterMotorConfigurations.map(function (item, i) {
                    return <Plugin key={item.Identity.Name} plugin={item} />
                })
            }</Card.Group>
        </Panel>
    }
}