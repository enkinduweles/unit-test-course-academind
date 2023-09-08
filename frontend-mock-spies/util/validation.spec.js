import { it, describe, expect } from "vitest";
import { validateNotEmpty } from "./validation";

describe("validateNotEmpty fn", () => {
  it("should throw an error if an empty string is provided", () => {
    const text = "";

    const validateNotEmptyWrapper = () => validateNotEmpty(text);

    expect(validateNotEmptyWrapper).toThrow();
  });

  it("should throw an error if no text to validate is provided", () => {
    const validateNotEmptyWrapper = () => validateNotEmpty();

    expect(validateNotEmptyWrapper).toThrow();
  });

  it("should throw an error with custom message if a message is provided", () => {
    const text = "";
    const errorMessage = "error";

    const validateNotEmptyWrapper = () => validateNotEmpty(text, errorMessage);

    expect(validateNotEmptyWrapper).toThrow(errorMessage);
  });
});
