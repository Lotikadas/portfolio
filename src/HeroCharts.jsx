import { useEffect, useRef, useState, useCallback } from 'react'

const DEFAULT_LAYERS = [
  [0, 0.06, 0.04, 0.05, 0.09, 0.1, 0.12, 0.11, 0.13, 0.13, 0.17, 0.26, 0.25, 0.34, 0.33, 0.4, 0.36, 0.43, 0.42, 0.44],
  [0, 0.03, 0.04, 0.03, 0.08, 0.09, 0.06, 0.13, 0.1, 0.11, 0.12, 0.22, 0.27, 0.33, 0.39, 0.45, 0.47, 0.61, 0.57, 0.72],
  [0, 0.03, 0, 0.03, 0, 0.05, 0, 0.01, 0, 0.02, 0.02, 0.08, 0.08, 0.2, 0.27, 0.41, 0.46, 0.66, 0.76, 0.88],
]

const LAYER_STYLES = [
  {
    lightColors: { fill: ['rgba(236,72,153,0.10)', 'rgba(236,72,153,0.01)'], stroke: ['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.22)'] },
    darkColors: { fill: ['rgba(236,72,153,0.14)', 'rgba(236,72,153,0.01)'], stroke: ['rgba(244,114,182,0.20)', 'rgba(244,114,182,0.30)'] },
    delay: 0, speed: 1.0, label: 'Pink',
  },
  {
    lightColors: { fill: ['rgba(168,85,247,0.12)', 'rgba(168,85,247,0.01)'], stroke: ['rgba(168,85,247,0.18)', 'rgba(168,85,247,0.28)'] },
    darkColors: { fill: ['rgba(168,85,247,0.16)', 'rgba(168,85,247,0.01)'], stroke: ['rgba(192,132,252,0.22)', 'rgba(192,132,252,0.35)'] },
    delay: 0.08, speed: 0.85, label: 'Purple',
  },
  {
    lightColors: { fill: ['rgba(147,51,234,0.08)', 'rgba(147,51,234,0.01)'], stroke: ['rgba(147,51,234,0.12)', 'rgba(147,51,234,0.22)'] },
    darkColors: { fill: ['rgba(192,132,252,0.12)', 'rgba(192,132,252,0.01)'], stroke: ['rgba(192,132,252,0.18)', 'rgba(192,132,252,0.30)'] },
    delay: 0.18, speed: 0.7, label: 'Violet',
  },
]

function generateRandom() {
  const pts = 20
  const layers = []
  for (let l = 0; l < 3; l++) {
    const arr = [0]
    const style = ['earlyRiser', 'volatile', 'lateBloom'][l]
    for (let i = 1; i < pts; i++) {
      const t = i / (pts - 1)
      let base
      // On desktop (>768px), suppress growth in the first 50% then ramp; on mobile, grow freely
      const isDesktop = window.innerWidth > 768
      const ramp = (isDesktop && t < 0.5) ? t * 0.3 : isDesktop ? 0.15 + (t - 0.5) * 2 * 0.85 : t
      // After 70% width, spread the layers apart so they diverge and don't cross
      const spread = t > 0.7 ? (t - 0.7) / 0.3 : 0
      const layerOffset = style === 'earlyRiser' ? -0.12 * spread : style === 'lateBloom' ? 0.12 * spread : 0
      if (style === 'earlyRiser') {
        base = Math.pow(ramp, 0.7) * 0.55 + layerOffset
      } else if (style === 'volatile') {
        base = Math.pow(ramp, 0.9) * 0.68 + layerOffset
      } else {
        base = Math.pow(ramp, 2.0) * 0.82 + layerOffset
      }
      const jitter = (Math.random() - 0.5) * 0.06
      const dip = (i % 2 === 0) ? -(Math.random() * 0.03) : (Math.random() * 0.02)
      arr.push(Math.max(0, Math.min(0.85, base + jitter + dip)))
    }
    layers.push(arr.map(v => Math.round(v * 100) / 100))
  }
  return layers
}

function buildCurvePath(pts, w, h, maxIdx, frac) {
  const path = new Path2D()
  const totalPts = pts.length
  const getXY = (i) => ({ x: (i / (totalPts - 1)) * w, y: h - pts[i] * h })

  path.moveTo(0, h)
  const first = getXY(0)
  path.lineTo(first.x, first.y)

  for (let i = 1; i <= maxIdx; i++) {
    const prev = getXY(i - 1)
    const curr = getXY(i)
    const cpx1 = prev.x + (curr.x - prev.x) * 0.3
    const cpx2 = curr.x - (curr.x - prev.x) * 0.3
    path.bezierCurveTo(cpx1, prev.y, cpx2, curr.y, curr.x, curr.y)
  }

  let endX, endY
  if (maxIdx < totalPts - 1 && frac > 0) {
    const prev = getXY(maxIdx)
    const next = getXY(maxIdx + 1)
    endX = prev.x + (next.x - prev.x) * frac
    endY = prev.y + (next.y - prev.y) * frac
    const cpx1 = prev.x + (endX - prev.x) * 0.3
    const cpx2 = endX - (endX - prev.x) * 0.3
    path.bezierCurveTo(cpx1, prev.y, cpx2, endY, endX, endY)
  } else {
    const last = getXY(maxIdx)
    endX = last.x
    endY = last.y
  }

  return { path, endX, endY }
}

