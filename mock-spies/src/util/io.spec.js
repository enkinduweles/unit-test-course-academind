import { it, expect, vi } from "vitest";
import { promises as fs } from "fs";
import writeData from "./io";

vi.mock("fs");
vi.mock("path", () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1];
      },
    },
  };
});

it("should execute the writeFile method", () => {
  const testData = "Hello world";
  const testFilename = "test.txt";

  return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});
