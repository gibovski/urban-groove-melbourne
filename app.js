document.documentElement.classList.add('js');
'use strict';
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.querySelectorAll('.video-play').forEach(button => button.addEventListener('click', () => {
 const frame = document.createElement('iframe');
 frame.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1&rel=0`;
 frame.title = button.dataset.title; frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'; frame.allowFullscreen = true;
 button.replaceWith(frame); frame.focus();
}));
const search = document.querySelector('#song-search');
const container = document.querySelector('#songs');
const count = document.querySelector('#song-count');
const more = document.querySelector('#more-songs');
const songs = Array.from(container.querySelectorAll('.song'), row => ({title: row.querySelector('strong').textContent, artist: row.querySelector('span').textContent, set: row.dataset.set}));
let filter = 'All', limit = 12;
function render() {
 const query = search.value.trim().toLocaleLowerCase();
 const found = songs.filter(song => (filter === 'All' || song.set === filter) && `${song.title} ${song.artist}`.toLocaleLowerCase().includes(query));
 container.replaceChildren();
 found.slice(0, limit).forEach(song => { const row = document.createElement('div'); row.className = 'song'; const title = document.createElement('strong'); title.textContent = song.title; const artist = document.createElement('span'); artist.textContent = song.artist; row.append(title, artist); container.append(row); });
 count.textContent = found.length ? `${found.length} songs · showing ${Math.min(limit, found.length)}` : 'No songs found. Try another song or artist.';
 more.hidden = found.length <= limit;
}
search.addEventListener('input', () => { limit = 12; render(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; limit = 12; document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); render(); }));
more.addEventListener('click', () => { limit += 24; render(); });
render();
