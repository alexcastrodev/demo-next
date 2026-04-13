import { useForm } from '@mantine/form';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { LoginPageFormValues } from '../login-page.schema';
import { LoginForm } from '../login-form';

vi.mock('../login-page.hook', () => ({
  useLoginPage: () => {
    const form = useForm<LoginPageFormValues>({
      initialValues: {
        email: 'user@example.com',
        password: 'secret',
      },
    });

    return {
      error: '',
      form,
      handleSubmit: vi.fn(),
      isLoading: false,
      t: (key: string) =>
        ({
          'auth.email': 'Email',
          'auth.emailPlaceholder': 'email@example.com',
          'auth.password': 'Password',
          'auth.passwordPlaceholder': 'Type your password',
          'auth.submit': 'Enter',
        })[key] ?? key,
    };
  },
}));

describe('LoginForm', () => {
  it('renders the login widget', () => {
    render(<LoginForm />, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByDisplayValue('user@example.com')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Enter' })).toBeDefined();
  });
});
