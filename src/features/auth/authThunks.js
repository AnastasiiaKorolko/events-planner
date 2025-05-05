import { createAsyncThunk } from "@reduxjs/toolkit";

const fakeApi = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password
      );
      
      setTimeout(() => {
        if (user) {
          const token = `fake-token-${Math.random().toString(36).substring(2, 15)}`;
          resolve({ user: { name: user.name, email: user.email }, token });
        } else {
          reject({ message: 'Невірний email або пароль' });
        }
      }, 500);
    });
  },
  
  register: (userData) => {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === userData.email);
      
      setTimeout(() => {
        if (existingUser) {
          reject({ message: 'Користувач з таким email вже існує' });
        } else {
          const newUser = { ...userData };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          
          const token = `fake-token-${Math.random().toString(36).substring(2, 15)}`;
          resolve({ user: { name: userData.name, email: userData.email }, token });
        }
      }, 500);
    });
  },
  
  logout: () => {
    return Promise.resolve();
  }
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fakeApi.login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await fakeApi.register(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await fakeApi.logout();
  return;
});