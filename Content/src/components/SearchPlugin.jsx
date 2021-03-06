import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import PluginModal from './PluginModal.jsx';

const linq = require('mini-linq-js');

export default class SearchPlugin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            initialPlugins: [],
            isLoading: false
        }
    }

    componentWillMount() {
        this.resetComponent()
    }

    componentDidMount() {
        if (this.props.selected.size == 0) {
            this.setState({
                initialPlugins: this.props.fleets
                    .selectMany(f => f.Vehicles)
                    .selectMany(v => v.Products)
                    .selectMany(p => p.Frameworks)
                    .selectMany(fw => fw.PluginConfigurations),
                results: this.props.plugins
            })
        } else {
            var vehicles = this.props.fleets.selectMany(f => f.Vehicles).where(x => this.props.selected.any(s => s.name === x.Identity.Name));
            this.setState({
                initialPlugins: vehicles
                    .selectMany(v => v.Products)
                    .selectMany(p => p.Frameworks)
                    .selectMany(fw => fw.PluginConfigurations),
                results: this.props.plugins
            })
        }

    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.setState({ value: result.title.props.plugin.Identity.Name });

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });
        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            if (this.props.selected.size != 0) {
                var vehicles = this.props.fleets.selectMany(f => f.Vehicles).where(v => this.props.selected.has(v.Identity.Name));
                console.log(vehicles);
                updatedList = vehicles
                    .selectMany(v => v.Products)
                    .selectMany(p => p.Frameworks)
                    .selectMany(fw => fw.PluginConfigurations)
            } else {
                var updatedList = this.state.initialPlugins;
            }

            updatedList = updatedList.filter(function (item) {
                return item.Identity.Name.toLowerCase().search(
                    value.toLowerCase()) !== -1;
            });

            const res = updatedList.select((x) => {
                return { "title": <PluginModal plugin={x} /> }
            });
            this.setState({ isLoading: false, results: res });
        }, 500)
    };

    render() {
        const { isLoading, value, results } = this.state;
        return (
            <Search
                placeholder='Search plugin...'
                aligned="left"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
            />
        )
    }
}

