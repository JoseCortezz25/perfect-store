export const authMessages = {
  profile: {
    pageTitle: 'MI PERFIL',
    pageSubtitle: 'Gestiona tu información y seguridad',

    identity: {
      sectionTitle: 'Información de cuenta',
      emailLabel: 'Email'
    },

    security: {
      sectionTitle: 'Seguridad',
      currentPasswordLabel: 'Contraseña actual',
      currentPasswordPlaceholder: 'Introduce tu contraseña actual',
      newPasswordLabel: 'Nueva contraseña',
      newPasswordPlaceholder: 'Mínimo 8 caracteres',
      confirmPasswordLabel: 'Confirmar contraseña',
      confirmPasswordPlaceholder: 'Repite la nueva contraseña',
      saveButton: 'Guardar contraseña',
      savingButton: 'Guardando…',
      cancelButton: 'Cancelar',
      strengthLabels: {
        weak: 'Débil',
        fair: 'Regular',
        good: 'Buena',
        strong: 'Segura'
      },
      success: 'Contraseña actualizada correctamente',
      errors: {
        currentRequired: 'La contraseña actual es obligatoria',
        newRequired: 'La nueva contraseña es obligatoria',
        newTooShort: 'Mínimo 8 caracteres',
        confirmRequired: 'Confirma la nueva contraseña',
        confirmMismatch: 'Las contraseñas no coinciden',
        currentWrong: 'La contraseña actual no es correcta',
        serverError: 'Error al actualizar la contraseña. Inténtalo de nuevo.'
      }
    }
  },

  login: {
    title: 'Welcome back',
    subtitle: 'Sign in to your Perfect Store account',
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
