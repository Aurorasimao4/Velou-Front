// src/components/memory/AddMemoryModal.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button.jsx'
import Input from '@/components/ui/Input.jsx'
import PhotoDropzone from './PhotoDropzone.jsx'
import { useFileUpload } from '@/hooks/useFileUpload.js'

export default function AddMemoryModal({ onClose, onCreate, isLoading }) {
  const [form, setForm] = useState({ title: '', note: '', category: 'Cerimónia' })
  const { file, previewUrl, selectFile, clearFile } = useFileUpload()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Passamos o `file` junto com os dados do formulário
    // Na fase 4, o hook useCreateMemory vai construir um FormData com isto
    onCreate({ ...form, file, hasPhoto: !!file, previewUrl })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(44, 36, 32, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-6)', zIndex: 200,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{ width: '100%', maxWidth: 460, padding: 'var(--space-8)', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <h3 className="heading-3" style={{ marginBottom: 'var(--space-6)' }}>Nova memória</h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Dropzone primeiro — a foto é o elemento principal */}
          <PhotoDropzone
            onSelect={selectFile}
            previewUrl={previewUrl}
            onClear={clearFile}
          />

          <Input label="Título" name="title" placeholder="O primeiro olhar..." value={form.title} onChange={handleChange} required />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label className="label-sm" style={{ color: 'var(--text-secondary)' }}>Categoria</label>
            <select name="category" className="input" value={form.category} onChange={handleChange}>
              <option>Cerimónia</option>
              <option>Recepção</option>
              <option>Lua de mel</option>
              <option>Outro</option>
            </select>
          </div>

          <Input label="Nota" name="note" multiline rows={3} placeholder="Escreve o que sentiste..." value={form.note} onChange={handleChange} />

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
            <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
            <Button type="submit" loading={isLoading}>Guardar memória</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}