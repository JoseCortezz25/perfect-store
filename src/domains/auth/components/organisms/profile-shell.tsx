'use client';

import { useState, useRef, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { RoleBadge } from '@/domains/admin/components/atoms/role-badge';
import { authMessages } from '@/domains/auth/messages';

const msgs = authMessages.profile;

// ─── Password strength ───────────────────────────────────────

type StrengthLevel = 'empty' | 'weak' | 'fair' | 'good' | 'strong';

function computeStrength(password: string): StrengthLevel {
  if (!password) return 'empty';
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 1) return 'weak';
  if (score === 2) return 'fair';
  if (score === 3) return 'good';
  return 'strong';
}

const STRENGTH_FILLED: Record<StrengthLevel, number> = {
  empty: 0,
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
};

const STRENGTH_LABEL: Record<Exclude<StrengthLevel, 'empty'>, string> = {
  weak: msgs.security.strengthLabels.weak,
  fair: msgs.security.strengthLabels.fair,
  good: msgs.security.strengthLabels.good,
  strong: msgs.security.strengthLabels.strong,
};

// ─── Password field ──────────────────────────────────────────

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  showStrength?: boolean;
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  showStrength = false,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const strength = showStrength ? computeStrength(value) : 'empty';
  const filled = STRENGTH_FILLED[strength];

  return (
    <div className="profile-security__field">
      <label htmlFor={id} className="profile-security__label">
        {label}
      </label>

      <div className="profile-security__input-wrap">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          className={`profile-security__input${error ? ' profile-security__input--error' : ''}`}
        />
        <button
          type="button"
          className="profile-security__eye-btn"
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          onClick={() => setIsVisible((v) => !v)}
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>

      {showStrength && strength !== 'empty' && (
        <div className="profile-strength" aria-live="polite">
          <div className="profile-strength__segments" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`profile-strength__segment${i < filled ? ` profile-strength__segment--${strength}` : ''}`}
              />
            ))}
          </div>
          <span className={`profile-strength__label profile-strength__label--${strength}`}>
            {STRENGTH_LABEL[strength]}
          </span>
        </div>
      )}

      {error && (
        <p className="profile-security__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main shell ──────────────────────────────────────────────

export function ProfileShell() {
  const { user } = useCurrentUser();

  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{
    current?: string;
    newPw?: string;
    confirm?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss success banner after 4s
  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  function handleCancel() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setIsSuccess(false);
  }

  function validate() {
    const next: typeof errors = {};
    if (!currentPassword) next.current = msgs.security.errors.currentRequired;
    if (!newPassword) {
      next.newPw = msgs.security.errors.newRequired;
    } else if (newPassword.length < 8) {
      next.newPw = msgs.security.errors.newTooShort;
    }
    if (!confirmPassword) {
      next.confirm = msgs.security.errors.confirmRequired;
    } else if (confirmPassword !== newPassword) {
      next.confirm = msgs.security.errors.confirmMismatch;
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate async password update (replace with real Server Action call)
    await new Promise<void>((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    successTimerRef.current = setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  }

  return (
    <div className="profile-content">
      {/* Page header */}
      <div className="profile-page-header">
        <div className="section-header__accent-line" />
        <div>
          <h1 className="admin-page-header__title">{msgs.pageTitle}</h1>
          <p className="admin-page-header__subtitle">{msgs.pageSubtitle}</p>
        </div>
      </div>

      {/* ── Identidad card ── */}
      <div className="profile-card">
        <div className="profile-card__heading">
          <div className="admin-section__icon-container">
            <User size={18} strokeWidth={1.5} className="admin-section__icon" aria-hidden="true" />
          </div>
          <h2 className="admin-section__title">{msgs.identity.sectionTitle}</h2>
        </div>

        <div className="profile-identity__row">
          <div className="profile-identity__avatar" aria-hidden="true">
            {user.initials}
          </div>
          <div className="profile-identity__info">
            <p className="profile-identity__name">{user.name}</p>
            <p className="profile-identity__email">{user.name.toLowerCase().replace(' ', '.')}@sphere.app</p>
          </div>
          <RoleBadge role={user.role} />
        </div>
      </div>

      {/* ── Seguridad card ── */}
      <div className="profile-card">
        <div className="profile-card__heading">
          <div className="admin-section__icon-container">
            <Lock size={18} strokeWidth={1.5} className="admin-section__icon" aria-hidden="true" />
          </div>
          <h2 className="admin-section__title">{msgs.security.sectionTitle}</h2>
        </div>

        <form className="profile-security__form" onSubmit={handleSubmit} noValidate>
          <div className="profile-security__fields">
            <PasswordField
              id="profile-current-password"
              label={msgs.security.currentPasswordLabel}
              placeholder={msgs.security.currentPasswordPlaceholder}
              value={currentPassword}
              onChange={setCurrentPassword}
              error={errors.current}
            />

            <PasswordField
              id="profile-new-password"
              label={msgs.security.newPasswordLabel}
              placeholder={msgs.security.newPasswordPlaceholder}
              value={newPassword}
              onChange={setNewPassword}
              error={errors.newPw}
              showStrength
            />

            <PasswordField
              id="profile-confirm-password"
              label={msgs.security.confirmPasswordLabel}
              placeholder={msgs.security.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirm}
            />
          </div>

          {isSuccess ? (
            <div className="profile-security__success" role="status">
              <CheckCircle2
                size={18}
                strokeWidth={2}
                className="profile-security__success-icon"
                aria-hidden="true"
              />
              <span>{msgs.security.success}</span>
            </div>
          ) : (
            <div className="profile-security__footer">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {msgs.security.cancelButton}
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? msgs.security.savingButton : msgs.security.saveButton}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
