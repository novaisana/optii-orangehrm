import { Page, expect } from '@playwright/test';
import { RecruitmentLocators } from '../locators/recruitment.locators';

export interface CandidateData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  vacancy: string;
  keywords?: string;
  notes?: string;
  dateOfApplication?: string;
  resumePath?: string;
  consent?: boolean;
}

export class RecruitmentPage {
  private locators: RecruitmentLocators;
  private readonly listUrl = /.*\/recruitment\/viewCandidates$/;
  private readonly addUrl = /.*\/recruitment\/addCandidate$/;

  constructor(private page: Page) {
    this.locators = new RecruitmentLocators(page);
  }

  async navigateToRecruitmentFromSidebar(): Promise<void> {
    await this.page.getByRole('link', { name: 'Recruitment' }).click();
    await this.waitForCandidatesListPage();
  }

  async waitForCandidatesListPage(): Promise<void> {
    await this.page.waitForURL(this.listUrl);
    await this.page.waitForLoadState('domcontentloaded');
    await this.locators.pageHeading.waitFor({ state: 'visible', timeout: 15000 });
  }

  async waitForAddCandidatePage(): Promise<void> {
    await this.page.waitForURL(this.addUrl);
    await this.locators.addCandidateForm.waitFor({ state: 'visible' });
  }

  // Candidates List Page methods
  async clickAddCandidate(): Promise<void> {
    await this.locators.addCandidateButton.click();
    await this.waitForAddCandidatePage();
  }

  async verifyCandidatesTableVisible(): Promise<void> {
    await expect(this.locators.candidatesTable).toBeVisible();
  }

  async verifyFilterOptionsAvailable(): Promise<void> {
    await expect(this.locators.filterSection).toBeVisible();
    await expect(this.locators.candidateNameInput).toBeVisible();
    await expect(this.locators.jobTittle).toBeVisible();
    await expect(this.locators.vacancy).toBeVisible();
    await expect(this.locators.hiringManager).toBeVisible();
    await expect(this.locators.status).toBeVisible();
    await expect(this.locators.dateOfApplication).toBeVisible();
    await expect(this.locators.candidateKeywords).toBeVisible();
    await expect(this.locators.methodApplication).toBeVisible();
    await expect(this.locators.searchButton).toBeVisible();
    await expect(this.locators.resetButton).toBeVisible();
  }

  async verifyCandidateTableDisplay(): Promise<void> {

    await expect(this.locators.candidatesTable).toBeVisible();
    await expect(this.locators.addCandidateButton).toBeVisible();
    await expect(this.locators.tableHeaders).not.toHaveCount(0);
    await expect(this.locators.tableHeaders.filter({ hasText: 'Candidate' })).toBeVisible();
    await expect(this.locators.tableHeaders.filter({ hasText: 'Vacancy' })).toBeVisible();
    await expect(this.locators.tableHeaders.filter({ hasText: 'Hiring Manager' })).toBeVisible();
    await expect(this.locators.tableHeaders.filter({ hasText: 'Status' })).toBeVisible();
    await expect(this.locators.tableHeaders.filter({ hasText: 'Date of Application' })).toBeVisible();
    
  }

  async verifyAddCandidateFormDisplayed(): Promise<void> {
    await expect(this.locators.addCandidateForm).toBeVisible();
  }

  async verifyFullNameFieldExists(): Promise<void> {
    await expect(this.locators.firstNameInput).toBeVisible();
    await expect(this.locators.lastNameInput).toBeVisible();
  }

  async verifyEmailFieldExists(): Promise<void> {
    await expect(this.locators.emailInput).toBeVisible();
  }

  async verifyVacancyFieldExists(): Promise<void> {
    await expect(this.locators.vacancyDropdownForm).toBeVisible();
  }

  async verifyResumeUploadFieldExists(): Promise<void> {
    await expect(this.locators.resumeUploadContainer).toBeVisible();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
  }

