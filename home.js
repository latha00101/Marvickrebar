/* ─── CURSOR ─── */
const cur = document.getElementById("cur");
const ring = document.getElementById("cur-ring");
let mx = 0,
	my = 0,
	rx = 0,
	ry = 0;
document.addEventListener("mousemove", (e) => {
	mx = e.clientX;
	my = e.clientY;
	cur.style.left = mx + "px";
	cur.style.top = my + "px";
});
(function loop() {
	rx += (mx - rx) * 0.12;
	ry += (my - ry) * 0.12;
	ring.style.left = rx + "px";
	ring.style.top = ry + "px";
	requestAnimationFrame(loop);
})();
document.querySelectorAll("a,button").forEach((el) => {
	el.addEventListener("mouseenter", () => {
		ring.style.width = "44px";
		ring.style.height = "44px";
		ring.style.opacity = ".7";
	});
	el.addEventListener("mouseleave", () => {
		ring.style.width = "28px";
		ring.style.height = "28px";
		ring.style.opacity = ".35";
	});
});

/* ─── PARTICLES ─── */
const container = document.getElementById("particles");
for (let i = 0; i < 30; i++) {
	const p = document.createElement("div");
	p.className = "particle";
	p.style.cssText = `left:${Math.random() * 100}%;top:${
		60 + Math.random() * 40
	}%;animation-duration:${4 + Math.random() * 8}s;animation-delay:${
		Math.random() * 6
	}s;opacity:0;`;
	container.appendChild(p);
}

/* ─── SCROLL REVEAL ─── */
const obs = new IntersectionObserver(
	(entries) => {
		entries.forEach((e, i) => {
			if (e.isIntersecting)
				setTimeout(() => e.target.classList.add("visible"), i * 60);
		});
	},
	{ threshold: 0.08 }
);
document
	.querySelectorAll(".reveal,.reveal-left,.reveal-scale")
	.forEach((el) => obs.observe(el));

/* ─── COUNTER TICK ─── */
const counterEl = document.getElementById("counter");
let base = 2847;
setInterval(() => {
	if (Math.random() > 0.7) {
		base += Math.floor(Math.random() * 3) + 1;
		counterEl.textContent = base.toLocaleString();
	}
}, 8000);

/* ─── FORM SUBMIT ─── */
function handleSubmit(e, form) {
	e.preventDefault();
	const successId =
		form.closest("section,main") === document.querySelector("main")
			? "hero-success"
			: "cta-success";
	const successEl = document.getElementById(successId);
	if (successEl) {
		successEl.classList.add("show");
	}
	form.querySelector("input").value = "";
	base += Math.floor(Math.random() * 3) + 1;
	counterEl.textContent = base.toLocaleString();
}

/* ─── MOBILE MENU ─── */
const mobileNav = document.getElementById("mobileNav");
let menuOpen = false;

function toggleMenu(btn) {
	menuOpen = !menuOpen;
	const spans = btn.querySelectorAll("span");
	if (menuOpen) {
		mobileNav.style.display = "flex";
		requestAnimationFrame(() => mobileNav.classList.add("open"));
		spans[0].style.transform = "rotate(45deg) translate(4px, 4px)";
		spans[1].style.opacity = "0";
		spans[2].style.transform = "rotate(-45deg) translate(4px, -4px)";
		document.body.style.overflow = "hidden";
	} else {
		closeMobileNav();
	}
}

function closeMobileNav() {
	menuOpen = false;
	mobileNav.classList.remove("open");
	setTimeout(() => {
		mobileNav.style.display = "none";
	}, 300);
	document.body.style.overflow = "";
	const spans = document.querySelector(".hamburger").querySelectorAll("span");
	spans[0].style.transform = "";
	spans[1].style.opacity = "";
	spans[2].style.transform = "";
}

/* ─── PARALLAX on hero glow ─── */
document.addEventListener("mousemove", (e) => {
	const glow = document.querySelector(".hero-glow");
	if (!glow) return;
	const x = (e.clientX / window.innerWidth - 0.5) * 20;
	const y = (e.clientY / window.innerHeight - 0.5) * 20;
	glow.style.transform = `translate(calc(-50% + ${x}px), calc(-55% + ${y}px))`;
});
// JavaScript to add optional dynamic console logging or tracking on hover events
document.addEventListener("DOMContentLoaded", () => {
    const specRows = document.querySelectorAll(".spec-row");

    specRows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
            const label = row.querySelector(".spec-label").textContent;
            // You can attach dynamic actions here when an items row is hovered
            console.log(`Inspecting property: ${label}`);
        });
    });

    /* ─── SERVICES TAB SYSTEM ─── */
    const tabBtns = document.querySelectorAll(".services-tab-btn");
    const panels = document.querySelectorAll(".services-panel");

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");

            // Toggle active state for tab buttons
            tabBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Toggle active state for panels
            panels.forEach((panel) => {
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add("active");
                    panel.classList.add("fade-in");

                    // Trigger reveal animations for the selected panel's children
                    const reveals = panel.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
                    reveals.forEach((el, index) => {
                        el.classList.remove("visible");
                        // Slight staggered timeout
                        setTimeout(() => {
                            el.classList.add("visible");
                        }, index * 80);
                    });
                } else {
                    panel.classList.remove("active");
                    panel.classList.remove("fade-in");
                }
            });
        });
    });
});
