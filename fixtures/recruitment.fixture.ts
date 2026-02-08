import { test as authTest } from './login.fixture';
import { RecruitmentPage, CandidateData } from '../pages/recruitment.page';
import path from 'path';

export interface TestCandidate extends CandidateData {
  id?: string;
}

export interface RecruitmentTestData {
  validCandidate: TestCandidate;
}

// Test data for recruitment scenarios
export const recruitmentTestData: RecruitmentTestData = {
  validCandidate: {
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    email: 'john.doe.test@example.com',
    contactNumber: '1234567890',
    vacancy: 'Software Engineer',
    keywords: 'Java, Python, Testing',
    notes: 'Test candidate created by automation',
    consent: false
  }
};

// Extended fixtures for recruitment tests
type RecruitmentFixtures = {
  recruitmentPage: RecruitmentPage;
  candidatesCreated: TestCandidate[];
};

export const test = authTest.extend<RecruitmentFixtures>({
  recruitmentPage: async ({ authenticatedPage }, use) => {
    const recruitmentPage = new RecruitmentPage(authenticatedPage);
    await use(recruitmentPage);
  },

  candidatesCreated: async ({ authenticatedPage, recruitmentPage }, use) => {
    const candidates: TestCandidate[] = [];

    await use(candidates);

    // Cleanup: Delete all candidates created during the test
    if (candidates.length > 0) {
      console.log(`Cleaning up ${candidates.length} test candidates...`);

      try {
        // Navigate to recruitment module
        await recruitmentPage.navigateToRecruitmentFromSidebar();

        // Delete each candidate
        for (const candidate of candidates) {
          const fullName = recruitmentPage.getCandidateFullName(candidate);

          try {
            // Search for the candidate
            await recruitmentPage.searchCandidateByName(fullName);

            // Delete if found
            await recruitmentPage.deleteCandidate(fullName);
            console.log(`Deleted candidate: ${fullName}`);
          } catch (error) {
            console.warn(`Could not delete candidate ${fullName}:`, error);
          }

          // Reset filters for next deletion
          await recruitmentPage.resetFilters();
        }

        console.log('Cleanup completed successfully');
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    }
  }
});

// Helper function to create a unique candidate for testing
export function generateUniqueCandidate(baseData: Partial<TestCandidate> = {}): TestCandidate {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 10000);

  return {
    firstName: baseData.firstName || `TestUser${randomId}`,
    middleName: baseData.middleName,
    lastName: baseData.lastName || `AutoTest${randomId}`,
    email: baseData.email || `test.user.${randomId}@automation.test`,
    contactNumber: baseData.contactNumber,
    vacancy: baseData.vacancy || 'Software Engineer',
    keywords: baseData.keywords,
    notes: baseData.notes || `Automated test candidate created at ${new Date().toISOString()}`,
    resumePath: baseData.resumePath || path.resolve(__dirname, '../resources/resume-1.pdf'),
    consent: baseData.consent ?? false
  };
}

export { expect } from '@playwright/test';
