const form = document.querySelector('.super-form');
const aDiv = document.createElement('div');
form.addEventListener('submit', async (e) => {
  data = {
    title: document.querySelector('.super-form__title').value,
    description: document.querySelector('.super-form__description').value,
  };
  e.preventDefault();
  console.log(e);
  const response = await fetch('./create-secret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  const resObject = await response.json();
  console.log(resObject);
  const id = resObject.id;

  const link = document.createElement('a');
  link.href = window.location + 'd/' + id;
  link.textContent = link.href;
  aDiv.appendChild(link);
});

document.body.appendChild(aDiv);
