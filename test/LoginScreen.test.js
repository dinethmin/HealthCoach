import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../app/login';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';


jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('should handle login successfully', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

    const { getByPlaceholderText, getByText } = render(<LoginScreen type="login" />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        FIREBASE_AUTH,
        'test@example.com',
        'password123'
      );
    });
  });

  it('should show error on failed login', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Sign in failed'));

    const { getByPlaceholderText, getByText } = render(<LoginScreen type="login" />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(getByText('Sign in failed:')).toBeTruthy();
    });
  });

  it('should handle signup successfully', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

    const { getByPlaceholderText, getByText } = render(<LoginScreen type="signup" />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Phone'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Birthday (DD/MM/YYYY)'), '01/01/2000');
    fireEvent.changeText(getByPlaceholderText('Gender (Male, Female)'), 'Male');
    fireEvent.changeText(getByPlaceholderText('City'), 'New York');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    
    fireEvent.press(getByText('Create account'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        FIREBASE_AUTH,
        'john@example.com',
        'password123'
      );
    });
  });

  it('should show error on failed signup', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Sign up failed'));

    const { getByPlaceholderText, getByText } = render(<LoginScreen type="signup" />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'short');

    fireEvent.press(getByText('Create account'));

    await waitFor(() => {
      expect(getByText('Sign up failed:')).toBeTruthy();
    });
  });
});
