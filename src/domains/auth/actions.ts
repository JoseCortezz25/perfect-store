'use server';

import { loginSchema } from './login.schema';
import { forgotPasswordSchema } from './forgot-password.schema';
import { authMessages } from './messages';

export type LoginState = {
  error?: string;
  success?: boolean;
} | null;

export type ForgotPasswordState = {
  error?: string;
  success?: boolean;
  email?: string;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const raw = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: authMessages.login.errors.invalidCredentials };
  }

  const { username, password } = parsed.data;

  // TODO: Replace with real auth logic
  if (username === 'admin' && password === 'sphere') {
    return { success: true };
  }

  return { error: authMessages.login.errors.invalidCredentials };
}

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const raw = { email: formData.get('email') };

  const parsed = forgotPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const { email } = parsed.data;

  // TODO: Replace with real email sending logic
  return { success: true, email };
}
