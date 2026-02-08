import { test } from "../fixtures/recruitment.fixture";

test.describe(
  "Feature: Recruitment",
  { tag: ["@regression", "@recruitment"] },
  () => {
    test.beforeEach(async ({ recruitmentPage }) => {
      await recruitmentPage.navigateToRecruitmentFromSidebar();
    });

    test("Add a new candidate", async ({
      recruitmentPage,
      testCandidate,
      cleanup,
    }) => {
      cleanup.registerEntity(testCandidate, (c) =>
        recruitmentPage.cleanupCandidate(c),
      );
      await recruitmentPage.clickAddCandidate();
      await recruitmentPage.verifyAddCandidateFormDisplayed();
      await recruitmentPage.addCandidate(testCandidate);
      await recruitmentPage.verifyCandidateInformationPage(testCandidate);
      await cleanup.runAll();
    });

    test("View candidate list", async ({ recruitmentPage }) => {
      await recruitmentPage.waitForCandidatesListPage();
      await recruitmentPage.verifyCandidatesTableVisible();
      await recruitmentPage.verifyFilterOptionsAvailable();
      await recruitmentPage.verifyCandidateTableDisplay();
    });

    test("Verify if candidate is searchable", async ({
      recruitmentPage,
      testCandidate,
      cleanup,
    }) => {
      cleanup.registerEntity(testCandidate, (c) =>
        recruitmentPage.cleanupCandidate(c),
      );
      await recruitmentPage.waitForCandidatesListPage();
      await recruitmentPage.clickAddCandidate();
      await recruitmentPage.addCandidate(testCandidate);
      await recruitmentPage.searchCandidateByName(testCandidate.fullName);
      await recruitmentPage.verifyCandidateDisplayedInList(testCandidate.fullName);
      await cleanup.runAll();
    });
  },
);
