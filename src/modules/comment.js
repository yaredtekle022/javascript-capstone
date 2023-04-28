const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3c6QWaZBONRwg44PSovn/comments';
const apicom = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const doet = (b) => {
  fetch(`${url}?item_id=item${1}`)
    .then((res) => res.json())
    .then((data) => {
      const newData = data;
      for (let i = 0; i < newData.length; i += 1) {
        newData[i].index = i;
      }
      
      const html = newData
        .map((user) => `<div class='comments'>
           <p class='creation_date${user.index}'>${user.creation_date}</p>
           <p class='username'>${user.username}</p>
           <p class='comment'>${user.comment}</p>
           </div>`)
        .join('');
      const html2 = `<form>
         <h3 class='form-title'>Add your comment</h3>
         <input type='text' name='username' class='name' required placeholder='Your name'>
         <textarea class='textarea' id='' cols='2' rows='4' placeholder='Your Comment'></textarea>
         <button type='submit' id= 'submit${b}' >Submit</button>
         </form>`;
      const comment = document.querySelector('.btn-comment');
      fetch(apicom)
        .then((res) => res.json())
        .then((data) => {
          const mealName = data.meals[1].strMeal;
          const imgUrl = data.meals[1].strMealThumb;
          const img = `<button id= '${b}x' class='x'>X</button><img class = 'coImage' src='${imgUrl}' alt='Food'><h2 class= "mealnames">${mealName}</h2>`;
          comment.insertAdjacentHTML('afterbegin', img);
          const xb = document.querySelector('.x');
          xb.addEventListener('click', () => {
            window.location.reload();
          });
        });
      comment.insertAdjacentHTML('afterbegin', html);
      comment.insertAdjacentHTML('afterbegin', html2);
      comment.style.disply = 'block';
      const submit = document.querySelector(`#submit${b}`);
      submit.addEventListener('click', (e) => {
        e.preventDefault();
        const Username = document.querySelector('.name');
        const Comment = document.querySelector('.textarea');
        const inputComment = {
          item_id: `item${b}`,
          username: Username.value,
          comment: Comment.value,
        };

        if (Username.value === '' || Comment.value === '') {
          alert('Add comment');
        } else {
          fetch(`${url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputComment),
          }).then((res) => {
            console.log(res.json());
          });
          const comment = document.querySelector('.comments');
          comment.insertAdjacentHTML(
            'beforebegin',
            `<div class='comments'>
        <p class='creation_date0'>2022-06-22</p>
        <p class='username'>${Username.value}</p>
        <p class='comment'>${Comment.value}</p>
        </div>`,
          );
          data.length += 1;
          //const mealnames = document.querySelector('.comment-length');
          //mealnames.innerHTML = `<h2 class= 'comment-length'>Comments(${data.length})</h2>`;
          Username.value = '';
          Comment.value = '';
        }
      });
    });
};

exports.doet = doet;