  async fillMiddleName(middleName: string): Promise<void> {
    await this.locators.middleNameInput.fill(middleName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.locators.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.locators.emailInput.fill(email);
  }

  async fillContactNumber(contactNumber: string): Promise<void> {
    await this.locators.contactNumberInput.fill(contactNumber);
  }

  async selectVacancy(vacancy: string): Promise<void> {
    await this.locators.vacancyDropdownForm.click();
    await this.page.getByRole('option', { name: vacancy }).click();
  }

  async fillKeywords(keywords: string): Promise<void> {
    await this.locators.keywordsInput.fill(keywords);
  }

  async fillNotes(notes: string): Promise<void> {
    await this.locators.notesTextarea.fill(notes);
  }

  async uploadResume(filePath: string): Promise<void> {
    await this.locators.resumeFileInput.setInputFiles(filePath);
  }

  async toggleConsent(): Promise<void> {
    await this.locators.consentCheckbox.click();
  }

  async fillDateOfApplication(date: string): Promise<void> {
    await this.locators.dateOfApplicationInput.fill(date);
  }

  async clickSave(): Promise<void> {
    await this.locators.saveButton.click();
  }

  async awaitForCandidateInformationPage(): Promise<void> {
    await this.page.waitForURL(/.*\/recruitment\/addCandidate\/\d+/);

  }

  async clickCancel(): Promise<void> {
    await this.locators.cancelButton.click();
  }

  async verifyIfCandidateInformationIsFilled(candidateData: CandidateData): Promise<void> {
    await expect(this.locators.firstNameInput).toHaveValue(candidateData.firstName);
    await expect(this.locators.middleNameInput).toHaveValue(candidateData.middleName ?? '');
    await expect(this.locators.lastNameInput).toHaveValue(candidateData.lastName);
    await expect(this.locators.emailInput).toHaveValue(candidateData.email);
    await expect(this.locators.contactNumberInput).toHaveValue(candidateData.contactNumber ?? '');
    await expect(this.locators.vacancyDropdownForm).toHaveText(candidateData.vacancy);
    await expect(this.locators.keywordsInput).toHaveValue(candidateData.keywords ?? '');
    await expect(this.locators.notesTextarea).toHaveValue(candidateData.notes ?? '');
    if (candidateData.consent === true) {
      await expect(this.locators.consentCheckbox).toBeChecked();
    } else {
      await expect(this.locators.consentCheckbox).not.toBeChecked();
    }
  }

  async addCandidate(candidateData: CandidateData): Promise<void> {

    if (candidateData.firstName || candidateData.middleName || candidateData.lastName || candidateData.contactNumber || candidateData.email || candidateData.vacancy || candidateData.resumePath || candidateData.dateOfApplication || candidateData.consent != null) {
      await this.fillFirstName(candidateData.firstName);
      await this.fillMiddleName(candidateData.middleName ?? '');
      await this.fillLastName(candidateData.lastName);
      await this.fillEmail(candidateData.email);
      await this.selectVacancy(candidateData.vacancy);
      await this.fillContactNumber(candidateData.contactNumber ?? '');
      await this.fillKeywords(candidateData.keywords ?? '');
      await this.fillNotes(candidateData.notes ?? '');
      await this.uploadResume(candidateData.resumePath ?? '');
      await this.fillDateOfApplication(candidateData.dateOfApplication ?? '');

      if (candidateData.consent === true) {
        await this.toggleConsent();
      }
    }
    await this.verifyIfCandidateInformationIsFilled(candidateData);
    await this.clickSave();
    await this.awaitForCandidateInformationPage();
  }

  async verifyCandidateInformationPage(candidateData: CandidateData): Promise<void> {

    await expect(this.locators.candidateApplicationStageHeading).toBeVisible();
    await expect(this.locators.candidateProfileHeading).toBeVisible();
    await expect(this.locators.candidateHistoryHeading).toBeVisible();
    const expectedFullName = this.getCandidateFullName(candidateData);
    await expect(this.locators.candidateNameDisplay).toHaveText(expectedFullName);
    await expect(this.locators.candidateVacancyDisplay).toHaveText(candidateData.vacancy);
    await expect(this.locators.candidateStatusDisplay).toContainText('Status:');
    await expect(this.locators.candidateStatusDisplay).toContainText('Application Initiated');
    await expect(this.locators.candidateEmailInput).toHaveValue(candidateData.email);
    await expect(this.locators.candidateContactInput).toHaveValue(candidateData.contactNumber ?? '');
    await expect(this.locators.candidateKeywordsInput).toHaveValue(candidateData.keywords ?? '');
    await expect(this.locators.candidateNotesInput).toHaveValue(candidateData.notes ?? '');
  }

  async searchCandidateByName(name: string): Promise<void> {
    await this.navigateToRecruitmentFromSidebar();
    await this.locators.candidateNameInput.fill(name);
    const autocompleteOption = this.page.getByRole('option').first();
    try {
      await autocompleteOption.waitFor({ state: 'visible', timeout: 5000 });
      const matchingOption = this.page.getByRole('option').filter({ hasText: name });
      if (await matchingOption.count() > 0) {
        await matchingOption.click();
      } else {
        await autocompleteOption.click();
      }
    } catch {
    }

    await this.locators.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyCandidateDisplayedInList(candidateName: string): Promise<void> {
    const candidateRow = this.locators.getCandidateRowByName(candidateName);
    await expect(candidateRow).toBeVisible({ timeout: 10000 });
  }

  async resetFilters(): Promise<void> {
    await this.locators.resetButton.click();
  }

  async deleteCandidate(candidateName: string): Promise<void> {
    const deleteButton = this.locators.getDeleteButton(candidateName);
    await deleteButton.click();
    await this.locators.confirmDeleteButton.waitFor({ state: 'visible' });
    await this.locators.confirmDeleteButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.locators.successMessage).toBeVisible({ timeout: 15000 });
  }

  async verifyCandidateNotInList(candidateName: string): Promise<void> {
    const candidateRow = this.locators.getCandidateRowByName(candidateName);
    await expect(candidateRow).not.toBeVisible();
  }

  getCandidateFullName(candidateData: CandidateData): string {
    const parts = [candidateData.firstName];

    if (candidateData.middleName) {
      parts.push(candidateData.middleName);
    }

    parts.push(candidateData.lastName);

    return parts.join(' ');
  }

  async cleanupCandidate(candidate: CandidateData): Promise<void> {
    const fullName = this.getCandidateFullName(candidate);
    try {
      await this.navigateToRecruitmentFromSidebar();
      await this.searchCandidateByName(fullName);
      await this.deleteCandidate(fullName);
      await this.resetFilters();
      console.log(`Cleaned up candidate: ${fullName}`);
    } catch (error) {
      console.warn(`Could not cleanup candidate ${fullName}:`, error);
    }
  }
}
