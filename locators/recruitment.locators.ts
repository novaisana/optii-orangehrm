import { Page } from '@playwright/test';

export class RecruitmentLocators {
  constructor(private page: Page) {}

  get pageHeading() {
    return this.page.getByRole('heading', { name: 'Recruitment' });
  }

  get addCandidateButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  get candidatesTable() {
    return this.page.locator('.oxd-table');
  }

  get tableHeaders() {
    return this.page.locator('.oxd-table-header-cell');
  }

  get filterSection() {
    return this.page.locator('.oxd-table-filter');
  }

  get searchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }

  get resetButton() {
    return this.page.getByRole('button', { name: 'Reset' });
  }

  get candidateNameInput() {
    return this.page.getByPlaceholder('Type for hints...');
  }

  get candidateNameFilterInput() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: 'Job Title' }).locator('.oxd-select-text');
  }

  get jobTittle() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: 'Job Title' }).locator('.oxd-select-text');
  }

  get vacancy() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: /^Vacancy/ }).locator('.oxd-select-text');
  }

  get hiringManager() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: 'Hiring Manager' }).locator('.oxd-select-text');
  }

  get status() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: /^Status/ }).locator('.oxd-select-text');
  }

  get candidateKeywords() {
    return this.filterSection.getByPlaceholder('Enter comma seperated words...');
  }

  get dateOfApplication() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: 'Date of Application' });
  }

  get methodApplication() {
    return this.filterSection.locator('.oxd-grid-item').filter({ hasText: 'Method of Application' }).locator('.oxd-select-text');
  }

  get addCandidateForm() {
    return this.page.locator('form');
  }

  get firstNameInput() {
    return this.page.getByPlaceholder('First Name');
  }

  get middleNameInput() {
    return this.page.getByPlaceholder('Middle Name');
  }

  get lastNameInput() {
    return this.page.getByPlaceholder('Last Name');
  }

  get emailInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Email/ }).locator('input');
  }

  get contactNumberInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Contact Number/ }).locator('input');
  }

  get vacancyDropdownForm() {
    return this.page.locator('.oxd-select-text-input');
  }

  get keywordsInput() {
    return this.page.getByPlaceholder('Enter comma seperated words...');
  }

  get notesTextarea() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Notes/ }).locator('textarea');
  }

  get consentCheckbox() {
    return this.page.locator('.oxd-input-group').filter({ hasText: 'Consent to keep data' }).locator('.oxd-checkbox-wrapper label');
  }

  get resumeFileInput() {
    return this.page.locator('input[type="file"]');
  }

  get resumeUploadContainer() {
    return this.page.locator('.oxd-file-input-div');
  }

  get dateOfApplicationInput() {
    return this.page.getByPlaceholder('yyyy-dd-mm');
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save', exact: true });
  }

  get cancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  get successMessage() {
    return this.page.locator('.oxd-toast-content--success');
  }

  getCandidateRowByName(name: string) {
    return this.page.locator('.oxd-table-card').filter({ hasText: name });
  }

  getDeleteButton(candidateName: string) {
    return this.getCandidateRowByName(candidateName)
      .locator('.oxd-table-cell-actions button')
      .filter({ has: this.page.locator('i.oxd-icon-trash, i.bi-trash') })
      .first();
  }
  
  get confirmDeleteButton() {
    return this.page.getByRole('button', { name: 'Yes, Delete' });
  }

  get candidateInfoCard() {
    return this.page.locator('.orangehrm-card-container').first();
  }

  get candidateNameDisplay() {
    return this.candidateInfoCard.locator('.orangehrm-recruitment-card-profile-header p').first();
  }

  get candidateVacancyDisplay() {
    return this.candidateInfoCard.locator('.orangehrm-recruitment-card-profile-header p').nth(1);
  }

  get candidateHiringManagerDisplay() {
    return this.candidateInfoCard.locator('.orangehrm-recruitment-card-profile-header p').nth(2);
  }
  

  get candidateStatusDisplay() {
    return this.candidateInfoCard.locator('p').filter({ hasText: 'Status:' });
  }

  get candidateApplicationStageHeading() {
    return this.page.getByRole('heading', { name: 'Application Stage' });
  }

  get candidateProfileHeading() {
    return this.page.getByRole('heading', { name: 'Candidate Profile' });
  }

  get candidateHistoryHeading() {
    return this.page.getByRole('heading', { name: 'Candidate History' });
  }
 
  get candidateEmailInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Email/ }).locator('input');
  }

  get candidateContactInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Contact Number/ }).locator('input');
  }

  get candidateKeywordsInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Keywords/ }).locator('input');
  }

  get candidateNotesInput() {
    return this.page.locator('.oxd-input-group').filter({ hasText: /^Notes/ }).locator('textarea');
  }

}
