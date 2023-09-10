import { it, describe, expect } from "vitest";
import { extractPostData } from "./posts";

describe("extractPostData", () => {
  it("should return title and content of a form object", () => {
    const testTitle = "title";
    const testContent = "content";
    const testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };

    const data = extractPostData(testFormData);

    expect(data.title).toBe(testTitle);
  });
});
