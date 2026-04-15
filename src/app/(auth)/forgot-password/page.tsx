import Image from 'next/image';
import { ForgotPasswordForm } from '@/domains/auth/components/molecules/forgot-password-form';
import { authMessages } from '@/domains/auth/messages';
import '@/styles/domains/auth/login-form.css';

export default function ForgotPasswordPage() {
  return (
    <main className="login-page">
      <div className="login-page__card">
        <div className="login-page__brand">
          <Image
            src="/sphere-logo.png"
            alt="Sphere"
            width={44}
            height={44}
            className="login-page__logo-img"
            priority
          />
          <span className="login-page__brand-name">Sphere</span>
        </div>

        <div className="login-page__header">
          <h1 className="login-page__title">
            {authMessages.forgotPassword.title}
          </h1>
          <p className="login-page__subtitle">
            {authMessages.forgotPassword.subtitle}
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}
