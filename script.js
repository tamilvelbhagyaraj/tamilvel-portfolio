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

// Paste only public Power BI “Publish to web” links here. Do not use secure/internal
// links for a public portfolio, because visitors would need your organization's access.
const powerBiReports = {
  panic: { title: 'Panic Attack Analysis', url: 'https://app.powerbi.com/view?r=eyJrIjoiNzU4NWUyYjQtMWE3OC00OTIzLWI2MWQtMmFlMGFlN2MyOTQ2IiwidCI6IjkxNjM1MTAzLTM4YmMtNGU2MC04NDg2LWIyYzFlNjAxNjNiNiJ9' },
  espn: { title: 'ESPN Cricket Analysis', url: 'https://app.powerbi.com/view?r=eyJrIjoiNjdmZGUzYTUtOTUxNC00YjEzLTk2MzItOTM4ZmJlNDRhZWEwIiwidCI6IjkxNjM1MTAzLTM4YmMtNGU2MC04NDg2LWIyYzFlNjAxNjNiNiJ9' },
  adventure: { title: 'Adventure Works Dashboard', url: 'https://app.powerbi.com/view?r=eyJrIjoiOGYwNWMwYTMtMWNjZS00YWFlLWJiY2QtMTE3YzQ5OTkxYzhhIiwidCI6IjkxNjM1MTAzLTM4YmMtNGU2MC04NDg2LWIyYzFlNjAxNjNiNiJ9' },
};

const reportTabs = document.querySelectorAll('[data-report]');
const powerBiFrame = document.querySelector('#powerbi-embed');
const embedStatus = document.querySelector('#embed-status');

reportTabs.forEach(tab => tab.addEventListener('click', () => {
  const report = powerBiReports[tab.dataset.report];
  reportTabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  powerBiFrame.title = `Interactive Power BI dashboard: ${report.title}`;
  if (report.url) {
    powerBiFrame.src = report.url;
    powerBiFrame.hidden = false;
    embedStatus.hidden = true;
  } else {
    powerBiFrame.removeAttribute('src');
    powerBiFrame.hidden = true;
    embedStatus.hidden = false;
    embedStatus.querySelector('p').textContent = `${report.title.toUpperCase()} · EMBED LINK REQUIRED`;
  }
}));

document.querySelector('#inquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio inquiry: ${data.get('service')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`);
  window.location.href = `mailto:tamilvel98425@gmail.com?subject=${subject}&body=${body}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
