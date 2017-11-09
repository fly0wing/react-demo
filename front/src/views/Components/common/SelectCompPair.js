import React, {Component} from "react";


/**
 * 和 SelectOption.js配合使用
 */
class SelectCompPair extends Component {

    constructor(props) {
        super(props);
        this.onItemChange = this.onItemChange.bind(this);
    }

    /**
     * id：组件的id
     * name：input域的name值
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     *
     * @returns {XML}
     */

    onItemChange(left, right) {
        let name = this.props.name ? this.props.name : this.props.id;
        this.props.onChange(name, {left: left, right: right});
    }

    render() {
        let self = this;
        let props = self.props;

        let name = props.name ? props.name : props.id;
        let showName = props.showName ? props.showName : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-4">
                    <select id={props.id} name={name} className="form-control"
                            value={props.leftValue} onChange={(e) => self.onItemChange(e.target.value, props.rightValue)}
                            disabled={props.disabled}
                    >
                        {props.children}
                    </select>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
                <div className="col-md-5">
                    <select id={props.id} name={name} className="form-control"
                            value={props.rightValue} onChange={(e) => self.onItemChange(props.leftValue, e.target.value)}
                            disabled={props.disabled}
                    >
                        {props.children}
                    </select>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
            </div>
        )
    }
}

export default SelectCompPair;
