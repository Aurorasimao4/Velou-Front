// src/components/memory/PhotoDropzone.jsx
import { useRef, useState } from 'react'

// onSelect — função chamada quando o utilizador escolhe um ficheiro
// previewUrl — se já houver uma foto seleccionada, mostra-a
// onClear — remove a foto seleccionada
export default function PhotoDropzone({ onSelect, previewUrl, onClear }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    onSelect(droppedFile)
  }

  function handleInputChange(e) {
    onSelect(e.target.files[0])
  }

  // Já existe uma foto — mostra preview com opção de remover
  if (previewUrl) {
    return (
      <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <img
          src={previewUrl}
          alt="Pré-visualização"
          style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
        />
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(44, 36, 32, 0.7)', color: '#fff',
            borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}
        >
          ✕
        </button>
      </div>
    )
  }

  // Sem foto ainda — zona de drop
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      style={{
        border: `1px dashed ${isDragging ? 'var(--color-bronze)' : 'var(--border-mid)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-8)',
        textAlign: 'center',
        cursor: 'pointer',
        background: isDragging ? 'var(--bg-subtle)' : 'transparent',
        transition: 'all var(--transition-fast)',
      }}
    >
      <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
        Arrasta uma foto aqui ou clica para escolher
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}