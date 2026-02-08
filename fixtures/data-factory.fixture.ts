import { test as authTest } from "./login.fixture";
import { DataFactory } from "../utilities/data-utility";

type DataFactoryFixtures = {
  dataFactory: DataFactory;
};

export const test = authTest.extend<DataFactoryFixtures>({
  dataFactory: async ({}, use) => {
    await use(new DataFactory());
  },
});

export { DataFactory, TestCandidate } from "../utilities/data-utility";
