const createNewLike = async (id) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Y1Ocl2k5LoJdVEhHia5O/likes';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });

  if (!res.ok && res.status !== 201) {
    return 0;
  }

  const resp = await fetch(url);
  const result = await resp.json();
  const likeData = result.find((item) => item.item_id === id);
  if (likeData) {
    return likeData.likes;
  }

  // Add a return statement here
  return undefined;
};

export default createNewLike;
