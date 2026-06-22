// src/components/ui/Avatar.jsx
// Uso:
//   <Avatar name="Ana Silva" />
//   <Avatar name="João" src="/foto.jpg" size="lg" />

export default function Avatar({ name = '', src, size = 'md' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')

  return (
    <div className={`avatar avatar-${size}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
