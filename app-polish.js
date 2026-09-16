/* ============================================================
   ECO ARCADE · polish layer (V10.1)
   Decorative motion added on top of app-v10.js. It only injects
   aria-hidden nodes and reads/writes CSS variables, so the games,
   storage, i18n and accessibility logic in app-v10.js are never
   touched. Everything checks the site's own motion toggle
   (`body.motion-off`) and prefers-reduced-motion before running.
   ============================================================ */
(() => {
	'use strict'
	const $ = (sel, root = document) => root.querySelector(sel)
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))
	const body = document.body
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
	const fine = matchMedia('(pointer: fine)').matches
	const lowPower = (navigator.hardwareConcurrency || 4) <= 2
	const still = () => reduced || body.classList.contains('motion-off')

	const make = (tag, cls, html) => {
		const node = document.createElement(tag)
		node.className = cls
		node.setAttribute('aria-hidden', 'true')
		if (html) node.innerHTML = html
		return node
	}

	/* ---------- 1. decorative layers ---------- */
	const hero = $('.hero')
	if (hero && !lowPower) {
		// eight CSS-drawn shapes (no font glyphs, so nothing can render as tofu)
		hero.appendChild(make('div', 'fx-float', '<i></i>'.repeat(8)))
	}

	;['#projects', '#how', '#values', '#reflect', '#games'].forEach(sel => {
		const section = $(sel)
		if (!section) return
		section.prepend(make('i', 'fx-aura a'))
		section.prepend(make('i', 'fx-aura b'))
	})

	const games = $('#games')
	if (games) games.prepend(make('i', 'fx-grid'))
	$$('.canvas-stage').forEach(stage => stage.appendChild(make('i', 'fx-vignette')))
	const howSteps = $('.how-steps')
	if (howSteps) howSteps.appendChild(make('i', 'fx-rail'))

	/* ---------- 2. reveal for the step cards ---------- */
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			entries =>
				entries.forEach(entry => {
					if (!entry.isIntersecting) return
					entry.target.classList.add('in-view')
					io.unobserve(entry.target)
				}),
			{ threshold: 0.35 },
		)
		$$('.how-steps li').forEach(li => io.observe(li))
	} else {
		$$('.how-steps li').forEach(li => li.classList.add('in-view'))
	}

	/* ---------- 3. scroll velocity + parallax ---------- */
	const glows = $$('.hero-glow')
	const auras = $$('.fx-aura')
	const floatLayer = $('.fx-float')
	const visual = $('#hero-visual')
	let lastY = scrollY
	let velocity = 0
	let scrollRAF = 0

	function parallax() {
		const y = scrollY
		const mid = innerHeight / 2
		if (visual) visual.style.translate = `0 ${Math.min(y, 900) * -0.055}px`
		if (floatLayer) floatLayer.style.translate = `0 ${Math.min(y, 900) * 0.12}px`
		glows.forEach((glow, i) => {
			glow.style.translate = `0 ${Math.min(y, 900) * (i ? 0.1 : -0.07)}px`
		})
		auras.forEach((aura, i) => {
			const box = aura.getBoundingClientRect()
			if (box.bottom < -200 || box.top > innerHeight + 200) return
			aura.style.translate = `0 ${(mid - box.top) * (i % 2 ? -0.055 : 0.07)}px`
		})
	}

	function resetParallax() {
		;[visual, floatLayer, ...glows, ...auras].forEach(node => {
			if (node) node.style.translate = ''
		})
		document.documentElement.style.setProperty('--tv', '0')
	}

	addEventListener(
		'scroll',
		() => {
			if (scrollRAF) return
			scrollRAF = requestAnimationFrame(() => {
				scrollRAF = 0
				if (still()) return
				const y = scrollY
				const delta = Math.max(-1, Math.min(1, (y - lastY) / 55))
				lastY = y
				velocity = velocity * 0.72 + delta * 0.28
				document.documentElement.style.setProperty('--tv', velocity.toFixed(3))
				if (!lowPower) parallax()
			})
		},
		{ passive: true },
	)
	if (!still() && !lowPower) parallax()

	/* ---------- 4. arcade spotlight ---------- */
	if (games && fine) {
		let spotRAF = 0
		let sx = 50
		let sy = 26
		games.addEventListener(
			'pointermove',
			event => {
				if (still()) return
				const box = games.getBoundingClientRect()
				sx = ((event.clientX - box.left) / box.width) * 100
				sy = ((event.clientY - box.top) / box.height) * 100
				if (spotRAF) return
				spotRAF = requestAnimationFrame(() => {
					spotRAF = 0
					games.style.setProperty('--spot-x', `${sx.toFixed(1)}%`)
					games.style.setProperty('--spot-y', `${sy.toFixed(1)}%`)
				})
			},
			{ passive: true },
		)
	}

	/* ---------- 5. magnetic buttons + card tilt ---------- */
	if (fine && !lowPower) {
		$$('.button').forEach(button => {
			button.addEventListener(
				'pointermove',
				event => {
					if (still()) return
					const box = button.getBoundingClientRect()
					button.style.setProperty('--mag-x', `${(event.clientX - box.left - box.width / 2) * 0.08}px`)
					button.style.setProperty('--mag-y', `${(event.clientY - box.top - box.height / 2) * 0.08}px`)
				},
				{ passive: true },
			)
			button.addEventListener('pointerleave', () => {
				button.style.removeProperty('--mag-x')
				button.style.removeProperty('--mag-y')
			})
		})

		$$('.how-steps li, .value-card, .hero-stats > div').forEach(card => {
			let raf = 0
			let tx = 0
			let ty = 0
			card.addEventListener(
				'pointermove',
				event => {
					if (still()) return
					const box = card.getBoundingClientRect()
					tx = (event.clientX - box.left) / box.width - 0.5
					ty = (event.clientY - box.top) / box.height - 0.5
					if (raf) return
					raf = requestAnimationFrame(() => {
						raf = 0
						card.style.transform = `perspective(900px) rotateY(${(tx * 5).toFixed(2)}deg) rotateX(${(-ty * 5).toFixed(2)}deg) translateY(-6px)`
					})
				},
				{ passive: true },
			)
			card.addEventListener('pointerleave', () => {
				card.style.transform = ''
			})
		})
	}

	/* ---------- 6. click ripples ---------- */
	const rippleTargets = '.button, .filter-bar button, .game-tabs button, .project-open, .bin, .drop-button'
	document.addEventListener(
		'pointerdown',
		event => {
			if (still()) return
			const target = event.target.closest(rippleTargets)
			if (!target) return
			const box = target.getBoundingClientRect()
			const ripple = make('i', 'fx-ripple')
			ripple.style.left = `${event.clientX - box.left}px`
			ripple.style.top = `${event.clientY - box.top}px`
			target.appendChild(ripple)
			setTimeout(() => ripple.remove(), 640)
		},
		{ passive: true },
	)

	/* ---------- 7. keep in sync with the motion toggle ---------- */
	new MutationObserver(() => {
		if (still()) resetParallax()
	}).observe(body, { attributes: true, attributeFilter: ['class'] })

	addEventListener('pagehide', () => cancelAnimationFrame(scrollRAF))
})()
