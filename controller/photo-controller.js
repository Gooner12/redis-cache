const axios = require("axios");
const getOrSetCache = require("../util/cache-handler");

const getPhotos = async (req, res) => {
  try {
    const albumId = req.query.album_id;
    const response = await getOrSetCache(
      `photos?album_id=${albumId}`,
      async () => {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos",
          {
            params: { albumId },
          }
        );
        return data;
      }
    );
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getSinglePhoto = async (req, res) => {
  const response = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });
  res.status(200).json(response);
};

module.exports = {getPhotos, getSinglePhoto};
