import { test, expect, sidebarLinksTestData, sidebarSearchTestData } from '../fixtures/sidebar.fixture';

test.describe('Feature: Sidebar Navigation', { tag: ['@smoke', '@regression', '@sidebar'] }, () => {

  test.describe('Verify all sidebar hyperlinks are accessible', () => {
    test.beforeEach(async ({ sidebarPage }) => {
      await sidebarPage.verifySidebarIsVisible();
    });

    for (const { link_name, expected_page } of sidebarLinksTestData) {
      test(`Navigate to "${link_name}" and verify "${expected_page}" page loads correctly`, async ({
        sidebarPage
      }) => {

        await sidebarPage.clickSidebarLink(link_name);
        await sidebarPage.verifyPageLoadedCorrectly(link_name);

      });
    }
  });

  test.describe('Verify sidebar search functionality works', () => {
    for (const link_name of sidebarSearchTestData) {
      test(`Search for "${link_name}" in sidebar and verify it is displayed`, async ({
        sidebarPage
      }) => {

        await sidebarPage.verifySidebarIsVisible();
        await sidebarPage.searchInSidebar(link_name);
        await sidebarPage.verifySearchFilterWorks(link_name);
        await sidebarPage.verifyLinkIsDisplayed(link_name);
        await sidebarPage.clearSearch();
        
      });
    }
  });
});
