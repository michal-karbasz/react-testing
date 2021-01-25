const { expect, it } = require("@jest/globals");
const fetch = require("node-fetch");
const swapi = require("./getPeople");
// with async testing the test will resolve to true
// just by completing the fetch, we can use done
// or return promise

// it("calls swapi to get people", (done) => {
//   expect.assertions(1);
//   swapi.getPeople(fetch).then((data) => {
//     expect(data.count).toEqual(82);
//     done();
//   });
// });

it("calls swapi to get people", () => {
  expect.assertions(2);
  return swapi.getPeople(fetch).then((data) => {
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

// spy func
it("getPeople returns count and results", () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 82,
          results: [1, 2, 3, 4, 5],
        }),
    })
  );

  expect.assertions(4);
  return swapi.getPeople(mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith("https://swapi.dev/api/people");
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
