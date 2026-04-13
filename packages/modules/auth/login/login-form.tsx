'use client';

import { LoginPageForm } from './_partials/login-page-form';
import { useLoginPage } from './login-page.hook';

export function LoginForm() {
  const {
    error,
    form,
    handleSubmit,
    isLoading,
    t,
  } = useLoginPage();

  return (
    <LoginPageForm
      emailLabel={t('auth.email')}
      emailPlaceholder={t('auth.emailPlaceholder')}
      error={error}
      form={form}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      passwordLabel={t('auth.password')}
      passwordPlaceholder={t('auth.passwordPlaceholder')}
      submitLabel={t('auth.submit')}
    />
  );
}
