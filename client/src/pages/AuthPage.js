import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log('Error', error);
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log('Data: ', data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>Reduce Link</h1>
          <div className="card grey darken-3">
            <div className="card-content white-text">
              <span className="card-title">Authorization</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Enter e-mail"
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="e-mail">Email</label>
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter password"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Password</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                onClick={loginHandler}
                disabled={loading}
              >
                Log in
              </button>
              <button
                className="btn grey lighten-1"
                onClick={registerHandler}
                disabled={loading}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
