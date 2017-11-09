import React, {Component} from "react";
import TextInput from "../../Components/common/TextInput";
import Property from "../../Components/common/Property";


class DatabaseForm extends Component {

    render() {
        let props = this.props;
        let updateJson = this.props.updateJson;

        return (
            <div>
                <TextInput id="url" value={updateJson.url}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <TextInput id="username" value={updateJson.username}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <TextInput id="password" value={updateJson.password}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <TextInput id="driver" value={updateJson.driver}
                           onChange={props.onTextChange} disabled="" warningMsg=""/>

                <Property id="properties" value={updateJson.properties}
                          onChange={props.onTextChange} disabled="" warningMsg=""/>
            </div>
        )
    }
}

export default DatabaseForm;
