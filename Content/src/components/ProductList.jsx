import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ActionInfo from 'material-ui/svg-icons/action/info';
import FrameworkModal from './FrameworkModal.jsx'

export default class ProductList extends Component {
    render() {
        var products = this.props.products

        return (
            <div>
                <MuiThemeProvider>
                    <List>
                        <Subheader>Products</Subheader>
                        {
                            products.map(product => {
                                return <ListItem
                                    key={product.Identity.Name}
                                    primaryText={<FrameworkModal product={product} />}
                                    leftAvatar={<Icon circular name="settings" />}
                                    rightIcon={<ActionInfo />}
                                />
                            })
                        }
                    </List>
                </MuiThemeProvider>
            </div>
        )
    }
}
