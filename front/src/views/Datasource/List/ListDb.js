import React, {Component} from "react";
import "whatwg-fetch";
import Link from "react-router-dom/es/Link";


class ListDb extends Component {


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
        this.loadData = this.loadData.bind(this);

        this.state = {
            resultJson: null,
            updateJson: this.defaultUpdateJson
        };
    }
    componentWillMount() {
        this.loadData();
    }

    loadData(e) {
        if (e)
            e.preventDefault();

        let self = this;

        fetch('http://127.0.0.1:9150/datasource/', {
            // credentials: 'include',
            method: 'GET',
            // @see https://segmentfault.com/a/1190000009637016
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}

        }).then(
            function (res) {
                if (res.ok) {
                    return res.json();
                } else {
                    console.warn(res);
                }
            }
        ).then(function (json) {
                self.setState({
                    resultJson: json
                });
            }
        )
        ;
    }

    isNotNull(exp) {
        return !this.isNull(exp);
    }

    isNull(exp) {
        return (!exp && typeof(exp) != "undefined" && exp != 0) || typeof(exp) == "undefined";
    }

    showDbs(dbObj) {
        if (this.isNull(dbObj)) {
            return "";
        }

        var urls = [];
        let dbs = Object.values(dbObj);
        dbs.forEach(db => {
            urls.push(db.url);
            urls.push(<br key={db.name}/>);
        });
        urls.pop()
        return urls;
    }


    render() {
        let self = this;
        let resultJson = this.state.resultJson;
        let updateJson = this.state.updateJson;
        var res = [];
        if (this.isNotNull(resultJson)) {
            resultJson.forEach(function (db) {
                var urls = self.showDbs(db.dbDataMediaSources);
                res.push(<tr key={db.id}>
                    <td>{db.id}</td>
                    <td>{db.name}</td>
                    <td>{db.type}</td>
                    <td style={{
                        "wordWrap": "break-word",
                        "tableLayout": "fixed",
                        "wordBreak": "break-all"
                    }}>{db.url}
                        {urls}
                    </td>
                    <td>
                        <span className="badge badge-success">Active</span>
                    </td>
                    <td>
                        <Link className="btn btn-sm btn-primary" to={"/datasource/" + db.id}>
                            <i className="fa fa-dot-circle-o"></i>update</Link>
                    </td>
                </tr>)
            });
        }
        return (   <div className="animated fadeIn">
                <div className="card-columns cols-2">
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-align-justify"></i> 数据库列表
                        </div>
                        <div className="card-block">
                            <button type="button" onClick={this.loadData}
                                    className="btn btn-sm btn-primary">
                                <i className="fa fa-dot-circle-o"></i> 刷新
                            </button>
                        </div>
                        <div className="card-block">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>type</th>
                                    <th>url</th>
                                    <th>Status</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {res}
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
