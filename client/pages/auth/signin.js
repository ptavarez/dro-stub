import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const BLANK_FORM_STATE = {
  email: '',
  password: '',
};

const SignUp = () => {
  const [state, setState] = useState(BLANK_FORM_STATE);

  const { errorNode, doRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: state,
    onSuccess: () => Router.push('/'),
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest().then((res) => {
      setState(BLANK_FORM_STATE);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className='form-group'>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={state.email}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          className='form-control'
        />
      </div>
      {errorNode}
      <button className='btn btn-primary'>Sign In</button>
    </form>
  );
};

export default SignUp;
