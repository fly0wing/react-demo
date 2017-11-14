import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import {dateFormat} from "../../../common/Common";
import {SELECT} from "../../../common/FetchWrapper";
import {getSingleTaskUrl, TASK_PROCESSED_URL} from "../../../common/UrlCommon";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


class ListTask extends Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);

        this.state = {
            resultJson: []
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData(e) {
        if (e)
            e.preventDefault();

        let self = this;

        SELECT(TASK_PROCESSED_URL,
            (json) => {
                self.setState({
                    resultJson: json
                });
            }
        )
        ;
    }

    toggleInfo() {
        this.setState({
            info: !this.state.info
        });
    }

    render() {
        let self = this;
        let resultJson = self.state.resultJson || [];
        return (   <div className="animated fadeIn">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-align-justify"></i> 对账任务列表
                        </div>
                        <div className="card-block">
                            <button type="button" onClick={this.loadData}
                                    className="btn btn-sm btn-primary">
                                <i className="fa icon-reload"></i> 刷新
                            </button>
                        </div>
                        <div className="card-block">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>任务ID</th>
                                    <th>状态</th>
                                    <th>创建时间</th>
                                    <th>执行时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {resultJson.map(
                                    (processed) => <TaskItem key={processed.id} processed={processed}/>
                                )}
                                </tbody>
                            </table>
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </div>

                        {/* 弹出 */}
                        <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                               className={'modal-info ' + this.props.className + "1"}>
                            <ModalHeader toggle={this.toggleInfo}>msg:</ModalHeader>
                            <ModalBody>
                                {self.state.msg}
                            </ModalBody>
                            <ModalFooter>
                                {/*<Button color="primary" onClick={this.toggleInfo}>Do Something</Button>{' '}*/}
                                <Button color="secondary" onClick={this.toggleInfo}>ok</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

// =============== item ====================
class TaskItem extends Component {

    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.state = {
            taskVo: {}
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        let self = this;
        SELECT(getSingleTaskUrl(this.props.processed.taskId),
            (json) => {
                self.setState({
                    taskVo: json
                });
            }
        )
    }

    render() {
        const self = this;
        const processed = self.props.processed;
        const taskVo = self.state.taskVo;

        return (  <tr key={processed.id}>
                <td>{processed.id}[{processed.uniqueId}]</td>
                <td>
                    <Link className="btn btn-sm btn-outline-success" to={"/task/" + processed.taskId}>
                        {taskVo.taskName}</Link>
                </td>
                <td>
                    <span className="badge badge-success">{processed.status}</span>
                </td>
                <td>{dateFormat(processed.createTime)}</td>
                <td>{processed.finishTime ? dateFormat(processed.finishTime) : "未开始"}</td>
                <td>
                    <Link className="btn btn-sm btn-outline-primary" to={"/show/" + processed.id}>
                        <i className="fa icon-pencil"></i>show</Link>
                </td>
            </tr>
        )
    }
}
export default ListTask;
