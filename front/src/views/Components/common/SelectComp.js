import React, {Component} from "react";


/**
 * 和 SelectOption.js配合使用
 */
class SelectComp extends Component {

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
    render() {
        let props = this.props;

        let name = props.name ? props.name : props.id;
        let showName = props.showName ? props.showName : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-9">
                    <select id={props.id} name={name} className="form-control"
                            value={props.value} onChange={(e) => props.onChange(name, e.target.value)}
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

export default SelectComp;
