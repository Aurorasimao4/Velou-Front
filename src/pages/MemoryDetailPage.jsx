// src/pages/MemoryDetailPage.jsx
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMemory } from '@/hooks/useMemories.js'
import Avatar from '@/components/ui/Avatar.jsx'

export default function MemoryDetailPage() {
  const { id } = useParams() // lê o :id do URL, ex: "/album/memoria/3" → id = "3"
  const navigate = useNavigate()
  const { data: memory, isLoading } = useMemory(id)

  if (isLoading) {
    return <div className="container" style={{ paddingTop: 'var(--space-12)' }}>
      <div className="skeleton" style={{ height: 300, borderRadius: 'var(--radius-lg)' }} />
    </div>
  }

  if (!memory) {
    return <div className="container" style={{ paddingTop: 'var(--space-12)', textAlign: 'center' }}>
      <p className="body-md">Memória não encontrada.</p>
    </div>
  }

  return (
    <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
      <button onClick={() => navigate(-1)} className="btn-ghost label-sm" style={{ marginBottom: 'var(--space-6)' }}>
        ← Voltar
      </button>

      {memory.hasPhoto && (
        <div style={{
          height: 360, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-6)',
          background: 'linear-gradient(135deg, #f0e6d8, #ddd0c4)',
        }} />
      )}

      <span className="tag" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>
        {memory.category}
      </span>

      <h1 className="heading-1" style={{ marginBottom: 'var(--space-4)' }}>{memory.title}</h1>

      <p className="body-lg" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
        {memory.note}
      </p>

      <div className="row gap-2" style={{ marginBottom: 'var(--space-8)' }}>
        <Avatar name={memory.author} size="sm" />
        <span className="caption">por <strong>{memory.author}</strong></span>
      </div>

      <div className="divider" style={{ marginBottom: 'var(--space-6)' }} />

      {/* Secção de comentários vem na fase B */}
      <p className="caption">{memory.comments} comentário(s) · {memory.reactions} reacção(ões)</p>
    </div>
  )
}