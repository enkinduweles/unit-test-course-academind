import { it, describe, expect } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("Class HttpError", () => {
  it("should contain the provided status code, message and data", () => {
    const status = 200;
    const message = "message";
    const data = { key: "value" };

    const httpError = new HttpError(status, message, data);

    expect(httpError.statusCode).toBe(status);
    expect(httpError.message).toBe(message);
    expect(httpError.data).toBe(data);
  });

  it("should contain undefined as data if no data is provided", () => {
    const status = 200;
    const message = "message";

    const httpError = new HttpError(status, message);

    expect(httpError.statusCode).toBe(status);
    expect(httpError.message).toBe(message);
    expect(httpError.data).toBeUndefined();
  });
});

describe("Class ValidationError", () => {
  it("should contain the provided message", () => {
    const message = "message";

    const validationError = new ValidationError(message);

    expect(validationError.message).toBe(message);
  });
});
