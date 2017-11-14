import React, {Component} from "react";
import {SELECT} from "../../../common/FetchWrapper";
import {getSingleProcessedUrl} from "../../../common/UrlCommon";
import TextDiv from "../../Components/common/TextDiv";
import BackwardButton from "../../Components/common/BackwardButton";


class ShowProcessed extends Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);

        this.state = {
            resultJson: {
                id: null,
                taskId: null,
                uniqueId: null,
                content: null,
                status: null,
                createTime: null,
                finishTime: null,
                modifiedTime: null
            }
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        let self = this;
        let params = this.props.match.params;
        let id = params.id;

        SELECT(getSingleProcessedUrl(id),
            (json) => {
                self.setState({
                    resultJson: json
                });
            }
        )
        ;
    }

    render() {
        let self = this;
        let resultJson = self.state.resultJson || [];
        return (
            <div className="animated fadeIn">
                <div className="col-md-12">
                    <BackwardButton/>
                    <div className="card card-accent-success">
                        <div className="card-header">
                            <strong>Basic Form</strong> Elements
                        </div>
                        <div className="card-block">
                            <table className="table table-striped">
                                <tbody>
                                <tr>
                                    <td>id</td>
                                    <td>{resultJson.id}</td>
                                </tr>
                                <tr>
                                    <td>taskId</td>
                                    <td>{resultJson.taskId}</td>
                                </tr>
                                <tr>
                                    <td>uniqueId</td>
                                    <td>{resultJson.uniqueId}</td>
                                </tr>
                                <tr>
                                    <td>status</td>
                                    <td>{resultJson.status}</td>
                                </tr>
                                <tr>
                                    <td>createTime</td>
                                    <td>{resultJson.createTime}</td>
                                </tr>
                                <tr>
                                    <td>finishTime</td>
                                    <td>{resultJson.finishTime}</td>
                                </tr>
                                <tr>
                                    <td>modifiedTime</td>
                                    <td>{resultJson.modifiedTime}</td>
                                </tr>
                                <tr>
                                    <td>content</td>
                                    <td>{resultJson.content}</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowProcessed;
