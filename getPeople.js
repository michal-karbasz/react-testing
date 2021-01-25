const fetch = require("node-fetch");

const getPeople = async (fetch) => {
  const getRequest = await fetch("https://swapi.dev/api/people");
  const data = await getRequest.json();
  //   console.log(data);
  return {
    count: data.count,
    results: data.results,
  };
};

getPeople(fetch);

module.exports = {
  getPeople,
};
