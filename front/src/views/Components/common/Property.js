import React, {Component} from "react";
import SimpleInput from "./SimpleInput";


class Property extends Component {

    constructor(props) {
        super(props);
        this.onAddBtn = this.onAddBtn.bind(this);
        this.onDelBtn = this.onDelBtn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callParentTextChange = this.callParentTextChange.bind(this);
        this.initItems();
    }

    onAddBtn(e) {
        e.preventDefault();
        console.log("add..");
        let items = this.state.items;
        items.push({key: "", value: ""});
        this.setState({items: items});
    }

    onDelBtn(id) {
        console.log("del.." + id);
        let items = this.state.items;
        items.splice(id, 1);
        this.setState({items: items});
        this.callParentTextChange();
    }

    onChange(id, item) {
        let items = this.state.items;
        items[id] = item;
        this.setState({items: items});
        this.callParentTextChange();
    }

    callParentTextChange() {
        let name = this.props.name ? this.props.name : this.props.id;
        let obj = {};
        this.state.items.forEach(i => {
            obj[i.key] = i.value;
        });
        this.props.onChange(name, obj);
    }
    initItems() {
        let itemObj = this.props.value;
        let items = [];
        for(let i in itemObj) {
            items.push({key: i, value: itemObj[i]})
        }
        this.state = {
            items: items || [],
        };
    }

    /**
     * id：组件的id
     * name：input域的name值
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     * @returns {XML}
     */
    render() {
        let props = this.props;
        let showName = props.showName ? props.showName : props.id;
        let items = this.state.items;
        let trItems = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            trItems.push(
                <PropertyItem key={i} id={i} keyVal={item.key} valueVal={item.value} disabled={false}
                              onDelBtn={this.onDelBtn} onChange={this.onChange}/>
            );
        }


        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-9 card-block">
                    <table className="table table-bordered table-striped table-sm">
                        <thead>
                        <tr>
                            <th>key</th>
                            <th>value</th>
                            <th>
                                <button type="button" onClick={this.onAddBtn} className="btn btn-primary btn-sm">
                                    <i className="fa fa-plus"/>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {trItems}
                        </tbody>
                    </table>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
            </div>
        )
    }
}

class PropertyItem extends Component {
    constructor(props) {
        super(props);
        this.onItemChange = this.onItemChange.bind(this);
    }

    onItemChange(key, value) {
        this.props.onChange(this.props.id, {key: key, value: value});
    }

    render() {
        let props = this.props;
        return (
            <tr id={props.id}>
                <td>
                    <SimpleInput id={"key_" + props.id} value={props.keyVal}
                                 disabled={props.disabled}
                                 onChange={ (name, value) => this.onItemChange(value, props.valueVal)}/>
                </td>
                <td>
                    <SimpleInput id={"val_" + props.id} value={props.valueVal}
                                 disabled={props.disabled}
                                 onChange={ (name, value) => this.onItemChange(props.keyVal, value)}/>
                </td>
                <td>
                    <button type="button" onClick={() => props.onDelBtn(props.id)} className="btn btn-primary btn-sm">
                        <i className="fa fa-minus"/>
                    </button>
                </td>
            </tr>)
    }
}


export default Property;
