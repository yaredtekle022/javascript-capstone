import AddShowReservations from './AddShowReservations.js';

class Reservations {
  constructor() {
    this.AddShowRes = new AddShowReservations();
  }

  async apidata(dishId) {
    const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`);

    try {
      const data = await response.json();
      this.renderPopup(data);
    } catch (e) {
      return null;
    }
    return 1;
  }

  removePopup = () => {
    const popup = document.getElementById('reservationPopup');
    const closeBtn = document.getElementById('reservation__closeBtn');

    popup.addEventListener('click', (e) => {
      if (e.target.id === 'reservationPopup') popup.remove();
      document.body.classList.remove('popup-open');
    });

    closeBtn.addEventListener('click', () => {
      popup.remove();
      document.body.classList.remove('popup-open');
    });
  };

  renderPopup(data) {
    const res = data.meals[0];
    const id = res.idMeal;
    const thumb = res.strMealThumb;
    const name = res.strMeal;
    const category = res.strCategory;
    const area = res.strArea;
    const popup = document.getElementById('reservation__data-content');
    this.removePopup();
    let html = `
    <img src='${thumb}' alt="Image of ${name}">
    <h2>${name}</h2>
    <div id='resPopup--dish-description'>
      <div class='rpdd-item'>
        <p>Category:</p>
        <p>${category}</p>
      </div>
      <div class='rpdd-item'>
        <p>Origin:</p>
        <p>${area}</p>
      </div>
      <div class='rpdd-item'>
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </div>
    </div>
    `;
    html += this.AddShowRes.renderForm();
    this.AddShowRes.getReservations(id);

    popup.insertAdjacentHTML('afterbegin', html);

    const form = document.getElementById('submit-reservation');
    form.addEventListener('submit', (e) => {
      const formData = new FormData(e.target);

      e.preventDefault();
      this.AddShowRes.submitForm(formData, e.target, id);
      form.reset();
    });
  }

  openPopup = (e) => {
    document.body.classList.add('popup-open');
    document.body.insertAdjacentHTML('afterbegin', `
    <div id='reservationPopup'>
      <div id='reservation-p__container'>
        <div id='reservation__container'>
            <p id='reservation__closeBtn'>
            X
            </p>
            <div id='reservation__data-content'></div>
          </div>
      </div>
    </div>
    `);
    this.apidata(e.target.dataset.name);
    this.removePopup();
  };

  init = () => {
    const reservationBtn2 = document.querySelectorAll('.btn-reservation');

    reservationBtn2.forEach((el) => {
      el.addEventListener('click', this.openPopup);
    });
  };
}

export default Reservations;