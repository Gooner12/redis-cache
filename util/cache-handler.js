const Redis = require("redis");

const DEFAULT_EXPIRATION = 3600;
const REDIS_URL = "redis://localhost:6379";

const client = Redis.createClient({ url: REDIS_URL });
const connectClient = async () => {
  await client.connect();
};
connectClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client Connected"));

// using async await
function getOrSetCache(key, callBack) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.get(key);
      if (data != null) return resolve(data);
      const newData = await callBack();
      client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(newData));
      resolve(newData);
    } catch (error) {
      reject(error);
    }
  });
}

// using promise
function getOrSetCache(key, callBack) {
  return new Promise((resolve, reject) => {
    client
      .get(key)
      .then(async (data) => {
        if (data != null) return resolve(data);
        const newData = await callBack();
        client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(newData));
        resolve(newData);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

module.exports = getOrSetCache;
