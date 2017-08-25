import React, { Component } from 'react';
import 'whatwg-fetch'




class Datasource extends Component {


    constructor(props) {
        super(props);
        this.commitDb = this.commitDb.bind(this);
        this.state = {
            password: null,
            email:null
        };
    }

    commitDb(e) {
        e.preventDefault();
        var form = document.querySelector('#form-horizontal');
        var formdata= new FormData(form);
        var email=formdata.get("hf-email");
        var password=formdata.get("hf-password");
        this.setState({
            password: password,
            email: email,
        });



        fetch('http://127.0.0.1:8888/a', {
            // credentials: 'include',
            method: 'POST',
            // @see https://segmentfault.com/a/1190000009637016
            // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({
                "email":email,
                "password":password
            })
        })
    }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card-columns cols-2">
          <div className="card">
            <div className="card-header">
              <strong>Horizontal</strong> Form
            </div>
            <div className="card-block">
              <form id="form-horizontal" action="" method="post" className="form-horizontal">
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="hf-email">Email</label>
                  <div className="col-md-9">
                    <input type="email" id="hf-email" name="hf-email" className="form-control" placeholder="Enter Email.."/>
                    <span className="help-block">Please enter your email{this.state.email}</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="hf-password">Password</label>
                  <div className="col-md-9">
                    <input type="password" id="hf-password" name="hf-password" className="form-control" placeholder="Enter Password.."/>
                    <span className="help-block">Please enter your password{this.state.password}</span>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button type="submit" onClick={this.commitDb} className="btn btn-sm btn-primary"><i className="fa fa-dot-circle-o"></i> Submit</button>
              <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Reset</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Datasource;
