import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import {dateFormat} from "../../../common/Common";
import {CREATE, SELECT} from "../../../common/FetchWrapper";
import {getSingleDBUrl, getStartTaskUrl, TASK_URL} from "../../../common/UrlCommon";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


class ShowTaskProcessed extends Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.onStart = this.onStart.bind(this);

        this.state = {
            resultJson: null
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData(e) {
        if (e)
            e.preventDefault();

        let self = this;

        SELECT(TASK_URL,
            (json) => {
                self.setState({
                    resultJson: json
                });
            }
        )
        ;
    }

    showDbs(dbObj) {
        if (this.isNull(dbObj)) {
            return "";
        }

        var urls = [];
        let tasks = Object.values(dbObj);
        tasks.forEach(task => {
            urls.push(task.url);
            urls.push(<br key={task.name}/>);
        });
        urls.pop();
        return urls;
    }

    onStart(id) {
        const self = this;
        CREATE(getStartTaskUrl(id)
            , {},
            (succ) => {
                self.setState({
                    msg: "执行成功"
                });
                self.toggleInfo();
            },
            (error) => {
                self.setState({
                    msg: error.msg
                });
                self.toggleInfo();
            }
        );

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
                            <Link className="btn btn-sm btn-success" to={"/task/add"}>
                                <i className="fa fa-dot-circle-o"></i> 新增</Link>
                        </div>
                        <div className="card-block">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>左侧数据库</th>
                                    <th>对账类型</th>
                                    <th>左侧数据库</th>
                                    <th>创建时间</th>
                                    <th>更新时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {resultJson.map(
                                    (task) => <TaskItem key={task.id} task={task} onStart={self.onStart}/>
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
    defaultDatasource = {id: -1, name: ""};

    constructor(props) {
        super(props);

        this.loadDB = this.loadDB.bind(this);
        this.state = {
            leftDatasource: this.defaultDatasource,
            rightDatasource: this.defaultDatasource
        };
    }

    componentWillMount() {
        this.loadDB();
    }

    loadDB() {
        let self = this;
        let dbIdPair = this.props.task.dataMediaSourceIdPair;
        SELECT(getSingleDBUrl(dbIdPair.left),
            (json) => {
                console.info(json);
                self.setState({
                    leftDatasource: json
                });
            }
        );

        SELECT(getSingleDBUrl(dbIdPair.right),
            (json) => {
                console.info(json);
                self.setState({
                    rightDatasource: json
                });
            }
        );
    }


    render() {
        const self = this;
        const task = self.props.task;
        const {leftDatasource: left, rightDatasource: right} = self.state;
        const tableNamePair = task.tableNamePair;

        return (  <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskName}</td>
                <td style={{
                    "wordWrap": "break-word",
                    "tableLayout": "fixed",
                    "wordBreak": "break-all"
                }}>
                    <Link className="btn btn-sm btn-outline-success" to={"/datasource/" + left.id}>
                        {left.name}</Link>
                    <br/>
                    table:{tableNamePair.left}
                </td>
                <td>{task.directionMode === 'ONE_WAY' ? '--->' : "<--->"}[{task.directionMode}]</td>
                <td style={{
                    "wordWrap": "break-word",
                    "tableLayout": "fixed",
                    "wordBreak": "break-all"
                }}>
                    <Link className="btn btn-sm btn-outline-success" to={"/datasource/" + right.id}>
                        {right.name}</Link>
                    <br/>
                    {tableNamePair.right}
                </td>
                <td>{dateFormat(task.createTime)}</td>
                <td>{dateFormat(task.modifiedTime)}</td>
                <td>
                    <Link className="btn btn-sm btn-outline-primary" to={"/task/" + task.id}>
                        <i className="fa icon-pencil"></i>update</Link>
                    &nbsp;
                    <button className="btn btn-sm btn-outline-danger" onClick={() => self.props.onStart(task.id)}>
                        <i className="fa icon-control-play"></i>start
                    </button>
                </td>
            </tr>
        )
    }
}
export default ShowTaskProcessed;
