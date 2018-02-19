import React, { Component } from 'react'
import { Accordion, List, Label, Icon, Divider } from 'semantic-ui-react'
import ProductList from './ProductList.jsx'
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

// class VehicleList extends Component {
//     render() {
//         return (<div>
//             <List selection verticalAlign='middle'>
//                 {this.props.vehicles.map(vehicle => {
//                     return <div key={vehicle.Identity.Name}>
//                         <List.Item>
//                             <Icon circular size="big" name='train' /><Label color="teal">{vehicle.Identity.Name}</Label>
//                             <List.Content>
//                                 <Divider horizontal><b><h3>Products</h3></b></Divider>
//                                 <ProductList products={vehicle.Products} />
//                             </List.Content>
//                         </List.Item>
//                     </div>
//                 })}
//             </List>
//         </div>)
//     }
// }


