import { Page } from '@playwright/test';

export { expect } from '@playwright/test';

export function createPageInstance<T>(
  PageClass: new (page: Page) => T,
  page: Page
): T {
  return new PageClass(page);
}

export function extractProperty<T, K extends keyof T>(
  items: T[],
  key: K
): T[K][] {
  return items.map(item => item[key]);
}
