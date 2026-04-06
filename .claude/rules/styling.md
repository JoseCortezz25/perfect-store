---
paths: src/**/*.{ts,tsx,css}
---

# Styling

The styling approach is primarily based on **Tailwind CSS v4** combined with **shadcn/ui** components. The system is organized to maintain visual consistency, reduce repetition, and scale cleanly across domains.

---

## Core Principles

### 1. Mobile-First

All responsive designs must start from mobile and scale up using Tailwind breakpoints:

```tsx
// ✅ CORRECT - Start with mobile (base), then tablet (md:), then desktop (lg:)
<div className="w-full md:w-1/2 lg:w-1/3">...</div>

// ❌ INCORRECT - Desktop-first
<div className="w-1/3 md:w-1/2 sm:w-full">...</div>
```

### 2. Extract Repeated Patterns with `@apply`

For frequently repeated utility combinations, extract them into dedicated CSS files using `@apply`. Do NOT copy-paste long class strings across components.

```css
/* styles/components/atoms/input.css */
/* ✅ Extract repeated patterns */
.input-base {
  @apply rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.input-error {
  @apply input-base border-red-500 focus:ring-red-500;
}
```

```tsx
// ✅ Use the class in the component
export function Input({ error }: { error?: boolean }) {
  return <input className={error ? 'input-error' : 'input-base'} />;
}
```

### 3. CSS File Organization

CSS files must mirror the component and domain architecture:

```
styles/
├── main.css                  # Global styles: resets, Tailwind base
│
├── components/               # Global reusable component styles
│   ├── atoms/
│   │   └── input.css
│   ├── molecules/
│   │   └── form-group.css
│   ├── organisms/
│   │   └── hero-section.css
│   └── layout/
│       ├── header.css
│       └── sidebar.css
│
├── domains/                  # Domain-specific styles
│   ├── auth/
│   │   └── login-form.css
│   └── users/
│       └── user-card.css
│
└── utils/                    # Mixins, helpers, animations
    ├── media.css
    └── animations.css
```

### 4. BEM for Custom CSS Classes

When writing custom class names (not Tailwind utilities), use **BEM** naming:

```css
/* ✅ CORRECT - BEM */
.login-form {}
.login-form__input {}
.login-form__input--error {}
.login-form__submit-button {}

/* ❌ INCORRECT */
.loginForm {}
.input-in-form {}
.errorInput {}
```

### 5. Prop-Driven Variants with `cn()`

For components with style variations based on props, use the `cn()` utility to compose classes:

```tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

### 6. shadcn/ui Components

Components from shadcn/ui live in `src/components/ui/` and are excluded from ESLint rules. Do not modify them directly — instead, extend or wrap them:

```tsx
// ✅ CORRECT - Wrap shadcn component with project-specific props
import { Button as ShadcnButton } from '@/components/ui/button';

export function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <ShadcnButton type="submit" disabled={isLoading}>
      {isLoading ? 'Loading...' : children}
    </ShadcnButton>
  );
}
```

### 7. No Inline Styles

Avoid inline style attributes. Use Tailwind utilities or `@apply` patterns instead:

```tsx
// ❌ INCORRECT
<div style={{ marginTop: '16px', color: '#3b82f6' }}>...</div>

// ✅ CORRECT
<div className="mt-4 text-blue-500">...</div>
```

---

## Quick Reference

| Need | Solution |
|------|----------|
| One-off utility | Tailwind class inline |
| Repeated pattern | `@apply` in CSS file |
| Conditional classes | `cn()` utility |
| Shared UI primitive | shadcn/ui component |
| Domain-specific style | `styles/domains/{domain}/` |
| Global component style | `styles/components/{level}/` |
