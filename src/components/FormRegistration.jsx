import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authThunks';
import { useNavigate, Link } from 'react-router-dom';

const FormRegistration = () => {
  const [value, setValue] = useState({
    name: '',
    password: '',
    email: ''
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
    if (!value.name.trim() || !value.email.trim() || !value.password.trim()) {
      alert('Всі поля обов\'язкові');
      return;
    }
    
    if (value.name.length < 6) {
      alert('Ім\'я повинно містити не менше 6 символів');
      return;
    }
    
    try {
      await dispatch(register({
        name: value.name,
        email: value.email,
        password: value.password
      })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Помилка реєстрації:', err);
    }
  };

  return (
    <div className='container'>
      <h1>РЕЄСТРАЦІЯ</h1>
      {error && <div className="error-message">{error}</div>}
      <form
        onSubmit={handleSubmit} 
        className='form'>
        <input 
          type="text" 
          placeholder='Name'
          name='name'
          value={value.name} 
          onChange={handleChange}
          required/>
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
          {loading ? 'Завантаження...' : 'Зареєструватися'}
        </button>
        <div className="form__footer">
          <span>Вже маєте обліковий запис?</span>
          <Link to="/login">Увійти</Link>
        </div>
      </form>
    </div>
  )
}

export default FormRegistration;