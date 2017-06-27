//XXX didn't have time to finish, needed to move on

import React from 'react';
import { logIn } from '../../services/api';
console.log(logIn);
class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      username: '',
      password: '',
    };
    this.logInUser = this.logInUser.bind(this);
    this.setLoginData = this.setLoginData.bind(this);
  }

  logInUser(e) {
    e.preventDefault();
    this.setState({ msg: '' });
    logIn('api', this.state.username, this.state.password).then(response => {
      if ( response.body.username ) {
        this.setState({ msg: `${response.body.username} is now logged in` });
      }
      else {
        this.setState({ msg: 'something went wrong, please try again' });
      }
    });
  }

  setLoginData(e) {
    return this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    console.log(this.state.msg);
    return (<form onSubmit={this.logInUser}>
      <input type="text" name="username" placeholder="username"
             onChange={this.setLoginData}/>
      <input type="password" name="password" placeholder="password"
             onChange={this.setLoginData}/>
      <button>submit</button>
      <span>{this.state.msg}</span>
    </form>);
  }
};

export default LoginForm;