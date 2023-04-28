const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/TePAWbpwiBHr7xSY6An3/comments';

export const sendData = async (id, name, message) => {
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: `${id}`,
      username: `${name}`,
      comment: `${message}`,
    }),
  });
  return request;
  // const response = await request.text()
  // console.log(response)
};
sendData();

export const getData = async (id) => {
  const request = await fetch(`${url}?item_id=${id}`);
  const response = request.json();
  return response;
};

export const counter = async (id) => {
  const Count = await getData(id);
  return Count.length;
};