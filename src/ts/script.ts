const items = document.querySelectorAll('li');
const infoBoxes = document.querySelectorAll('.info');
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    items.forEach(item => item.classList.remove('active'));
    infoBoxes.forEach(infoBox => infoBox.classList.remove('active'));
    item.classList.add('active');
    infoBoxes[index].classList.add('active');
  });
});

const button = document.getElementById('run-python-script-button');
button.addEventListener('click', async () => {
    const response = await fetch('/run-python-script');
    const data = await response.text();
    console.log(data);
});