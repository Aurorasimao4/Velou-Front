import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloralBackground from '@/components/ui/FloralBackground.jsx'
import Button from '@/components/ui/Button.jsx'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <FloralBackground />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
      >
        <motion.h1 variants={fadeUp} transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(56px, 10vw, 96px)' }}>
          Vel<em style={{ color: 'var(--text-secondary)' }}>ou</em>
        </motion.h1>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
          className="divider divider-center" style={{ margin: '1rem auto' }} />

        <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
          className="label" style={{ color: 'var(--text-muted)', letterSpacing: '0.25em' }}>
          memórias que ficam para sempre
        </motion.p>

        <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
          style={{ maxWidth: 420, margin: '2rem auto', fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 3vw, 22px)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
          O vosso dia especial merece um álbum especial.
        </motion.p>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: '2rem' }}>
          <Button onClick={() => navigate('/entrar')} size="lg">Começar</Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/entrar')}>Já tenho conta</Button>
        </motion.div>
      </motion.div>
    </div>
  )
}