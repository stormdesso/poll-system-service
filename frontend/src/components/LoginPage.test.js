import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage'; 

describe('LoginPage component', () => {
  it('should render login page correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByLabelText('Логин:')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
  });

  it('should display error messages for invalid login', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText('Логин:'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(screen.getByText('Заполнены не все обязательные поля')).toBeInTheDocument();
    });
  });

  it('should display error message for invalid credentials', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText('Логин:'), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'invalidpassword' } });

    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Неверные логин или пароль' }),
    });

    await waitFor(() => {
      expect(screen.getByText('Неверные логин или пароль')).toBeInTheDocument();
    });
  });
});
