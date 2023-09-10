import { it, describe, expect, vi } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

const responseData = { key: "value" };

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      reject("Not a string");
    }
    const testResponse = {
      ok: true,
      json: () => {
        return new Promise((resolve, reject) => {
          resolve(responseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);

describe("sendDataRequest fn", () => {
  it("should return any available response data", () => {
    const data = { key: "test" };

    expect(sendDataRequest(data)).resolves.toEqual(responseData);
  });

  it("should convert the provided data to JSON before sending the request", async () => {
    const data = { key: "test" };
    let errorMessage;

    try {
      await sendDataRequest(data);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).not.toBe("Not a string");
  });

  it("should throw HttpError if the response is a non-ok", () => {
    const data = { key: "test" };

    testFetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        const testResponse = {
          ok: false,
          json: () => {
            return new Promise((resolve, reject) => {
              resolve(responseData);
            });
          },
        };
        resolve(testResponse);
      });
    });

    return expect(sendDataRequest(data)).rejects.toBeInstanceOf(HttpError);
  });
});
