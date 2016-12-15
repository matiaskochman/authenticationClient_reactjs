import _ from 'lodash';
import React, { Component,PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinAction } from '../../actions/index'
import { Link } from 'react-router';


const FIELDS = {
  email:{
    type:'input',
    label:'email'
  }
}

class SignIn extends Component{

  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit({email,password}){
    console.log('email:',email + ' password:',password);
  }

  renderField({ input, label, type, meta: { touched, error } }){
    //const fieldHelper = this.props.fields[field];

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



  render(){
    //const { handleSubmit, touched, valid } = this.props;
    const { handleSubmit, touched} = this.props;

    return(


      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={this.renderField} label="Email" />
        <Field name="password" component={this.renderField} label="Password" />
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
  /*
  _.each(FIELDS,(type,field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`
    }
  });
  */
  /*
  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }
  */
  return errors;
}
const ComponentWithForm = reduxForm({
  form: 'SignInForm',
  validate
})(SignIn);

export default connect(null,{ signinAction })(ComponentWithForm);
