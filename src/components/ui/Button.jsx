// src/components/ui/Button.jsx
// Uso:
//   <Button>Texto</Button>
//   <Button variant="outline" size="sm">Cancelar</Button>
//   <Button loading>A guardar...</Button>

export default function Button({
  children,
  variant = 'primary',   // 'primary' | 'outline' | 'ghost'
  size = 'md',           // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  className = '',
}) {
  const base = 'btn'
  const variantClass = `btn-${variant}`

  const sizeStyles = {
    sm: { padding: '7px 16px', fontSize: '12px' },
    md: { padding: '10px 22px', fontSize: '13px' },
    lg: { padding: '13px 28px', fontSize: '14px' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variantClass} ${className}`}
      style={{
        ...sizeStyles[size],
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {loading && (
        <span
          style={{
            width: 14,
            height: 14,
            border: '1.5px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      )}
      {children}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}
