import React, {Component} from "react";


class SimpleInput extends Component {
    /**
     * id：组件的id
     * name：input域的name值
     * disabled：是否禁用
     * value：表单值，编辑用。
     * onChange：变更函数
     * <TextInput id="" name="" value="" disabled="" onChange=""/>
     * @returns {XML}
     */
    render() {
        let props = this.props;
        let name = props.name ? props.name : props.id;
        return (
            <input disabled={props.disabled} type="text" className="form-control" id={props.id}
                   name={name}
                   value={props.value} onChange={(e) => props.onChange(name, e.target.value)}/>
        )
    }
}

export default SimpleInput;
