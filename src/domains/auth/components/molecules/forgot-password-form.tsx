'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { forgotPasswordAction } from '../../actions';
import { authMessages } from '../../messages';

const msgs = authMessages.forgotPassword;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="login-form__submit">
      {pending ? msgs.submittingButton : msgs.submitButton}
    </button>
  );
}

function SuccessState({ email }: { email: string }) {
  return (
    <div className="forgot-password__success">
      <div className="forgot-password__success-icon">
        <Mail size={28} strokeWidth={1.5} />
      </div>
      <h2 className="forgot-password__success-title">{msgs.success.title}</h2>
      <p className="forgot-password__success-description">
        {msgs.success.description(email)}
      </p>
      <Link href="/login" className="auth-link auth-link--block">
        {msgs.success.backToLogin}
      </Link>
    </div>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPasswordAction, null);

  if (state?.success && state.email) {
    return <SuccessState email={state.email} />;
  }

  return (
    <form action={formAction} className="login-form">
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
          {msgs.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={msgs.emailPlaceholder}
          className="login-form__input"
        />
      </div>

      {state?.error && (
        <p className="login-form__error" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />

      <Link href="/login" className="auth-link auth-link--centered">
        {msgs.backToLogin}
      </Link>
    </form>
  );
}
