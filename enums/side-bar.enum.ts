export interface SidebarUrlData {
  link_name: string;
  expected_page: string;
}

export const sidebarUrlsLinksTestData: SidebarUrlData[] = [
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

export const pagesUrlPath: Record<
  string,
  {
    heading: string;
    urlPattern: RegExp;
    exactMatch?: boolean;
    useUrlVerification?: boolean;
  }
> = {
  'Admin': { heading: 'System Users', urlPattern: /.*\/admin\/viewSystemUsers$/ },
  'PIM': { heading: 'Employee Information', urlPattern: /.*\/pim\/viewEmployeeList$/ },
  'Leave': { heading: 'Leave List', urlPattern: /.*\/leave\/viewLeaveList$/ },
  'Time': { heading: 'Select Employee', urlPattern: /.*\/time\/viewEmployeeTimesheet$/ },
  'Recruitment': { heading: 'Candidates', urlPattern: /.*\/recruitment\/viewCandidates$/ },
  'My Info': { heading: 'Personal Details', urlPattern: /.*\/pim\/viewPersonalDetails\/empNumber\/\d+$/ },
  'Performance': { heading: 'Manage Reviews', urlPattern: /.*\/performance\/searchEvaluatePerformanceReview$/ },
  'Dashboard': { heading: 'Dashboard', urlPattern: /.*\/dashboard\/index$/, exactMatch: true },
  'Directory': { heading: 'Directory', urlPattern: /.*\/directory\/viewDirectory$/, useUrlVerification: true },
  'Maintenance': { heading: 'Purge Records', urlPattern: /.*\/maintenance\/purgeEmployee$/ },
  'Claim': { heading: 'Claim', urlPattern: /.*\/claim\/viewAssignClaim$/, useUrlVerification: true },
  'Buzz': { heading: 'Buzz', urlPattern: /.*\/buzz\/viewBuzz$/, exactMatch: true }

};
