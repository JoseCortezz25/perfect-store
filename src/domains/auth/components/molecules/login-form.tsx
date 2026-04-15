'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { loginAction } from '../../actions';
import { authMessages } from '../../messages';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn btn--primary login-form__submit">
      {pending
        ? authMessages.login.submittingButton
        : authMessages.login.submitButton}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="login-form">
      <div className="login-form__field">
        <label htmlFor="username" className="login-form__label">
          {authMessages.login.usernameLabel}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder={authMessages.login.usernamePlaceholder}
          className="login-form__input"
        />
      </div>

      <div className="login-form__field">
        <label htmlFor="password" className="login-form__label">
          {authMessages.login.passwordLabel}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={authMessages.login.passwordPlaceholder}
          className="login-form__input"
        />
        <Link href="/forgot-password" className="auth-link auth-link--right">
          {authMessages.login.forgotPassword}
        </Link>
      </div>

      {state?.error && (
        <p className="login-form__error" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
