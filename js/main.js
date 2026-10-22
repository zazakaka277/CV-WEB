// Shared behaviour: mobile menu, active link, back-to-top, scroll reveal, JSON loading.
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
// Mark the link for the current page as active
const here = location.pathname.split('/').pop() || 'index.html';
menu.querySelectorAll('a').forEach(a => { if (a.getAttribute('href') === here) a.classList.add('active'); });

const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 400));
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }));
const observe = () => document.querySelectorAll('.card:not(.reveal)').forEach(c => { c.classList.add('reveal'); io.observe(c); });
observe();

// Build an element safely from text (avoids injecting raw HTML)
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const load = async (file, target) => {
  try { const r = await fetch(file); if (!r.ok) throw 0; return await r.json(); }
  catch { target.textContent = 'Could not load data. Run the site through a local server (see README).'; return null; }
};

const skillsBox = document.getElementById('skills');
if (skillsBox) load('data/skills.json', skillsBox).then(groups => {
  if (!groups) return;
  skillsBox.textContent = '';
  groups.forEach(g => {
    const card = el('div', 'glass card'); card.append(el('h3', '', g.group));
    g.items.forEach(s => {
      const bar = el('div', 'bar'), fill = el('i'); bar.append(fill);
      bar.setAttribute('role', 'img'); bar.setAttribute('aria-label', s.name + ' ' + s.level + '%');
      card.append(el('span', '', s.name + ' · ' + s.level + '%'), bar);
      requestAnimationFrame(() => setTimeout(() => fill.style.width = s.level + '%', 100));
    });
    skillsBox.append(card);
  });
  observe();
});

const projBox = document.getElementById('projects');
if (projBox) load('data/projects.json', projBox).then(list => {
  if (!list) return;
  projBox.textContent = '';
  list.forEach(p => {
    const card = el('article', 'glass card'), img = el('img'); img.src = p.image; img.alt = p.title + ' thumbnail';
    const chips = el('ul', 'chips'); p.tech.forEach(t => chips.append(el('li', '', t)));
    const links = el('div', 'actions');
    [['GitHub', p.github, 'btn ghost'], ['Live demo', p.demo, 'btn']].forEach(([t, h, c]) => {
      const a = el('a', c, t); a.href = h; a.target = '_blank'; a.rel = 'noopener'; links.append(a);
    });
    card.append(img, el('h3', '', p.title), el('p', '', p.description), chips, links);
    projBox.append(card);
  });
  observe();
});
