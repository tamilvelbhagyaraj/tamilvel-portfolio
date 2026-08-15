const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  projects.forEach(project => {
    project.hidden = filter !== 'all' && project.dataset.category !== filter;
  });
}));

document.querySelector('#inquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio inquiry: ${data.get('service')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`);
  window.location.href = `mailto:tamilvel98425@gmail.com?subject=${subject}&body=${body}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
