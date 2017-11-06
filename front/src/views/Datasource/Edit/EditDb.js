import React, {Component} from "react";
import "whatwg-fetch";
import moment from "moment";


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
        console.log("edit db ");
        super(props);
        this.updateShow = this.updateShow.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.backward = this.backward.bind(this);
        this.commit = this.commit.bind(this);

        this.state = {
            password: null,
            email: null,
            resultJson: null,
            updateJson: this.defaultUpdateJson
        };
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

    commit() {

        let params = this.props.match.params;
        let id = params.id;
        fetch('http://127.0.0.1:9150/datasource/' + id, {
            // credentials: 'include',
            method: 'PUT',
            // @see https://segmentfault.com/a/1190000009637016
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.updateJson)
        }).then(
            function (res) {
                if (res.ok) {
                    console.warn("update success");
                } else {
                    console.warn(res);
                }
            }
        )
        ;
    }

    updateShow(e) {
        let self = this;
        let params = this.props.match.params;
        let id = params.id;

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
                console.info(json);

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
            urls += (db.url + "\n");
        });
        return urls;
    }

    // componentWillReceiveProps(nextProps) {
    //     debugger
    //
    //     if (nextProps.editId > 0) {
    //         this.updateShow(nextProps.editId);
    //     }
    // }

    componentWillMount() {
        let params = this.props.match.params;
        this.updateShow(params.id);
        // console.log(params);
    }

    backward(e) {
        if (e) {
            e.preventDefault();
        }
        this.props.history.goBack();
    }

    render() {
        let params = this.props.match.params;
        console.log(params);
        if (this.isNull(params.id) || params.id < 0) {
            return null;
        }


        let self = this;
        let updateJson = this.state.updateJson;

        let tablesStr = this.showTables(updateJson.tables);
        let dbsStr = this.showDbs2(updateJson.dbDataMediaSources);

        let modifiedTime = moment(updateJson.modifiedTime).format("YYYY-MM-DD HH:mm:ss.SSS");
        let createTime = moment(updateJson.createTime).format("YYYY-MM-DD HH:mm:ss.SSS");

        return (

            <div className="animated fadeIn">

                <button type="reset" onClick={this.backward} className="btn btn-sm btn-success"><i
                    className=" fa fa-chevron-left fa-lg "></i> 后退
                </button>
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
                                        <textarea disabled={true} id="db-tables" name="db-tables" rows="9"
                                                  className="form-control"
                                                  placeholder="Content.."
                                                  value={tablesStr} onChange={this.onTextChange}></textarea>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="db-dbDataMediaSources">dbDataMediaSources</label>
                                    <div className="col-md-9">
                                        <textarea contentEditable={false} id="db-dbDataMediaSources"
                                                  name="db-dbDataMediaSources" rows="9"
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
                                               value={createTime} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label"
                                           htmlFor="db-modifiedTime">modifiedTime</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" id="db-modifiedTime"
                                               name="db-modifiedTime"
                                               value={modifiedTime} onChange={this.onTextChange}/>
                                        <span className="help-block"></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onClick={this.commit} className="btn btn-sm btn-primary"><i
                                className="fa fa-dot-circle-o"></i> Submit
                            </button>
                            <button type="reset" onClick={this.updateShow} className="btn btn-sm btn-danger"><i
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
