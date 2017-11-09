import React, {Component} from "react";
import BackwardButton from "../../Components/common/BackwardButton";
import {CREATE} from "../../../common/FetchWrapper";
import {TASK_URL} from "../../../common/UrlCommon";
import CommonFormTask from "../common/CommonFormTask";


class AddTask extends Component {


    constructor(props) {
        console.log("edit db ");
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.commit = this.commit.bind(this);

        this.state = {
            updateJson: {}
        };
    }

    onTextChange(name, obj) {
        let updateJson = this.state.updateJson;
        updateJson[name] = obj;
        this.setState({
            updateJson: updateJson
        });
    }

    commit() {

        let self = this;

        CREATE(TASK_URL,
            this.state.updateJson,
            (res) => {
                alert("update success");
                self.props.history.goBack();
            }
        )
        ;
    }

    render() {
        let self = this;
        const updateJson = self.state.updateJson;

        return (

            <div className="animated fadeIn">
                <div className="col-md-12">
                    <BackwardButton/>
                    <div className="card">
                        <div className="card-header">
                            <strong>Horizontal</strong> Form
                        </div>
                        <div className="card-block">
                            <CommonFormTask updateJson={updateJson} onChange={self.onTextChange}/>
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

export default AddTask;
