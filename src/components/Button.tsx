import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
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
    'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-dark)] transition-all hover:scale-105',
  secondary:
    'bg-[var(--color-forest)] text-white hover:bg-[var(--color-earth-dark)] transition-all hover:scale-105',
  outline:
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-[var(--color-earth-dark)] transition-colors',
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
  const baseStyles = 'rounded-full font-semibold inline-block text-center'
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
