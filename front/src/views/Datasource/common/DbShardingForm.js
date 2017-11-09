import React, {Component} from "react";
import {isNull} from "../../../common/Common";
import TextDiv from "../../Components/common/TextDiv";


class DbShardingForm extends Component {

    showTables(tableObj) {
        if (isNull(tableObj)) {
            return "";
        }

        var tableStr = [];
        let tables = Object.values(tableObj);
        tables.forEach((table) => {
            tableStr.push(table.tableName + "-" + table.splitColumn + "-");
            tableStr.push(<br key={table.tableName}/>);
        });
        return tableStr;
    }

    showDbs(dbObj) {
        if (isNull(dbObj)) {
            return "";
        }

        var urls = [];
        let dbs = Object.values(dbObj);
        dbs.forEach(db => {
            urls.push(db.url);
            urls.push(<br key={db.name}/>);
        });
        return urls;
    }

    render() {
        let updateJson = this.props.updateJson;
        let tablesStr = this.showTables(updateJson.tables);
        let dbsStr = this.showDbs(updateJson.dbDataMediaSources);

        return (
            <div>
                <TextDiv id="dbDataMediaSources" value={dbsStr}/>
                <TextDiv id="tables" value={tablesStr}/>
            </div>
        )
    }
}

export default DbShardingForm;
