import React, {Component} from "react";
import SimpleInput from "../../Components/common/SimpleInput";


class TextInputPair extends Component {

    constructor(props) {
        super(props);
        this.onItemChange = this.onItemChange.bind(this);
    }



    onItemChange(left, right) {
        this.props.onChange(this.props.id, {left: left, right: right});
    }

    /**
     * id：组件的id
     * name：input域的name值
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     * <TextInputPair id="" name="" showName="" leftValue="" rightValue="" disabled="" onChange="" warningMsg=""/>
     * @returns {XML}
     */
    render() {
        let props = this.props;
        let showName = props.showName ? props.showName : props.id;
        const name = props.name ? props.name : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label"
                       htmlFor={props.id}>{showName}</label>
                <div className="col-md-4">
                    <SimpleInput id={"L_" + props.id} name={"L_" + name} value={props.leftValue}
                                 disabled={props.disabled} onChange={(name, value) => this.onItemChange(value, props.rightValue)}/>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
                <div className="col-md-5">
                    <SimpleInput id={"R_" + props.id} name={"R_" + name} value={props.rightValue}
                                 disabled={props.disabled} onChange={ (name, value) => this.onItemChange(props.leftValue, value)}/>
                    <span className="help-block">{props.warningMsg}</span>
                </div>
            </div>
        );
    }
}

export default TextInputPair;
