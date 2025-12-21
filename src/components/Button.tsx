import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-light'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-amber)] text-[var(--color-text-dark)] hover:bg-[var(--color-amber-dark)] shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--color-amber)] focus:ring-offset-2',
  secondary:
    'bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-light)] shadow-md hover:shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:ring-offset-2',
  outline:
    'border-2 border-[var(--color-forest)] bg-transparent text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:ring-offset-2',
  'outline-light':
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--color-forest-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-forest-dark)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-full font-semibold inline-flex items-center justify-center gap-2 text-center'
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    // External link
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          className={combinedStyles}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    // Internal link
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={combinedStyles}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
