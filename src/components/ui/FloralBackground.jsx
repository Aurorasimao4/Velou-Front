// src/components/ui/FloralBackground.jsx
import { useEffect, useRef } from 'react'

// As três formas de pétala — funções que recebem cor e tamanho
// e devolvem um SVG inline como string
const PETAL_SHAPES = [
  (color, s) => `
    <svg width="${s * 2}" height="${s}" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="5" rx="9" ry="4" fill="${color}" opacity=".75"/>
    </svg>`,
  (color, s) => `
    <svg width="${s}" height="${s * 1.6}" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="5" cy="8" rx="4" ry="7" fill="${color}" opacity=".7"/>
    </svg>`,
  (color, s) => `
    <svg width="${s * 1.4}" height="${s * 1.4}" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M7,1 Q12,4 11,9 Q7,14 3,10 Q1,5 7,1Z" fill="${color}" opacity=".65"/>
    </svg>`,
]

const COLORS = ['#E8C5A0', '#F0D4B8', '#DEB89A', '#C9A882', '#F5E6D3']

function random(min, max) {
  return min + Math.random() * (max - min)
}

export default function FloralBackground() {
  const petalsRef = useRef(null)

  useEffect(() => {
    const container = petalsRef.current
    if (!container) return

    // Cria 18 pétalas com propriedades aleatórias
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div')

      const color    = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size     = random(7, 16)
      const shape    = PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)]
      const left     = random(0, 100)           // posição horizontal %
      const duration = random(10, 22)           // segundos a cair
      const delay    = random(-25, 0)           // delay negativo = já a meio da queda quando a página abre

      el.innerHTML = shape(color, size)

      Object.assign(el.style, {
        position:        'absolute',
        top:             '0',
        left:            `${left}%`,
        opacity:         '0',
        animation:       `memoriesPetalFall ${duration}s linear ${delay}s infinite`,
        pointerEvents:   'none',
      })

      container.appendChild(el)
    }

    // Cleanup — quando o componente sai do ecrã, remove as pétalas
    return () => {
      container.innerHTML = ''
    }
  }, []) // [] significa "corre só uma vez, quando o componente monta"

  return (
    <>
      {/* Injecta a keyframe globalmente — só uma vez */}
      <style>{`
        @keyframes memoriesPetalFall {
          0%   { opacity: 0;   transform: translateY(-30px) rotate(0deg);   }
          8%   { opacity: 0.7;                                               }
          92%  { opacity: 0.4;                                               }
          100% { opacity: 0;   transform: translateY(100vh) rotate(400deg); }
        }
      `}</style>

      {/* Contentor — ocupa o pai inteiro sem bloquear cliques */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          overflow:      'hidden',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      >
        {/* Ramos SVG nos quatro cantos */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Canto superior esquerdo — original */}
          <Branch opacity={0.2} />

          {/* Canto superior direito — espelho horizontal */}
          <g transform="scale(-1,1) translate(-800,0)">
            <Branch opacity={0.2} />
          </g>

          {/* Canto inferior esquerdo — espelho vertical */}
          <g transform="scale(1,-1) translate(0,-600)">
            <BranchHorizontal opacity={0.16} />
          </g>

          {/* Canto inferior direito — espelho duplo */}
          <g transform="scale(-1,-1) translate(-800,-600)">
            <BranchHorizontal opacity={0.16} />
          </g>
        </svg>

        {/* Pétalas — preenchido pelo useEffect */}
        <div ref={petalsRef} style={{ position: 'absolute', inset: 0 }} />
      </div>
    </>
  )
}

// Ramo vertical — cantos superiores
function Branch({ opacity }) {
  return (
    <g opacity={opacity} fill="none" stroke="#4A3728" strokeLinecap="round">
      <path d="M0,0 Q40,60 20,140"    strokeWidth="1.2" />
      <path d="M0,20 Q55,55 65,115"   strokeWidth="1" />
      <path d="M18,0 Q28,45 8,85"     strokeWidth="0.8" />
      {/* folhas */}
      <ellipse cx="22" cy="55"  rx="10" ry="18" fill="#6B8F4E" fillOpacity=".32" stroke="none" transform="rotate(-30 22 55)" />
      <ellipse cx="48" cy="82"  rx="8"  ry="14" fill="#6B8F4E" fillOpacity=".28" stroke="none" transform="rotate(-50 48 82)" />
      <ellipse cx="9"  cy="97"  rx="7"  ry="12" fill="#6B8F4E" fillOpacity=".25" stroke="none" transform="rotate(-15 9 97)" />
      {/* flor 1 */}
      <circle cx="20" cy="140" r="5.5" fill="#E8C5A0" fillOpacity=".68" stroke="none" />
      <circle cx="20" cy="140" r="2.2" fill="#C4906A" fillOpacity=".8"  stroke="none" />
      <ellipse cx="20" cy="132" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(-20 20 132)" />
      <ellipse cx="28" cy="133" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(25 28 133)" />
      <ellipse cx="13" cy="135" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(-70 13 135)" />
      <ellipse cx="27" cy="140" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(80 27 140)" />
      {/* flor 2 */}
      <circle cx="65" cy="113" r="4"   fill="#DEB89A" fillOpacity=".6"  stroke="none" />
      <circle cx="65" cy="113" r="1.8" fill="#C4906A" fillOpacity=".8"  stroke="none" />
      <ellipse cx="65" cy="107" rx="2.5" ry="4.5" fill="#F0D4B8" fillOpacity=".6" stroke="none" />
      <ellipse cx="71" cy="110" rx="2.5" ry="4.5" fill="#F0D4B8" fillOpacity=".6" stroke="none" transform="rotate(40 71 110)" />
      <ellipse cx="59" cy="110" rx="2.5" ry="4.5" fill="#F0D4B8" fillOpacity=".6" stroke="none" transform="rotate(-40 59 110)" />
    </g>
  )
}

// Ramo horizontal — cantos inferiores
function BranchHorizontal({ opacity }) {
  return (
    <g opacity={opacity} fill="none" stroke="#4A3728" strokeLinecap="round">
      <path d="M0,0 Q60,45 150,35"   strokeWidth="1.2" />
      <path d="M0,18 Q70,48 140,70"  strokeWidth="1" />
      <ellipse cx="62"  cy="26" rx="10" ry="16" fill="#6B8F4E" fillOpacity=".32" stroke="none" transform="rotate(55 62 26)" />
      <ellipse cx="105" cy="36" rx="9"  ry="14" fill="#6B8F4E" fillOpacity=".28" stroke="none" transform="rotate(75 105 36)" />
      <circle cx="150" cy="35" r="5.5" fill="#E8C5A0" fillOpacity=".68" stroke="none" />
      <circle cx="150" cy="35" r="2.2" fill="#C4906A" fillOpacity=".8"  stroke="none" />
      <ellipse cx="143" cy="33" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(-45 143 33)" />
      <ellipse cx="157" cy="33" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" transform="rotate(45 157 33)" />
      <ellipse cx="150" cy="27" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" />
      <ellipse cx="150" cy="43" rx="3" ry="5.5" fill="#F0D4B8" fillOpacity=".62" stroke="none" />
    </g>
  )
}