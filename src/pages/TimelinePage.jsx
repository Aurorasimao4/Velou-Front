// src/pages/TimelinePage.jsx
import { useState } from 'react'
import { useMemories, useCreateMemory } from '@/hooks/useMemories.js'
import MemoryCard from '@/components/memory/MemoryCard.jsx'
import AddMemoryModal from '@/components/memory/AddMemoryModal.jsx'
import Button from '@/components/ui/Button.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import FloralBackground from '../components/ui/FloralBackground'

// Formata "2025-06-14T11:30:00" → "14 de junho de 2025"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-PT', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// Agrupa um array de memórias por data (só a parte da data, sem horas)
// Resultado: { '2025-06-14': [memory1, memory2], '2025-06-15': [...] }
function groupByDate(memories) {
  return memories.reduce((groups, memory) => {
    const day = memory.date.slice(0, 10) // "2025-06-14"
    if (!groups[day]) groups[day] = []
    groups[day].push(memory)
    return groups
  }, {})
}

export default function TimelinePage() {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: memories, isLoading, isError } = useMemories()
  const { mutate: createMemory, isPending } = useCreateMemory()

  function handleCreate(newMemory) {
    createMemory(newMemory, {
      onSuccess: () => setModalOpen(false),
    })
  }

  // Estado de loading
  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-12)' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: 180, marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }} />
        ))}
      </div>
    )
  }

  // Estado de erro
  if (isError) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-12)', textAlign: 'center' }}>
        <p className="body-md" style={{ color: 'var(--text-muted)' }}>
          Não foi possível carregar as memórias. Tenta outra vez.
        </p>
      </div>
    )
  }

  const grouped = groupByDate(memories)

  return (
    <div className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>

      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-10)' }}>
        <div>
          <h1 className="heading-1" style={{ fontStyle: 'italic' }}>Os vossos momentos</h1>
          <div className="divider" style={{ marginTop: 'var(--space-3)' }} />
        </div>
        <Button onClick={() => setModalOpen(true)}>
          + Memória
        </Button>
      </div>

      {/* Timeline agrupada por data */}
      {Object.entries(grouped).map(([date, dayMemories]) => (
        <section key={date} style={{ marginBottom: 'var(--space-12)' }}>

          {/* Separador de data */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <span className="label-sm" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              {formatDate(date)}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
          </div>

          {/* Cards do dia */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {dayMemories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        </section>
      ))}
      <AnimatePresence>
        <FloralBackground />
          {modalOpen && (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setModalOpen(false)}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(44, 36, 32, 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <motion.div
        key="modal-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{    opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{ width: '100%', maxWidth: 460, padding: 'var(--space-8)' }}
      >
          <AddMemoryModal
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          isLoading={isPending}
        />
          
      </motion.div>
    </motion.div>
  )}
  <FloralBackground />
  </AnimatePresence>
  </div>
  )}