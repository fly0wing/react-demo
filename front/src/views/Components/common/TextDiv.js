import React, {Component} from "react";


class TextDiv extends Component {


    /**
     * id：组件的id
     * showName：label显示的值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * warningMsg：警告信息
     * <TextInput id="" showName="" value="" disabled="" warningMsg=""/>
     * @returns {XML}
     */
    render() {
        let props = this.props;
        let showName = props.showName ? props.showName : props.id;
        return (
            <div className="form-group row">
                <label className="col-md-3 text-right form-control-label">{showName}</label>
                <div className="col-md-9">
                    {/*<p className="form-control-static">*/}
                        {props.value}
                    {/*</p>*/}
                    <span className="help-block">{props.warningMsg}</span>
                </div>
            </div>
        );
    }
}

export default TextDiv;
