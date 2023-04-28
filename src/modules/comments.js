import { sendData, getData, counter } from './AddCommentAPI.js';

const getCommentData = async (idMeals) => {
  const request = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`);
  const response = await request.json();
  return response;
};

async function openPopup(data) {
  const container = document.querySelector('.comments');
  const popup = `<div class="outside">
    <p class="closeBtn">X</p>
    <img src=${data.strMealThumb} class="API-img">
    <p class="image-title">${data.strMeal}</p>
    <div class="category&type>
      <p>${data.strArea}</p>
      <p>${data.strCategory}</p>
    </div>
  </div>
  <div class="comment-1">
    <p class='WE'>Comments (${await counter(data.idMeal)})</p>
    <ul class="comment-list">
    </ul>
  </div>
  <form id="comment-form">
    <input type="text" class="comment-name" placeholder="Write name">
    <textarea type="text" cols="34" row="25" class="comment-comment" placeholder="Write comment here"></textarea>
    <button type="submit" id="submit-btn">Comment</button>
  </form>`;

  container.innerHTML = popup;

  const form = document.getElementById('comment-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    const nameInput = document.querySelector('.comment-name');
    const commentInput = document.querySelector('.comment-comment');

    const name = nameInput.value.trim();
    const message = commentInput.value.trim();

    // Call API to submit comment
    await sendData(data.idMeal, name, message);

    // Update comment list
    const comments = await getData(data.idMeal);
    const commentList = document.querySelector('.comment-list');
    commentList.innerHTML = ''; // clear existing comments
    for (let i = 0; i < comments.length; i += 1) {
      const comment = comments[i];
      const li = document.createElement('li');
      li.innerText = `${comment.username}: ${comment.comment}`;
      commentList.appendChild(li);
    }

    // Update comment count
    const commentCount = await counter(data.idMeal);
    const commentCountEl = document.querySelector('.WE');
    commentCountEl.innerText = `Comments (${commentCount})`;

    // Clear form inputs
    nameInput.value = '';
    commentInput.value = '';
  });

  // Display previous comments
  const comments = await getData(data.idMeal);
  const commentList = document.querySelector('.comment-list');
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];
    const li = document.createElement('li');
    li.innerText = `${comment.username}: ${comment.comment} 28-04-2023`;
    commentList.appendChild(li);
  }
}

document.addEventListener('click', async (e) => {
  const container = document.querySelector('.comments');
  container.style.display = 'block';
  if (e.target.classList.contains('btn-comment')) {
    const getID = e.target.getAttribute('data-name');
    const data = await getCommentData(getID);
    return openPopup(data.meals[0]);
  }
});

function closePopup() {
  const container = document.querySelector('.comments');
  container.style.display = 'none';
  container.innerHTML = '';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('closeBtn')) {
    return closePopup();
  }
});