export default function HeroChart() {
  const canvasRef = useRef(null)
  const [layerPoints, setLayerPoints] = useState(DEFAULT_LAYERS)
  const [showPanel, setShowPanel] = useState(false)
  const progressRef = useRef(0)
  const timeRef = useRef(0)
  const doneRef = useRef(false)
  const layerRef = useRef(layerPoints)

  const randomize = useCallback(() => {
    const newPts = generateRandom()
    setLayerPoints(newPts)
    layerRef.current = newPts
    progressRef.current = 0
    doneRef.current = false
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.shiftKey && e.key === 'R') setShowPanel(p => !p) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    layerRef.current = layerPoints
  }, [layerPoints])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawGrid = (w, h, dark) => {
      ctx.strokeStyle = dark ? 'rgba(168,85,247,0.04)' : 'rgba(236,72,153,0.04)'
      ctx.lineWidth = 0.5
      for (let i = 1; i < 6; i++) {
        const y = (h / 6) * i
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }
      for (let i = 1; i < 10; i++) {
        const x = (w / 10) * i
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
    }

    const drawLayer = (points, style, w, h, dark, prog, breathe) => {
      const rawProgress = (prog - style.delay) / (1 - style.delay)
      const adjusted = Math.max(0, Math.min(1, Math.pow(rawProgress, 1 / (style.speed || 1))))
      if (adjusted <= 0) return

      const pts = points.map((v, i) => {
        if (!doneRef.current) return v
        return v + Math.sin(breathe + i * 0.7) * 0.010
      })
      const totalPts = pts.length
      const maxIdx = Math.min(totalPts - 1, Math.floor(adjusted * (totalPts - 1)))
      const frac = adjusted * (totalPts - 1) - maxIdx

      const { path: curvePath, endX, endY } = buildCurvePath(pts, w, h, maxIdx, frac)

      const fillPath = new Path2D()
      fillPath.addPath(curvePath)
      fillPath.lineTo(endX, h)
      fillPath.closePath()

      const colors = dark ? style.darkColors : style.lightColors
      const grad = ctx.createLinearGradient(0, h * 0.2, 0, h)
      grad.addColorStop(0, colors.fill[0])
      grad.addColorStop(1, colors.fill[1])
      ctx.fillStyle = grad
      ctx.fill(fillPath)

      const strokePath = new Path2D()
      const getXY = (i) => ({ x: (i / (totalPts - 1)) * w, y: h - pts[i] * h })
      const first = getXY(0)
      strokePath.moveTo(first.x, first.y)
      for (let i = 1; i <= maxIdx; i++) {
        const prev = getXY(i - 1)
        const curr = getXY(i)
        strokePath.bezierCurveTo(prev.x + (curr.x - prev.x) * 0.3, prev.y, curr.x - (curr.x - prev.x) * 0.3, curr.y, curr.x, curr.y)
      }
      if (maxIdx < totalPts - 1 && frac > 0) {
        const prev = getXY(maxIdx)
        strokePath.bezierCurveTo(prev.x + (endX - prev.x) * 0.3, prev.y, endX - (endX - prev.x) * 0.3, endY, endX, endY)
      }

      const strokeGrad = ctx.createLinearGradient(0, 0, w, 0)
      strokeGrad.addColorStop(0, colors.stroke[0])
      strokeGrad.addColorStop(1, colors.stroke[1])
      ctx.strokeStyle = strokeGrad
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.stroke(strokePath)
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)
      const dark = document.documentElement.classList.contains('dark')
      drawGrid(w, h, dark)
      const currentLayers = layerRef.current
      for (let i = 0; i < currentLayers.length; i++) {
        drawLayer(currentLayers[i], LAYER_STYLES[i], w, h, dark, progressRef.current, timeRef.current)
      }
    }

    const animate = () => {
      if (progressRef.current < 1) {
        progressRef.current += 0.005
        if (progressRef.current >= 1) { progressRef.current = 1; doneRef.current = true }
      }
      timeRef.current += 0.008
      draw()
      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const onResize = () => { resize(); draw() }
    window.addEventListener('resize', onResize)
    const observer = new MutationObserver(() => draw())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="hero-chart-canvas" aria-hidden="true" />
      {/* Hidden randomizer UI — toggle with Shift+R */}
      {showPanel && <div style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 999,
        background: 'rgba(0,0,0,0.85)', color: '#e5e7eb', borderRadius: 12,
        padding: '12px 16px', fontSize: 11, fontFamily: 'monospace',
        maxWidth: 420, maxHeight: '40vh', overflowY: 'auto',
        backdropFilter: 'blur(8px)', border: '1px solid rgba(168,85,247,0.3)',
      }}>
        <button
          onClick={randomize}
          style={{
            background: 'linear-gradient(135deg, #ec4899, #9333ea)', color: '#fff',
            border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer',
            fontWeight: 700, fontSize: 13, marginBottom: 10, display: 'block',
          }}
        >
          Randomize Peaks
        </button>
        {layerPoints.map((pts, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <span style={{ color: ['#f472b6', '#c084fc', '#a78bfa'][i], fontWeight: 600 }}>
              {LAYER_STYLES[i].label}:
            </span>
            <div style={{ wordBreak: 'break-all', lineHeight: 1.4, marginTop: 2 }}>
              [{pts.join(', ')}]
            </div>
          </div>
        ))}
      </div>}
    </>
  )
}
