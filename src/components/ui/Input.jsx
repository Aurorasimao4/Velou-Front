// src/components/ui/Input.jsx
// Uso:
//   <Input label="Nome" placeholder="O teu nome" />
//   <Input label="Nota" multiline rows={4} />
//   <Input label="Email" type="email" error="Email inválido" />

export default function Input({
  label,
  error,
  multiline = false,
  rows = 3,
  style,
  ...props
}) {
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div className="stack stack-2" style={style}>
      {label && (
        <label
          className="label-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <Tag
        className={`input ${multiline ? 'textarea' : ''}`}
        rows={multiline ? rows : undefined}
        style={{
          borderColor: error ? 'var(--color-bronze)' : undefined,
        }}
        {...props}
      />
      {error && (
        <span className="caption" style={{ color: 'var(--color-bronze)' }}>
          {error}
        </span>
      )}
    </div>
  )
}
