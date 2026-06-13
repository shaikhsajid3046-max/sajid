'use client'

import { useEffect, useRef } from 'react'

export function WebGLHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animId: number
    let cleanupFn: (() => void) | undefined

    import('three').then((THREE) => {
      if (!mountRef.current) return

      const w = el.clientWidth
      const h = el.clientHeight

      // ── Renderer ──────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      Object.assign(renderer.domElement.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
      })
      el.appendChild(renderer.domElement)

      // ── Scene + Camera ─────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
      camera.position.z = 8

      // ── Icosahedron wireframe (gold, top-right) ────────────────────
      const icoGeo = new THREE.IcosahedronGeometry(2.8, 1)
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xbfa46d,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      })
      const ico = new THREE.Mesh(icoGeo, icoMat)
      ico.position.set(3.2, 0.8, -1)
      scene.add(ico)

      // ── Large decorative ring ──────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(5.5, 0.006, 6, 240)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf0ede8,
        transparent: true,
        opacity: 0.04,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2.8
      ring.position.set(0.5, -0.5, -3)
      scene.add(ring)

      // ── Small detail ring (accent) ─────────────────────────────────
      const ring2Geo = new THREE.TorusGeometry(1.5, 0.008, 6, 120)
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xbfa46d,
        transparent: true,
        opacity: 0.1,
      })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.position.set(-3, 2, 0)
      scene.add(ring2)

      // ── Particles ─────────────────────────────────────────────────
      const count = 500
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 30
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const pMat = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xf0ede8,
        transparent: true,
        opacity: 0.28,
      })
      const points = new THREE.Points(pGeo, pMat)
      scene.add(points)

      // ── Mouse lerp ────────────────────────────────────────────────
      const mouse = { x: 0, y: 0 }
      const lerped = { x: 0, y: 0 }
      const onMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── Resize ────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = el.clientWidth / el.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(el.clientWidth, el.clientHeight)
      }
      window.addEventListener('resize', onResize)

      // ── Animate ───────────────────────────────────────────────────
      let t = 0
      let last = performance.now()

      const animate = () => {
        animId = requestAnimationFrame(animate)
        const now = performance.now()
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        t += dt

        lerped.x += (mouse.x - lerped.x) * 0.045
        lerped.y += (mouse.y - lerped.y) * 0.045

        // Icosahedron rotates + reacts to mouse
        ico.rotation.x = t * 0.1 + lerped.y * 0.25
        ico.rotation.y = t * 0.07 + lerped.x * 0.25

        // Rings rotate independently
        ring.rotation.z = t * 0.025
        ring2.rotation.z = -t * 0.04
        ring2.rotation.x = t * 0.03

        // Particles drift
        points.rotation.y = t * 0.012
        points.rotation.x = t * 0.007

        // Camera subtle parallax
        camera.position.x = lerped.x * 0.3
        camera.position.y = lerped.y * 0.2

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        icoGeo.dispose(); icoMat.dispose()
        ringGeo.dispose(); ringMat.dispose()
        ring2Geo.dispose(); ring2Mat.dispose()
        pGeo.dispose(); pMat.dispose()
        renderer.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    })

    return () => cleanupFn?.()
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
