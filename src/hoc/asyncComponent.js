import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        render() {
            const C = this.state.component;
            return this.state.component ? <C {...this.props} /> : null;
        }

        componentDidMount() {
            importComponent().then(
                cmp => {
                    this.setState({ component: cmp.default });
                }
            );
        }
    }
}

export default asyncComponent;
