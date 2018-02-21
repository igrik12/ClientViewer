import React, { Component } from 'react'
import { Accordion, List, Label, Icon, Divider } from 'semantic-ui-react'
import Panel from './Panel.jsx'
import Fleet from './Fleet.jsx'


export default class ClientCardDescriptor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { fleets } = this.props

        var fleets = fleets.map(fleet => {
            return <Fleet key={fleet.Identity.Name} fleet={fleet} />
        })

        return fleets;
    }
}



