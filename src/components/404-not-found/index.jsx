import React, {Component} from 'react';

require('./style.less');
export default class NotFound extends Component {
    static PropTypes = {};
    static DefaultTypes = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="not-found">
                <span>404</span>
            </div>
        )
    }
}