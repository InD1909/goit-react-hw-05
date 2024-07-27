const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w300";

const getImageUrl = (path) => {
  return `${BASE_IMAGE_URL}${path}`;
};

export default getImageUrl;

const BASE_ACTOR_URL = `https://image.tmdb.org/t/p`;

export const getActorUrl = (path) => {
  return `${BASE_ACTOR_URL}${path}`;
};
