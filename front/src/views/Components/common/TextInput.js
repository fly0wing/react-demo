import React, {Component} from "react";
import SimpleInput from "./SimpleInput";


class TextInput extends Component {

    /**
     * id：组件的id
     * name：input域的name值
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     * <TextInput id="" name="" showName="" value="" disabled="" onChange="" warningMsg=""/>
     * @returns {XML}
     */
    render() {
        let props = this.props;
        let showName = props.showName ? props.showName : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-9">
                    <SimpleInput id={props.id} name={props.name} showName="" value={props.value}
                                 disabled={props.disabled} onChange={ props.onChange}/>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
            </div>
        );
    }
}

export default TextInput;
