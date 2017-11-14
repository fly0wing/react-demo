import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import {DATASOURCE_URL} from "../../../common/UrlCommon";
import {SELECT} from "../../../common/FetchWrapper";
import {isNotNull, isNull} from "../../../common/Common";


class ListDb extends Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);

        this.state = {
            resultJson: null,
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData(e) {
        if (e)
            e.preventDefault();

        let self = this;

        SELECT(DATASOURCE_URL,
            (json) => {
                self.setState({
                    resultJson: json
                });
            })
        ;
    }

    showDbs(dbObj) {
        if (isNull(dbObj)) {
            return "";
        }
        let dbs = [];
        if (isNotNull(dbObj.url)) {
            dbs.push(dbObj)
        }
        if (isNotNull(dbObj.dbDataMediaSources)) {
            dbs = dbs.concat(Object.values(dbObj.dbDataMediaSources));
        }

        const urls = [];
        dbs.forEach(db => {
            urls.push(db.url);
            urls.push(<br key={db.name}/>);
        });
        urls.pop();
        return urls;
    }


    render() {
        let self = this;
        let resultJson = this.state.resultJson || [];
        return (   <div className="animated fadeIn">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-align-justify"></i> 数据库列表
                        </div>
                        <div className="card-block">
                            <button type="button" onClick={this.loadData}
                                    className="btn btn-sm btn-primary">
                                <i className="fa icon-reload"></i> 刷新
                            </button>
                            <Link className="btn btn-sm btn-success" to={"/datasource/add"}>
                                <i className="fa fa-dot-circle-o"></i> 新增</Link>
                        </div>
                        <div className="card-block">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>type</th>
                                    <th>url</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {resultJson.map(
                                    (db) => <tr key={db.id}>
                                        <td>{db.id}</td>
                                        <td>{db.name}</td>
                                        <td>{db.type}</td>
                                        <td style={{
                                            "wordWrap": "break-word",
                                            "tableLayout": "fixed",
                                            "wordBreak": "break-all"
                                        }}>
                                            {self.showDbs(db)}
                                        </td>
                                        <td>
                                            <Link className="btn btn-sm btn-outline-primary" to={"/datasource/" + db.id}>
                                                <i className="fa icon-pencil"></i>update</Link>
                                        </td>
                                    </tr>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default ListDb;
