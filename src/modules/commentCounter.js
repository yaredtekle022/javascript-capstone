const apicom = 'https://themealdb.com/api/json/v1/1/filter.php?c=Seafood';
export default async function commentCounter(b) {
  const melsname = document.querySelector('.comment-pop');

  try {
    const response = await fetch(`${apicom}?item_id=item${b}`, { method: 'get' });
    const data = await response.json();
    const counternum = `<h2 class= 'comment-length'>Comments(${data.length})</h2>`;
    melsname.insertAdjacentHTML('beforeend', counternum);
    return data;
  } catch (e) {
    throw Error(e);
  }
}