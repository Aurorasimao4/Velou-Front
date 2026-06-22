// src/components/memory/AddMemoryModal.jsx
import { useState } from 'react'
import Button from '@/components/ui/Button.jsx'
import Input from '@/components/ui/Input.jsx'

// `onClose` — função para fechar o modal
// `onCreate` — função do hook useCreateMemory
export default function AddMemoryModal({ onClose, onCreate, isLoading }) {
  const [form, setForm] = useState({
    title: '',
    note: '',
    category: 'Cerimónia',
  })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onCreate({
      ...form,
      date: new Date().toISOString(),
      author: 'Eu',        // fase 4: vem do utilizador autenticado
      reactions: 0,
      comments: 0,
      hasPhoto: false,
    })
  }

  return (
    // Fundo escuro — clica para fechar
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(44, 36, 32, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6)',
        zIndex: 200,
      }}
    >
      {/* Card do modal — stopPropagation evita fechar ao clicar dentro */}
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 460, padding: 'var(--space-8)' }}
      >
        <h3 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>
          Nova memória
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <Input
            label="Título"
            name="title"
            placeholder="O primeiro olhar..."
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* Select de categoria — usa className="input" do design system */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label className="label-sm" style={{ color: 'var(--text-secondary)' }}>
              Categoria
            </label>
            <select
              name="category"
              className="input"
              value={form.category}
              onChange={handleChange}
            >
              <option>Cerimónia</option>
              <option>Recepção</option>
              <option>Lua de mel</option>
              <option>Outro</option>
            </select>
          </div>

          <Input
            label="Nota"
            name="note"
            multiline
            rows={3}
            placeholder="Escreve o que sentiste neste momento..."
            value={form.note}
            onChange={handleChange}
          />

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
            <Button variant="ghost" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Guardar memória
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}