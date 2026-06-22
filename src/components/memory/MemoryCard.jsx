import { motion } from 'framer-motion'

export default function MemoryCard({ memory, index = 0 }) {
  // Aqui extraímos os campos do objecto memory
  const { title, note, category, author, reactions, comments, hasPhoto } = memory

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: index * 0.08,
      }}
    >
      {hasPhoto && (
        <div style={{
          height: 220,
          background: 'linear-gradient(135deg, #f0e6d8, #ddd0c4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <span className="tag" style={{ position: 'absolute', bottom: 12, left: 12 }}>
            {category}
          </span>
        </div>
      )}

      <div style={{ padding: 'var(--space-6)' }}>
        {!hasPhoto && (
          <span className="tag" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>
            {category}
          </span>
        )}

        <h3 className="heading-3" style={{ marginBottom: 'var(--space-2)' }}>
          {title}
        </h3>

        <p className="body-md" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          {note}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="caption">
            por <strong style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{author}</strong>
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <button className="btn-ghost body-sm" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              ♡ {reactions}
            </button>
            <button className="btn-ghost body-sm" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              ◯ {comments}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}