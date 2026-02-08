import { test, expect } from "@playwright/test";
import { DataFactory } from "../../utilities/data-utility";

test.describe("DataFactory", () => {
  let dataFactory: DataFactory;

  test.beforeEach(() => {
    dataFactory = new DataFactory();
  });

  test.describe("candidate() - default values", () => {
    test("should generate all required fields", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.firstName).toBeDefined();
      expect(candidate.lastName).toBeDefined();
      expect(candidate.email).toBeDefined();
      expect(candidate.vacancy).toBeDefined();
    });

    test("should generate all optional fields with defaults", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.middleName).toBeDefined();
      expect(candidate.contactNumber).toBeDefined();
      expect(candidate.keywords).toBeDefined();
      expect(candidate.notes).toBeDefined();
      expect(candidate.resumePath).toBeDefined();
      expect(candidate.consent).toBeDefined();
    });

    test("should generate firstName as non-empty string", () => {
      const candidate = dataFactory.candidate();

      expect(typeof candidate.firstName).toBe("string");
      expect(candidate.firstName.length).toBeGreaterThan(0);
    });

    test("should generate lastName as non-empty string", () => {
      const candidate = dataFactory.candidate();

      expect(typeof candidate.lastName).toBe("string");
      expect(candidate.lastName.length).toBeGreaterThan(0);
    });

    test("should generate valid email format with automation.test domain", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.email).toMatch(/@automation\.test$/);
    });

    test("should generate contactNumber as 10-digit numeric string", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.contactNumber).toMatch(/^\d{10}$/);
    });

    test("should default vacancy to a valid option from vacancyList", () => {
      const candidate = dataFactory.candidate();
      const validVacancies = [
        "Junior Account Assistant",
        "Payroll Administrator",
        "Sales Representative",
        "Senior QA Lead",
        "Senior Support Specialist",
        "Software Engineer",
      ];

      expect(validVacancies).toContain(candidate.vacancy);
    });

    test("should generate keywords as comma-separated string", () => {
      const candidate = dataFactory.candidate();

      expect(typeof candidate.keywords).toBe("string");
      expect(candidate.keywords).toMatch(/,/);
    });

    test("should generate keywords as non-empty comma-separated words", () => {
      const candidate = dataFactory.candidate();
      const candidateKeywords = candidate.keywords!.split(", ");

      candidateKeywords.forEach((keyword) => {
        expect(typeof keyword).toBe("string");
        expect(keyword.length).toBeGreaterThan(0);
      });
    });

    test("should generate 2-4 keywords", () => {
      for (let i = 0; i < 10; i++) {
        const candidate = dataFactory.candidate();
        const keywordCount = candidate.keywords!.split(", ").length;

        expect(keywordCount).toBeGreaterThanOrEqual(2);
        expect(keywordCount).toBeLessThanOrEqual(4);
      }
    });

    test("should generate notes as non-empty string", () => {
      const candidate = dataFactory.candidate();

      expect(typeof candidate.notes).toBe("string");
      expect(candidate.notes!.length).toBeGreaterThan(0);
    });

    test("should generate valid resumePath pointing to resources folder", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.resumePath).toContain("resources");
      expect(candidate.resumePath).toContain("resume-1.pdf");
    });

    test("should default consent to false", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.consent).toBe(false);
    });

    test("should not include id by default", () => {
      const candidate = dataFactory.candidate();

      expect(candidate.id).toBeUndefined();
    });
  });

  test.describe("candidate() - with overrides", () => {
    test("should override firstName", () => {
      const candidate = dataFactory.candidate({ firstName: "CustomFirst" });

      expect(candidate.firstName).toBe("CustomFirst");
    });

    test("should override lastName", () => {
      const candidate = dataFactory.candidate({ lastName: "CustomLast" });

      expect(candidate.lastName).toBe("CustomLast");
    });

    test("should override middleName", () => {
      const candidate = dataFactory.candidate({ middleName: "CustomMiddle" });

      expect(candidate.middleName).toBe("CustomMiddle");
    });

    test("should override email", () => {
      const candidate = dataFactory.candidate({ email: "custom@test.com" });

      expect(candidate.email).toBe("custom@test.com");
    });

    test("should override contactNumber", () => {
      const candidate = dataFactory.candidate({ contactNumber: "1234567890" });

      expect(candidate.contactNumber).toBe("1234567890");
    });

    test("should override vacancy", () => {
      const candidate = dataFactory.candidate({ vacancy: "Senior QA Lead" });

      expect(candidate.vacancy).toBe("Senior QA Lead");
    });

    test("should override keywords", () => {
      const candidate = dataFactory.candidate({ keywords: "Manual, Custom" });

      expect(candidate.keywords).toBe("Manual, Custom");
    });

    test("should override notes", () => {
      const candidate = dataFactory.candidate({ notes: "Custom note" });

      expect(candidate.notes).toBe("Custom note");
    });

    test("should override resumePath", () => {
      const customPath = "/custom/path/resume.pdf";
      const candidate = dataFactory.candidate({ resumePath: customPath });

      expect(candidate.resumePath).toBe(customPath);
    });

    test("should override consent to true", () => {
      const candidate = dataFactory.candidate({ consent: true });

      expect(candidate.consent).toBe(true);
    });

    test("should not include id even when provided (source limitation)", () => {
      const candidate = dataFactory.candidate({ id: "candidate-123" });

      // Note: The DataFactory.candidate() method does not handle id overrides
      // This test documents the current behavior
      expect(candidate.id).toBeUndefined();
    });

    test("should allow partial overrides (keep defaults for others)", () => {
      const candidate = dataFactory.candidate({
        firstName: "John",
        lastName: "Doe",
      });

      const validVacancies = [
        "Junior Account Assistant",
        "Payroll Administrator",
        "Sales Representative",
        "Senior QA Lead",
        "Senior Support Specialist",
        "Software Engineer",
      ];

      expect(candidate.firstName).toBe("John");
      expect(candidate.lastName).toBe("Doe");
      expect(validVacancies).toContain(candidate.vacancy);
      expect(candidate.consent).toBe(false);
      expect(candidate.contactNumber).toMatch(/^\d{10}$/);
    });

    test("should allow overriding all CandidateData fields at once", () => {
      const fullOverride = {
        firstName: "TestFirst",
        middleName: "TestMiddle",
        lastName: "TestLast",
        email: "test@example.com",
        contactNumber: "9876543210",
        vacancy: "QA Manager",
        keywords: "Test, Override",
        notes: "Full override note",
        resumePath: "/override/resume.pdf",
        consent: true,
      };

      const candidate = dataFactory.candidate(fullOverride);

      expect(candidate.firstName).toBe(fullOverride.firstName);
      expect(candidate.middleName).toBe(fullOverride.middleName);
      expect(candidate.lastName).toBe(fullOverride.lastName);
      expect(candidate.email).toBe(fullOverride.email);
      expect(candidate.contactNumber).toBe(fullOverride.contactNumber);
      expect(candidate.vacancy).toBe(fullOverride.vacancy);
      expect(candidate.keywords).toBe(fullOverride.keywords);
      expect(candidate.notes).toBe(fullOverride.notes);
      expect(candidate.resumePath).toBe(fullOverride.resumePath);
      expect(candidate.consent).toBe(fullOverride.consent);
    });
  });

  test.describe("candidate() - uniqueness", () => {
    test("should generate unique candidates on each call", () => {
      const candidate1 = dataFactory.candidate();
      const candidate2 = dataFactory.candidate();

      expect(candidate1.email).not.toBe(candidate2.email);
    });
  });

  test.describe("candidate() - type conformance", () => {
    test("should return object conforming to TestCandidate interface", () => {
      const candidate = dataFactory.candidate();

      expect(typeof candidate.firstName).toBe("string");
      expect(typeof candidate.lastName).toBe("string");
      expect(typeof candidate.email).toBe("string");
      expect(typeof candidate.vacancy).toBe("string");
      expect(typeof candidate.middleName).toBe("string");
      expect(typeof candidate.contactNumber).toBe("string");
      expect(typeof candidate.keywords).toBe("string");
      expect(typeof candidate.notes).toBe("string");
      expect(typeof candidate.resumePath).toBe("string");
      expect(typeof candidate.consent).toBe("boolean");
    });
  });
});
