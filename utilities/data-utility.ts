import { faker } from "@faker-js/faker";
import path from "node:path";
import { CandidateData } from "../pages/recruitment.page";
import { vacancyList } from "../enums/recruitment.enum";

export interface TestCandidate extends CandidateData {
  id?: string;
}

export class DataFactory {
  //ovirride is not used, but can be used to set specific fields as hardcoded values from a test when needed
  candidate(overrides: Partial<TestCandidate> = {}): TestCandidate {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const vacancy = faker.helpers.arrayElement(vacancyList.map((v) => v.name));
    return {
      firstName: overrides.firstName ?? firstName,
      middleName: overrides.middleName ?? middleName,
      lastName: overrides.lastName ?? lastName,
      fullName: overrides.fullName ?? `${firstName} ${middleName} ${lastName}`,
      email:
        overrides.email ??
        faker.internet.email({
          firstName,
          lastName,
          provider: "automation.test",
        }),
      contactNumber: overrides.contactNumber ?? faker.string.numeric(10),
      vacancy: overrides.vacancy ?? vacancy,
      keywords:
        overrides.keywords ??
        faker.helpers
          .multiple(() => faker.word.sample(), { count: { min: 2, max: 4 } })
          .join(", "),
      notes: overrides.notes ?? faker.lorem.sentence(),
      resumePath:
        overrides.resumePath ??
        path.resolve(__dirname, "../resources/resume-1.pdf"),
      consent: overrides.consent ?? false,
    };
  }
}
