
let API_URL = "localhost:4000";

if (process.env.NODE_ENV === 'production') {
  API_URL = "catapi-telia.herokuapp.com";
}

export {
  API_URL
};
