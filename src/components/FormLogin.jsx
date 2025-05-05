import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authThunks';
import { useNavigate, Link } from 'react-router-dom';

const FormLogin = () => {
  const [value, setValue] = useState({
    email: '',
    password: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue(prev => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.email.trim() || !value.password.trim()) {
      alert('Email та пароль обов\'язкові');
      return;
    }
    
    try {
      await dispatch(login({
        email: value.email,
        password: value.password
      })).unwrap();
      
      navigate('/');
    } catch (err) {
      console.error('Помилка входу:', err);
    }
  };

  return (
    <div className='container'>
      <h1>ВХІД</h1>
      {error && <div className="error-message">{error}</div>}
      <form
        onSubmit={handleSubmit} 
        className='form'>
        <input 
          type="email" 
          placeholder='Email'
          name='email'
          value={value.email} 
          onChange={handleChange}
          required/>
        <input 
          type="password" 
          placeholder='Пароль'
          name='password'
          value={value.password} 
          onChange={handleChange}
          required/>
        <button type='submit' disabled={loading}>
          {loading ? 'Завантаження...' : 'Увійти'}
        </button>
        <div className="form__footer">
          <span>Немає облікового запису?</span>
          <Link to="/register">Зареєструватися</Link>
        </div>
      </form>
    </div>
  )
}

export default FormLogin;