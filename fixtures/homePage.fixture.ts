import { test as loginTest } from './login.fixture';
import { DashboardPage, WidgetType } from '../pages/dashboard.page';

export interface WidgetTestData {
  widget_name: string;
  widget_type: WidgetType;
}

export const widgetTestData: WidgetTestData[] = [
  { widget_name: 'Time at Work', widget_type: 'widget' },
  { widget_name: 'My Actions', widget_type: 'widget' },
  { widget_name: 'Quick Launch', widget_type: 'section' },
  { widget_name: 'Buzz Latest Posts', widget_type: 'widget' },
  { widget_name: 'Employees on Leave Today', widget_type: 'widget' },
  { widget_name: 'Employee Distribution by Sub Unit', widget_type: 'widget' }
];

export const test = loginTest.extend<{ dashboardPage: DashboardPage }>({
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
