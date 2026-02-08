import { test, generateUniqueCandidate, recruitmentTestData } from '../fixtures/recruitment.fixture';

test.describe('Feature: Recruitment', { tag: ['@regression', '@recruitment'] }, () => {
  test.beforeEach(async ({ authenticatedPage, recruitmentPage }) => {
    await recruitmentPage.navigateToRecruitmentFromSidebar();
  });

  test('Add a new candidate', async ({ recruitmentPage, candidatesCreated }) => {
     const testCandidate = generateUniqueCandidate({
      firstName: 'newCandidate',
      lastName: 'AutoCandidate',
      vacancy: 'Senior QA Lead'
    });

    candidatesCreated.push(testCandidate);

    await recruitmentPage.clickAddCandidate();
    await recruitmentPage.verifyAddCandidateFormDisplayed();
    await recruitmentPage.addCandidate(testCandidate);
    await recruitmentPage.verifyCandidateInformationPage(testCandidate);

  });

  test('View candidate list', async ({ recruitmentPage }) => {

    await recruitmentPage.waitForCandidatesListPage();
    await recruitmentPage.verifyCandidatesTableVisible();
    await recruitmentPage.verifyFilterOptionsAvailable();
    await recruitmentPage.verifyCandidateTableDisplay();

  });

  test('Verify if candidate is searchable', async ({ recruitmentPage, candidatesCreated }) => {
 
    const testCandidate = generateUniqueCandidate({
      firstName: 'SearchTest',
      lastName: 'AutoCandidate',
      vacancy: 'Software Engineer'
    });

    const candidateFullName = recruitmentPage.getCandidateFullName(testCandidate);
    candidatesCreated.push(testCandidate);

    await recruitmentPage.waitForCandidatesListPage();
    await recruitmentPage.clickAddCandidate();
    await recruitmentPage.addCandidate(testCandidate);
    await recruitmentPage.searchCandidateByName(candidateFullName);
    await recruitmentPage.verifyCandidateDisplayedInList(candidateFullName);

  });
});
