import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'text-white hover:opacity-90 h-[44px] min-h-[44px] rounded-[2px]':
              variant === 'primary',
            'text-white hover:opacity-80 h-[44px] min-h-[44px] rounded-[2px]':
              variant === 'soft',
            'text-white hover:opacity-80':
              variant === 'secondary',
            'hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'min-h-[44px] h-[44px] w-16 p-0 rounded-[2px]': size === 'icon',
          },
          className
        )}
        style={{
          background: variant === 'primary' ? '#8E4EC6' : variant === 'soft' ? '#B744F714' : variant === 'secondary' ? '#EBEAF814' : undefined,
          backdropFilter: variant === 'soft' ? 'blur(4px)' : undefined,
          borderRadius: size === 'icon' || variant === 'primary' || variant === 'soft' ? '2px' : undefined,
          padding: variant === 'primary' || variant === 'soft' ? '12px 20px' : undefined,
        }}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
