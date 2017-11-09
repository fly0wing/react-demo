import React, {Component} from "react";
import {isNotNull, isNull} from "../../../common/Common";
import SelectCompPair from "../../Components/common/SelectCompPair";
import TextInputPair from "../../Components/common/TextInputPair";
import TextInput from "../../Components/common/TextInput";
import SelectComp from "../../Components/common/SelectComp";
import SelectOption from "../../Components/common/SelectOption";
import TextInputPairGroup from "../../Components/common/TextInputPairGroup";
import {SELECT} from "../../../common/FetchWrapper";
import {DATASOURCE_URL} from "../../../common/UrlCommon";


class CommonFormTask extends Component {

    constructor(props) {
        super(props);
        this.loadDbList = this.loadDbList.bind(this);

        this.state = {
            dbList: []
        };
    }

    componentWillMount() {
        this.loadDbList();
    }

    loadDbList(e) {
        if (e)
            e.preventDefault();

        let self = this;

        SELECT(DATASOURCE_URL,
            (json) => {
                self.setState({
                    dbList: json
                });
            }
        )
        ;
    }


    render() {
        const props = this.props;
        const {updateJson} = props;
        if (isNull(updateJson)) {
            return null;
        }
        let isEdit;
        if (isNotNull(updateJson.id)) {
            isEdit = true;
        }

        // const {
        //     aggsPair, conditionsPair, dataMediaSourceIdPair, fromPair, schemaNamePair,
        //     tableNamePair, compareColumnPairs, relationColumnPairs
        // } = updateJson;
        const aggsPair = updateJson.aggsPair || {};
        const conditionsPair = updateJson.conditionsPair || {};
        const dataMediaSourceIdPair = updateJson.dataMediaSourceIdPair || {};
        const fromPair = updateJson.fromPair || {};
        const schemaNamePair = updateJson.schemaNamePair || {};
        const tableNamePair = updateJson.tableNamePair || {};
        const compareColumnPairs = updateJson.compareColumnPairs || [];
        const relationColumnPairs = updateJson.relationColumnPairs || [];
        const {dbList} = this.state;

        return (
            <form id="form-horizontal" action="" method="post" className="form-horizontal">
                {isEdit
                    ? <TextInput id="id" value={updateJson.id} disabled={true}/>
                    : null
                }
                <TextInput id="taskName" value={updateJson.taskName} disabled={isEdit} onChange={props.onChange}/>
                <SelectComp id="directionMode" onChange={props.onChange}
                            value={updateJson.directionMode}>
                    <SelectOption key="0" value="none" showName="Please select"/>
                    <SelectOption key="1" value="ONE_WAY" showName="单向同步"/>
                    <SelectOption key="2" value="TWO_WAY" showName="双向同步"/>
                </SelectComp>


                <SelectCompPair id="dataMediaSourceIdPair" showName="数据库"
                                leftValue={dataMediaSourceIdPair.left}
                                rightValue={dataMediaSourceIdPair.right} onChange={props.onChange}>
                    <SelectOption key={-1} value={-1} showName="Please select"/>
                    {dbList.map((db, idx) =>
                        <SelectOption key={idx} value={db.id} showName={db.name + " [" + db.type + "]"}/>
                    )}
                </SelectCompPair>

                <TextInputPairGroup id="relationColumnPairs" showName="关联字段"
                                    items={relationColumnPairs} onChange={props.onChange}/>

                <TextInputPairGroup id="compareColumnPairs" showName="select ..."
                                    items={compareColumnPairs} onChange={props.onChange}/>

                <TextInputPair id="schemaNamePair" showName="from schema"
                               leftValue={schemaNamePair.left} rightValue={schemaNamePair.right}
                               onChange={props.onChange}/>

                <TextInputPair id="tableNamePair" showName="from table"
                               leftValue={tableNamePair.left} rightValue={tableNamePair.right}
                               onChange={props.onChange}/>

                <TextInputPair id="fromPair" showName="join"
                               leftValue={fromPair.left} rightValue={fromPair.right}
                               onChange={props.onChange}/>

                <TextInputPair id="conditionsPair" showName="where"
                               leftValue={conditionsPair.left} rightValue={conditionsPair.right}
                               onChange={props.onChange}/>

                <TextInputPair id="aggsPair" showName="group by"
                               leftValue={aggsPair.left} rightValue={aggsPair.right}
                               onChange={props.onChange}/>

            </form>
        );
    }
}

export default CommonFormTask;
