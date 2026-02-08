import { test as cleanupTest } from './cleanup.fixture';
import { RecruitmentPage } from '../pages/recruitment.page';
import { DataFactory, TestCandidate } from '../utilities/data-utility';

export interface RecruitmentTestData {
  validCandidate: TestCandidate;
}

const dataFactory = new DataFactory();
export const recruitmentTestData: RecruitmentTestData = {
  validCandidate: dataFactory.candidate({ vacancy: 'Software Engineer' })
};

type RecruitmentFixtures = {
  recruitmentPage: RecruitmentPage;
};

export const test = cleanupTest.extend<RecruitmentFixtures>({
  recruitmentPage: async ({ authenticatedPage }, use) => {
    const recruitmentPage = new RecruitmentPage(authenticatedPage);
    await use(recruitmentPage);
  }
});

export { TestCandidate } from '../utilities/data-utility';
