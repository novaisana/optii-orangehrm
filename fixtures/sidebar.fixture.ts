import { test as base } from './login.fixture';
import { SidebarPage } from '../pages/sidebar.page';
import { DashboardPage } from '../pages/dashboard.page';

// Sidebar link test data based on Gherkin feature file
export interface SidebarLinkData {
  link_name: string;
  expected_page: string;
}

export const sidebarLinksTestData: SidebarLinkData[] = [
  { link_name: 'Admin', expected_page: 'System Users' },
  { link_name: 'PIM', expected_page: 'PIM' },
  { link_name: 'Leave', expected_page: 'Leave' },
  { link_name: 'Time', expected_page: 'Time' },
  { link_name: 'Recruitment', expected_page: 'Candidates' },
  { link_name: 'My Info', expected_page: 'My Info' },
  { link_name: 'Performance', expected_page: 'Performance' },
  { link_name: 'Dashboard', expected_page: 'Dashboard' },
  { link_name: 'Directory', expected_page: 'Directory' },
  { link_name: 'Maintenance', expected_page: 'Maintenance' },
  { link_name: 'Claim', expected_page: 'Claim' },
  { link_name: 'Buzz', expected_page: 'Buzz' }
];

export const sidebarSearchTestData: string[] = [
  'Admin',
  'PIM',
  'Leave',
  'Time',
  'Recruitment',
  'My Info',
  'Performance',
  'Dashboard',
  'Directory',
  'Maintenance',
  'Claim',
  'Buzz'
];

// Extended test fixtures
export const test = base.extend<{
  sidebarPage: SidebarPage;
  dashboardPage: DashboardPage;
}>({
  sidebarPage: async ({ authenticatedPage }, use) => {
    const sidebarPage = new SidebarPage(authenticatedPage);
    // Wait for dashboard to load after authentication
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.waitForPageLoad();
    await use(sidebarPage);
  },
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.waitForPageLoad();
    await use(dashboardPage);
  }
});

export { expect } from '@playwright/test';
