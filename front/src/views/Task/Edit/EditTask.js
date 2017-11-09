import React, {Component} from "react";
import BackwardButton from "../../Components/common/BackwardButton";
import CommonFormTask from "../common/CommonFormTask";
import {SELECT, UPDATE} from "../../../common/FetchWrapper";
import {isNull} from "../../../common/Common";
import {getSingleTaskUrl} from "../../../common/UrlCommon";


class EditTask extends Component {


    defaultUpdateJson = null;

    constructor(props) {
        super(props);
        this.updateShow = this.updateShow.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.commit = this.commit.bind(this);

        this.state = {
            updateJson: this.defaultUpdateJson
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

        let params = this.props.match.params;
        let id = params.id;
        UPDATE(getSingleTaskUrl(id),
            this.state.updateJson,
            (res) => {
                if (res.ok) {
                    alert("update success");
                    self.props.history.goBack();
                } else {
                    console.warn(res);
                }
            })
        ;
    }

    updateShow() {
        let self = this;
        let params = this.props.match.params;
        let id = params.id;

        SELECT(getSingleTaskUrl(id),
            (json) => {
                self.setState({
                    updateJson: self.defaultUpdateJson
                });
                self.setState({
                    updateJson: json
                });
            }
        );
    }

    componentWillMount() {
        let params = this.props.match.params;
        this.updateShow(params.id);
    }


    render() {
        let params = this.props.match.params;
        if (isNull(params.id) || params.id < 0) {
            return null;
        }

        let self = this;
        let updateJson = this.state.updateJson;

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
                            <button type="reset" onClick={self.updateShow} className="btn btn-sm btn-danger"><i
                                className="fa fa-ban"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditTask;
