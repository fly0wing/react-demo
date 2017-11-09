import React, {Component} from "react";
import TextInput from "../../Components/common/TextInput";
import Property from "../../Components/common/Property";


class ESForm extends Component {
    render() {
        let props = this.props;
        let updateJson = this.props.updateJson;

        return (
            <div>
                <TextInput id="url" value={updateJson.url}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <Property id="properties" value={updateJson.properties}
                          onChange={props.onTextChange} disabled="" warningMsg=""/>
            </div>
        )
    }
}

export default ESForm;
