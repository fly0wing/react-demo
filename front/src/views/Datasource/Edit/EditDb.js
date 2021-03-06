import React, {Component} from "react";
import BackwardButton from "../../Components/common/BackwardButton";
import CommonFormDb from "../common/CommonFormDb";
import createBrowserHistory from "history/es/createBrowserHistory";
import {isNull} from "../../../common/Common";
import {SELECT, UPDATE} from "../../../common/FetchWrapper";
import {getSingleDBUrl} from "../../../common/UrlCommon";

const history = createBrowserHistory();

class EditDb extends Component {


    defaultUpdateJson = {
        id: "",
        name: "",
        type: "",
        encode: "",
        createTime: "",
        modifiedTime: "",
        url: "",
        username: "",
        password: "",
        driver: "",
        properties: "",
        tables: "",
        dbDataMediaSources: ""
    };

    constructor(props) {
        super(props);
        this.updateShow = this.updateShow.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.commit = this.commit.bind(this);

        this.state = {
            resultJson: null,
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
        let params = this.props.match.params;
        let id = params.id;
        UPDATE(getSingleDBUrl(id),
            this.state.updateJson,
            (res) => {
                alert("update success");
                history.goBack();
            }
        )
        ;
    }

    updateShow(e) {
        let self = this;
        let params = this.props.match.params;
        let id = params.id;

        SELECT(getSingleDBUrl(id),
            (json) => {
                console.info(json);
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
                            <CommonFormDb updateJson={updateJson} onTextChange={self.onTextChange}/>
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

export default EditDb;
