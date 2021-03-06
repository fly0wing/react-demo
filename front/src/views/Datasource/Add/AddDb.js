import React, {Component} from "react";
import CommonFormDb from "../common/CommonFormDb";
import BackwardButton from "../../Components/common/BackwardButton";
import {DATASOURCE_URL} from "../../../common/UrlCommon";
import {CREATE} from "../../../common/FetchWrapper";


class AddDb extends Component {

    defaultUpdateJson = {
        id: null,
        name: null,
        type: null,
        encode: null,
        createTime: null,
        modifiedTime: null,
        url: null,
        username: null,
        password: null,
        driver: null,
        properties: null
    };

    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.commit = this.commit.bind(this);

        this.state = {
            updateJson: this.defaultUpdateJson
        };
    }

    onTextChange(name, val) {
        const json = this.state.updateJson;
        json[name] = val;
        this.setState({
            updateJson: json
        });
    }

    commit() {
        let self = this;
        CREATE(DATASOURCE_URL,
            this.state.updateJson,
            (res) => self.props.history.goBack(),
            (error) => alert(error.message.replace(";", "\n").replace(":", "\n"))
        )
        ;
    }

    render() {
        let self = this;

        return (

            <div className="animated fadeIn">
                <div className="col-md-12">
                    <BackwardButton/>

                    <div className="card">
                        <div className="card-header">
                            <strong>Horizontal</strong> Form
                        </div>


                        <div className="card-block">
                            <CommonFormDb updateJson={{}} onTextChange={self.onTextChange}/>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={self.commit} className="btn btn-sm btn-primary"><i
                                className="fa fa-dot-circle-o"></i> Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDb;
