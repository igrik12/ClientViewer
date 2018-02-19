import React, { Component } from 'react'
import Panel from './Panel.jsx'
import { Card } from 'semantic-ui-react'


export default class Plugin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { plugin } = this.props;

        return plugin.Identity.Name
    }
}