import { faker } from '@faker-js/faker';
import path from 'path';
import { CandidateData } from '../pages/recruitment.page';

export interface TestCandidate extends CandidateData {
  id?: string;
}

export class DataFactory {
  candidate(overrides: Partial<TestCandidate> = {}): TestCandidate {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      firstName: overrides.firstName ?? firstName,
      middleName: overrides.middleName ?? faker.person.middleName(),
      lastName: overrides.lastName ?? lastName,
      email: overrides.email ?? faker.internet.email({ firstName, lastName, provider: 'automation.test' }),
      contactNumber: overrides.contactNumber ?? faker.string.numeric(10),
      vacancy: overrides.vacancy ?? 'Software Engineer',
      keywords: overrides.keywords ?? faker.helpers.arrayElements(
        ['JavaScript', 'TypeScript', 'Python', 'Java', 'Testing', 'QA', 'Automation', 'React', 'Node.js', 'SQL'],
        { min: 2, max: 4 }
      ).join(', '),
      notes: overrides.notes ?? faker.lorem.sentence(),
      resumePath: overrides.resumePath ?? path.resolve(__dirname, '../resources/resume-1.pdf'),
      consent: overrides.consent ?? false
    };
  }
}
