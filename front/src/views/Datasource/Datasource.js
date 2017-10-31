import React, {Component} from "react";
import "whatwg-fetch";


class Datasource extends Component {


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
        this.commitDb = this.commitDb.bind(this);
        this.loadData = this.loadData.bind(this);
        this.updateShow = this.updateShow.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

        this.state = {
            password: null,
            email: null,
            resultJson: null,
            updateJson: this.defaultUpdateJson
        };
    }

    commitDb(e) {
        e.preventDefault();
        var form = document.querySelector('#form-horizontal');
        var formdata = new FormData(form);
        var email = formdata.get("hf-email");
        var password = formdata.get("hf-password");
        this.setState({
            password: password,
            email: email,
        });


        fetch('http://127.0.0.1:8888/a', {
            // credentials: 'include',
            method: 'POST',
            // @see https://segmentfault.com/a/1190000009637016
            // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

    }

    loadData(e) {
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

    onTextChange(e) {
        e.preventDefault();
        console.info(e);
        console.info(this);
        let target = e.target;
        let id = target.id;
        let name = id.substring("db-".length, id.length);
        console.info(target.value);
        console.info(name);

        let updateJson = this.state.updateJson;
        updateJson[name] = target.value;

        this.setState(
            {
                updateJson: updateJson
            }
        );
    }

    updateShow(id, e) {
        e.preventDefault();
        let self = this;
        console.info(e);
        console.info(id);

        fetch('http://127.0.0.1:9150/datasource/' + id, {
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
                    updateJson: self.defaultUpdateJson
                });
                self.setState({
                    updateJson: json
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

    showTables(tableObj) {
        if (this.isNull(tableObj)) {
            return "";
        }

        var tableStr = "";
        let tables = Object.values(tableObj);
        tables.forEach((table) => {
            tableStr += (table.tableName + "-" + table.splitColumn + "-");
            tableStr += ("\n");
        });
        return tableStr;
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

    showDbs2(dbObj) {
        if (this.isNull(dbObj)) {
            return "";
        }

        var urls = "";
        let dbs = Object.values(dbObj);
        dbs.forEach(db => {
            urls+=(db.url + "\n");
        });
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
                        <button key={db.name} type="submit" onClick={(e) => self.updateShow(db.id, e)}
                                className="btn btn-sm btn-primary"><i
                            className="fa fa-dot-circle-o"></i> update
                        </button>
                    </td>
                </tr>)
            });
        }
        let tablesStr = this.showTables(updateJson.tables);
        let dbsStr = this.showDbs2(updateJson.dbDataMediaSources);


        return (
            <div className="animated fadeIn">
                <div className="card-columns cols-2">
                    <div className="card">
                        <div className="card-header">
                            <strong>Horizontal</strong> Form
                        </div>
                        <div className="card-block">
                            <form id="form-horizontal" action="" method="post" className="form-horizontal">
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-id">id</label>
                                    <div className="col-md-9">
                                        <input disabled={true} type="text" id="db-id" name="db-id"
                                               className="form-control"
                                               value={updateJson.id}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-name">name</label>
                                    <div className="col-md-9">
                                        <input disabled={true} type="text" id="db-name" name="db-name"
                                               className="form-control"
                                               value={updateJson.name}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-type">type</label>
                                    <div className="col-md-9">
                                        <select id="db-type" name="db-type" className="form-control"
                                                value={updateJson.type} onChange={this.onTextChange}>
                                            <option value="none">Please select</option>
                                            <option value="MYSQL">单库单表</option>
                                            <option value="ELASTICSEARCH">ELASTICSEARCH</option>
                                            <option value="DB_SHARDING">分库分表</option>
                                            <option value="CDS">CDS</option>
                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-encode">encode</label>
                                    <div className="col-md-9">
                                        <select id="db-encode" name="db-encode" className="form-control"
                                                value={updateJson.encode} onChange={this.onTextChange}>
                                            <option value="none">Please select</option>
                                            <option value="utf8">utf-8</option>
                                        </select>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-url">url</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-url" name="db-url"
                                               value={updateJson.url} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label"
                                           htmlFor="db-username">username</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-username" name="db-username"
                                               value={updateJson.username} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label"
                                           htmlFor="db-password">password</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-password" name="db-password"
                                               value={updateJson.password} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-driver">driver</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-driver" name="db-driver"
                                               value={updateJson.driver} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label"
                                           htmlFor="db-properties">properties</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-properties"
                                               name="db-properties"
                                               value={updateJson.properties} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-tables">tables</label>
                                    <div className="col-md-9">
                                        <textarea disabled={true} id="db-tables" name="db-tables" rows="9" className="form-control"
                                                  placeholder="Content.."
                                                  value={tablesStr} onChange={this.onTextChange}></textarea>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-dbDataMediaSources">dbDataMediaSources</label>
                                    <div className="col-md-9">
                                        <textarea contentEditable={false} id="db-dbDataMediaSources" name="db-dbDataMediaSources" rows="9"
                                                  className="form-control"
                                                  placeholder="Content.."
                                                  value={dbsStr} onChange={this.onTextChange}></textarea>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label"
                                           htmlFor="db-createTime">createTime</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-createTime"
                                               name="db-createTime"
                                               value={updateJson.createTime} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-modifiedTime">modifiedTime</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-modifiedTime"
                                               name="db-modifiedTime"
                                               value={updateJson.modifiedTime} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={this.commitDb} className="btn btn-sm btn-primary"><i
                                className="fa fa-dot-circle-o"></i> Submit
                            </button>
                            <button type="reset" onClick={this.loadData} className="btn btn-sm btn-danger"><i
                                className="fa fa-ban"></i> Reset
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <i className="fa fa-align-justify"></i> Striped Table
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

export default Datasource;
