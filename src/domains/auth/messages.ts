export const authMessages = {
  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to your Sphere account',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot your password?',
    submitButton: 'Sign in',
    submittingButton: 'Signing in...',
    errors: {
      invalidCredentials: 'Invalid username or password',
      serverError: 'Something went wrong. Please try again.'
    }
  },
  forgotPassword: {
    title: 'Forgot password',
    subtitle: "Enter your email and we'll send you a reset link",
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    submitButton: 'Send reset link',
    submittingButton: 'Sending...',
    backToLogin: 'Back to sign in',
    success: {
      title: 'Check your email',
      description: (email: string) =>
        `We sent a password reset link to ${email}. If you don't see it, check your spam folder.`,
      resend: 'Resend email',
      backToLogin: 'Back to sign in'
    },
    errors: {
      emailNotFound: 'No account found with that email address',
      serverError: 'Something went wrong. Please try again.'
    }
  }
} as const;
