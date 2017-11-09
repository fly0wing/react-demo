import React, {Component} from "react";
import TextInput from "../../Components/common/TextInput";
import Property from "../../Components/common/Property";


class CDSForm extends Component {
    render() {
        let updateJson = this.props.updateJson;
        let props = this.props;
        return (
            <div>
                <TextInput id="url" value={updateJson.url}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <TextInput id="driver" value={updateJson.driver}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <Property id="properties" value={updateJson.properties}
                          onChange={props.onTextChange} disabled="" warningMsg=""/>
            </div>
        )
    }
}

export default CDSForm;
