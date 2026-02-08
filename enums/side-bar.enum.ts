export interface SidebarUrlData {
  link_name: string;
  expected_page: string;
}

export const sidebarUrlsLinksTestData: SidebarUrlData[] = [
  { link_name: 'Admin', expected_page: 'System Users' },
  { link_name: 'PIM', expected_page: 'PIM' },
  { link_name: 'My Info', expected_page: 'My Info' },
  { link_name: 'Dashboard', expected_page: 'Dashboard' },
  { link_name: 'Maintenance', expected_page: 'Maintenance' },
  { link_name: 'Claim', expected_page: 'Claim' },
  { link_name: 'Buzz', expected_page: 'Buzz' }
];

export const pagesUrlPath: Record<string, { heading: string; urlPattern: RegExp; exactMatch?: boolean; useUrlVerification?: boolean }> = {
  'Admin': { heading: 'System Users', urlPattern: /.*\/admin\/viewSystemUsers$/ },
  'PIM': { heading: 'Employee Information', urlPattern: /.*\/pim\/viewEmployeeList$/ },
  'My Info': { heading: 'Personal Details', urlPattern: /.*\/pim\/viewPersonalDetails\/empNumber\/\d+$/ },
  'Dashboard': { heading: 'Dashboard', urlPattern: /.*\/dashboard\/index$/, exactMatch: true },
  'Maintenance': { heading: 'Purge Records', urlPattern: /.*\/maintenance\/purgeEmployee$/ },
  'Claim': { heading: 'Claim', urlPattern: /.*\/claim\/viewAssignClaim$/, useUrlVerification: true },
  'Buzz': { heading: 'Buzz', urlPattern: /.*\/buzz\/viewBuzz$/, exactMatch: true }
};