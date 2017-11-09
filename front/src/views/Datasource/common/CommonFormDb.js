import React, {Component} from "react";
import TextInput from "../../Components/common/TextInput";
import SelectOption from "../../Components/common/SelectOption";
import SelectComp from "../../Components/common/SelectComp";
import DatabaseForm from "./DatabaseForm";
import CDSForm from "./CDSForm";
import ESForm from "./ESForm";
import DbShardingForm from "./DbShardingForm";
import {dateFormat, isNotNull} from "../../../common/Common";
import TextDiv from "../../Components/common/TextDiv";


class CommonFormDb extends Component {

    constructor(props) {
        super(props);
        this.onDbTypeChange = this.onDbTypeChange.bind(this);
        this.state = {
            type: null,
        };
    }


    onDbTypeChange(name, val) {
        this.setState(
            {
                type: val
            }
        );
        this.props.onTextChange(name, val);
    }

    render() {
        let props = this.props;
        const {updateJson} = this.props;
        // let updateJson = this.props.updateJson;

        let type = this.state.type || updateJson.type;
        let comp;
        if (type === "MYSQL") {
            comp = <DatabaseForm updateJson={updateJson} onTextChange={props.onTextChange}/>;
        } else if (type === "CDS") {
            comp = <CDSForm updateJson={updateJson} onTextChange={props.onTextChange}/>;
        } else if (type === "ELASTICSEARCH") {
            comp = <ESForm updateJson={updateJson} onTextChange={props.onTextChange}/>;
        } else if (type === "DB_SHARDING") {
            comp = <DbShardingForm updateJson={updateJson} onTextChange={props.onTextChange}/>;
        }

        let isEdit = false;
        if (isNotNull(updateJson.id)) {
            isEdit = true;
        }

        return (
            <form id="form-horizontal" className="form-horizontal">
                <div>
                    {isEdit ? <TextInput id="id" disabled={true}
                                         value={updateJson.id} warningMsg=""/> : ""}

                    <TextInput disabled={isEdit} id="name" onChange={props.onTextChange}
                               value={updateJson.name} warningMsg=""/>

                    <SelectComp id="encode" onChange={props.onTextChange}
                                value={updateJson.encode} warningMsg="">
                        <SelectOption value="none" showName="Please select"/>
                        <SelectOption value="utf8" showName="utf-8"/>
                    </SelectComp>

                    <SelectComp id="type" onChange={this.onDbTypeChange}
                                value={updateJson.type} warningMsg="">
                        <SelectOption value="none" showName="Please select"/>
                        <SelectOption value="MYSQL" showName="单库单表"/>
                        <SelectOption value="CDS" showName="CDS"/>
                        <SelectOption value="ELASTICSEARCH" showName="ELASTICSEARCH"/>
                        <SelectOption value="DB_SHARDING" showName="DB_SHARDING"/>
                    </SelectComp>

                    {comp}

                    {isEdit ? <TextDiv id="modifiedTime"
                                       value={dateFormat(updateJson.modifiedTime)}/> : ""}
                    {isEdit ? <TextDiv id="createTime"
                                       value={dateFormat(updateJson.createTime)}/> : ""}
                </div>
            </form>
        );
    }
}

export default CommonFormDb;
