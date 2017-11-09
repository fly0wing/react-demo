import React, {Component} from "react";


/**
 * 和SelectComp.js配合使用
 */
class SelectOption extends Component {
    render() {
        let props = this.props;
        return (
            <option value={props.value}>{props.showName}</option>
        )
    }
}

export default SelectOption;
