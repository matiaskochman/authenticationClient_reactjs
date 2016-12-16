import _ from 'lodash';
import React, { Component,PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';


const FIELDS = {
  email:{
    type:'input',
    label:'email'
  },
  password:{
    type:'input',
    label:'password'
  }
}

class SignIn extends Component{

  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit({email,password}){
    console.log('email:',email + ' password:',password);

    this.props.signInUser({email:email, password:password});
  }

  renderField({ input, label, type, meta: { touched, error } }){

    return(
      <div className={`form-group ${error && touched && 'has-danger'}`}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control"  />
        <div className="form-control-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }


  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  render(){
    const { handleSubmit, touched} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={this.renderField} label="Email" />
        <Field name="password" component={this.renderField} type="password" label="Password" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">SignIn</button>
      </form>

    );
  }
}

function validate(values) {
  const errors = {};
  _.each(FIELDS,(type,field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`
    }
  });
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}
const ComponentWithForm = reduxForm({
  form: 'SignInForm',
  validate
})(SignIn);

export default connect(mapStateToProps,actions)(ComponentWithForm);
