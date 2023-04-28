// import static files
import './modules/comments.js';
import "./modules/AddCommentAPI.js";
import './style.css';
import './assets/img/icons8-favorite-30.png';
import './assets/img/icons8-menu-rounded-24.png';

import fetchMealsImage from './modules/displayItems.js';

// external api url
const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

// // Select dom elements
const mealsContainer = document.querySelector('.show-group');

window.onload = () => {
  fetchMealsImage(MEALS_API, mealsContainer);
};
