import React, {Component} from "react";
import createBrowserHistory from "history/es/createBrowserHistory";

const history = createBrowserHistory();
class BackwardButton extends Component {
    constructor(props) {
        super(props);
        this.backward = this.backward.bind(this);

    }


    backward(e) {
        if (e) {
            e.preventDefault();
        }
        history.goBack()
    }

    render() {
        return (
            <button type="reset" onClick={this.backward} className="btn btn-sm btn-success"><i
                className=" fa fa-chevron-left fa-lg "></i> 后退
            </button>
        )
    }
}

export default BackwardButton;
