import React, {Component} from "react";
import SimpleInput from "../../Components/common/SimpleInput";


class TextInputPairGroup extends Component {

    constructor(props) {
        super(props);
        this.onAddBtn = this.onAddBtn.bind(this);
        this.onDelBtn = this.onDelBtn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callParentTextChange = this.callParentTextChange.bind(this);

        this.state = {
            items: this.props.items
        };
    }


    onAddBtn(e) {
        e.preventDefault();
        let items = this.state.items;
        items.push({left: "", right: ""});
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
        // let obj = {};
        // this.state.items.forEach(i => {
        //     obj[i.key] = i.value;
        // });
        this.props.onChange(name, this.state.items);
    }

    /**
     * id：组件的id
     * name：input域的name值
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     * <TextInputPairGroup id="" name="" showName="" value="" disabled="" onChange="" warningMsg=""/>
     * @returns {XML}
     */
    render() {
        const self = this;
        const {props, state} = self;
        const {items} = state;
        let showName = props.showName ? props.showName : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-9">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>left</th>
                            <th>right</th>
                            <th>
                                <button type="button" onClick={this.onAddBtn} className="btn btn-primary btn-sm">
                                    <i className="fa fa-plus"/>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {(items || []).map((item, idx) =>
                            <Item key={idx} id={idx} leftVal={item.left} rightVal={item.right} disabled={false}
                                  onDelBtn={self.onDelBtn} onChange={self.onChange}/>
                        )}
                        </tbody>
                    </table>
                    <span className="help-block">{props.warningMsg}</span>

                </div>
            </div>
        );
    }
}


class Item extends Component {
    constructor(props) {
        super(props);
        this.onItemChange = this.onItemChange.bind(this);
    }

    onItemChange(key, value) {
        this.props.onChange(this.props.id, {left: key, right: value});
    }

    render() {
        let props = this.props;
        return (
            <tr id={props.id}>
                <td>
                    <SimpleInput id={"L_" + props.id} value={props.leftVal}
                                 disabled={props.disabled}
                                 onChange={ (name, value) => this.onItemChange(value, props.rightVal)}/>

                </td>
                <td>
                    <SimpleInput id={"R_" + props.id} value={props.rightVal}
                                 disabled={props.disabled}
                                 onChange={ (name, value) => this.onItemChange(props.leftVal, value)}/>
                </td>
                <td>
                    <button type="button" onClick={() => props.onDelBtn(props.id)} className="btn btn-primary btn-sm">
                        <i className="fa fa-minus"/>
                    </button>
                </td>
            </tr>)
    }
}


export default TextInputPairGroup;
