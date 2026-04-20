import { LoginForm } from '@/domains/auth/components/molecules/login-form';
import { authMessages } from '@/domains/auth/messages';
import '@/styles/domains/auth/login-form.css';

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-page__card">
        <div className="login-page__brand">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="login-page__logo-img"
          >
            <rect width="36" height="36" rx="10" fill="#4361EF" />
            <path
              d="M11 10h8.5c3.038 0 5.5 2.462 5.5 5.5S22.538 21 19.5 21H14v5h-3V10zm3 8h5.5c1.38 0 2.5-1.12 2.5-2.5S20.88 13 19.5 13H14v5z"
              fill="white"
            />
          </svg>
          <span className="login-page__brand-name">Perfect Store</span>
        </div>

        <div className="login-page__header">
          <h1 className="login-page__title">{authMessages.login.title}</h1>
          <p className="login-page__subtitle">{authMessages.login.subtitle}</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
