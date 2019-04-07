import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParse } from '../Parse';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>'PAssword forget'</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => this.setState({ ...INITIAL_STATE }))
      .catch(error => this.setState({ error }));
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email"
        />
        <button type="submit">Reset</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withParse(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
