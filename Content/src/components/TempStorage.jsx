class NestedListItem extends Component {
    render() {
        return <ListItem
            primaryText={this.props.name}
            leftIcon={<Icon name={this.props.iconName} size='large' />}
            nestedItems={this.props.children} />
    }
}

class FleetTemp extends Component{
    constructor(props){
        super(props);
    }

    render() {

        var { fleet } = this.props;
        return <NestedListItem name={fleet.Identity.Name} iconName={"train"}>{fleet.Vehicles.map(function (item, i) {
            return <VehicleTemp key={i} vehicle={item}/>
        })}</NestedListItem>
    }
}


class VehicleTemp extends Component {
    constructor(props){
        super(props);
    }

    render() {

        var { vehicle } = this.props;
        return <NestedListItem name={vehicle.Identity.Name} iconName={"train"}>{vehicle.Products.map(function (item, i) {
            return <ProductTemp key={i} product={item}/>
        })}</NestedListItem>
    }
}

class ProductTemp extends Component{
    constructor(props){
        super(props);
    }

    render() {
        
        var { product } = this.props;
        return <NestedListItem name={product.Identity.Name} iconName={"train"}>{product.Frameworks.map(function (item, i) {
            return <FrameworkTemp key={i} framework={item}/>
        })}</NestedListItem>
    }
}

class FrameworkTemp extends Component{
    constructor(props){
        super(props);
    }

    render() {
        
        var { framework } = this.props;
        return <NestedListItem name={framework.Identity.Name} iconName={"train"}>{framework.StarterMotorConfigurations.map(function (item, i) {
            "return <Framework key={i} framework={item}/>"
        })}</NestedListItem>
    }
}