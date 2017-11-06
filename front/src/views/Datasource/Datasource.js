import React, {Component} from "react";
import "whatwg-fetch";
import ListDb from "./List/ListDb";
import EditDb from "./Edit/EditDb";


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
        this.onlick1 = this.onlick1.bind(this);

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

    onlick1(id,e){
        e.preventDefault();
        this.setState({
            editId: id
        });

        console.log(id);
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

        // var editTab;
        // if(self.isNotNull(self.state.editId)){
        // editTab = ;
        // }
        return (
            <div className="animated fadeIn">
                <div className="card-columns cols-2">
                    {this.props.children}
                    {/*<ListDb onclick1={self.onlick1}/>*/}
                    {/*<EditDb editId={self.isNotNull(self.state.editId) ? self.state.editId : -1}/>*/}
                </div>
            </div>
        );
    }
}

export default Datasource;
