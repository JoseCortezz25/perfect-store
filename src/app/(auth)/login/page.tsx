import { LoginForm } from '@/domains/auth/components/molecules/login-form';
import { authMessages } from '@/domains/auth/messages';
import '@/styles/domains/auth/login-form.css';

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-page__card">
        <div className="login-page__brand">
          <span className="login-page__logo">◎</span>
          <span className="login-page__brand-name">Sphere</span>
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
