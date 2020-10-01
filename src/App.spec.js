import getState from "./js/components/stateFromZip";
import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import Form from "./js/components/Form";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Test Zip", () => {
  test("It returns the correct state", () => {
    expect(getState("03103")).toBe("NH");
  });

  test('It doesnt only return "NH"', () => {
    expect(getState("00310")).toBe("PR");
  });
});

describe("Form", () => {
  test("Fetch", async () => {
    const fakeResponse = {
      main: { humidity: 78, temp: 70 },
      name: "Manchester",

      weather: [{ main: "clouds" }],

      sys: { sunrise: 1601462543, sunset: 1601504922 },
      filler: "should not show up in test",
    };

    global.fetch = jest.fn().mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse),
      };
      console.log(fetchResponse);
      return Promise.resolve(fetchResponse);
    });

    await act(async () => {
      render(<Form />, container);
    });

    expect(container.textContent).toBe(
      "Manchester, NH-333.67 °FcloudsHumidity: 78%Sunrise: 6:42 AMSunset: 6:28 PM"
    );

    global.fetch.mockClear();
    delete global.fetch;
  });
});
