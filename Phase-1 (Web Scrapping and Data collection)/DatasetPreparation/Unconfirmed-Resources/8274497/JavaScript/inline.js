
  const links = document.querySelectorAll('a');

for (let i = 0; i < links.length; i++) {
const link = links[i];

link.setAttribute('href', '#');
}
