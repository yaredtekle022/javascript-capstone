import createNewLike from './createNewLike.js';

const render = (data, container) => {
  if (data.meals.length > 0) {
    container.innerHTML = '';

    data.meals.forEach((meal) => {
      const item = document.createElement('li');
      item.id = meal.idMeal;
      item.className = 'show-items';

      // creating element to show Img
      const showImg = document.createElement('div');
      showImg.className = 'show-item-img';
      showImg.innerHTML = `<img src='${meal.strMealThumb}'>`;

      // creating element to show information
      const showInfo = document.createElement('div');
      showInfo.className = 'show-info';

      // creating element to show title info
      const title = document.createElement('h3');
      title.className = 'show-mealTitle';
      title.innerText = meal.strMeal;

      // like action
      const showLikeAction = document.createElement('div');
      showLikeAction.className = 'shwo-like-action';

      // like button
      const btnLike = document.createElement('button');
      btnLike.className = 'btn-like';
      btnLike.innerHTML = "<img src='./assets/img/icons8-favorite-30.png' alt='favorite'>";

      // like count
      const likeCount = document.createElement('span');
      likeCount.innerText = '';

      // Fetch the number of likes for the current item and update the likeCount element
      const fetchLikes = async () => {
        const updatedLikes = await createNewLike(meal.idMeal);
        likeCount.innerText = updatedLikes > 1 ? `${updatedLikes} likes` : `${updatedLikes} like`;
      };
      fetchLikes();

      showLikeAction.append(btnLike, likeCount); // append like actions child element.

      showInfo.append(title, showLikeAction); // append in showInfo

      // show action
      const showActions = document.createElement('div');
      showActions.className = 'show-actions';

      // btn like event to create new like
      btnLike.addEventListener('click', async () => {
        const updatedLikes = await createNewLike(meal.idMeal);
        likeCount.innerText = updatedLikes > 1 ? `${updatedLikes} likes` : `${updatedLikes} like`;
      });

      // creating child btn
      const commentBtn = document.createElement('button');
      commentBtn.className = 'btn-action btn-comment';
      commentBtn.innerText = 'Comments';

      const reservationBtn = document.createElement('button');
      reservationBtn.className = 'btn-action btn-reservation';
      reservationBtn.innerText = 'Reservations';

      showActions.append(commentBtn, reservationBtn); // append child action buttons in showActions

      item.append(showImg, showInfo, showActions); // append clild all the elements in item.

      container.appendChild(item);
    });
  } else {
    container.innerHTML = '<p class="noData">Data Not Founded</p>';
  }
};

const fetchMealsImage = async (url, container) => {
  const res = await fetch(url);
  const result = await res.json();

  render(result, container);
};

export default fetchMealsImage;
