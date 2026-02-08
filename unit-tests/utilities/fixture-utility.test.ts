import { test, expect } from "@playwright/test";
import {
  createPageInstance,
  extractProperty,
} from "../../utilities/fixture-utility";
import type { Page } from "@playwright/test";

class MockPageObject {
  constructor(public page: Page) {}

  getUrl(): string {
    return "mock-url";
  }
}

class AnotherMockPage {
  public readonly pageName = "AnotherMock";

  constructor(public page: Page) {}
}

test.describe("fixture-utility", () => {
  test.describe("createPageInstance()", () => {
    test("should create instance of provided PageClass", () => {
      const mockPage = {} as Page;

      const instance = createPageInstance(MockPageObject, mockPage);

      expect(instance).toBeInstanceOf(MockPageObject);
    });

    test("should pass page to constructor", () => {
      const mockPage = { url: () => "test-url" } as unknown as Page;

      const instance = createPageInstance(MockPageObject, mockPage);

      expect(instance.page).toBe(mockPage);
    });

    test("should work with different page object classes", () => {
      const mockPage = {} as Page;

      const instance1 = createPageInstance(MockPageObject, mockPage);
      const instance2 = createPageInstance(AnotherMockPage, mockPage);

      expect(instance1).toBeInstanceOf(MockPageObject);
      expect(instance2).toBeInstanceOf(AnotherMockPage);
      expect(instance2.pageName).toBe("AnotherMock");
    });

    test("should allow calling methods on created instance", () => {
      const mockPage = {} as Page;

      const instance = createPageInstance(MockPageObject, mockPage);

      expect(instance.getUrl()).toBe("mock-url");
    });
  });

  test.describe("extractProperty()", () => {
    test("should extract single property from array of objects", () => {
      const items = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ];

      const ids = extractProperty(items, "id");

      expect(ids).toEqual([1, 2, 3]);
    });

    test("should extract string property", () => {
      const items = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ];

      const names = extractProperty(items, "name");

      expect(names).toEqual(["Alice", "Bob"]);
    });

    test("should return empty array for empty input", () => {
      const items: { id: number }[] = [];

      const result = extractProperty(items, "id");

      expect(result).toEqual([]);
    });

    test("should work with single item array", () => {
      const items = [{ value: "only-one" }];

      const result = extractProperty(items, "value");

      expect(result).toEqual(["only-one"]);
    });

    test("should preserve undefined values", () => {
      const items: { id: number; optional?: string }[] = [
        { id: 1, optional: "has-value" },
        { id: 2, optional: undefined },
        { id: 3, optional: "also-has" },
      ];

      const result = extractProperty(items, "optional");

      expect(result).toEqual(["has-value", undefined, "also-has"]);
    });

    test("should preserve null values", () => {
      const items: { id: number; nullable: string | null }[] = [
        { id: 1, nullable: "value" },
        { id: 2, nullable: null },
      ];

      const result = extractProperty(items, "nullable");

      expect(result).toEqual(["value", null]);
    });

    test("should work with nested objects as values", () => {
      const nested1 = { deep: "value1" };
      const nested2 = { deep: "value2" };
      const items = [
        { id: 1, nested: nested1 },
        { id: 2, nested: nested2 },
      ];

      const result = extractProperty(items, "nested");

      expect(result).toEqual([nested1, nested2]);
      expect(result[0]).toBe(nested1);
    });

    test("should work with boolean values", () => {
      const items = [
        { id: 1, active: true },
        { id: 2, active: false },
        { id: 3, active: true },
      ];

      const result = extractProperty(items, "active");

      expect(result).toEqual([true, false, true]);
    });

    test("should maintain order of items", () => {
      const items = [{ order: 3 }, { order: 1 }, { order: 4 }, { order: 2 }];

      const result = extractProperty(items, "order");

      expect(result).toEqual([3, 1, 4, 2]);
    });

    test("should work with array values", () => {
      const items = [
        { id: 1, tags: ["a", "b"] },
        { id: 2, tags: ["c"] },
      ];

      const result = extractProperty(items, "tags");

      expect(result).toEqual([["a", "b"], ["c"]]);
    });
  });
});
