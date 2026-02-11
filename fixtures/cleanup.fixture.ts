import { test as dataFactoryTest } from "./data-factory.fixture";
import { CleanupRegistry } from "../utilities/cleanup-utility";

type CleanupFixtures = {
  cleanup: CleanupRegistry;
};

export const test = dataFactoryTest.extend<CleanupFixtures>({
  cleanup: async ({}, use) => {
    const registry = new CleanupRegistry();
    await use(registry);

    // Fallback: only run if test didn't explicitly call runAll()
    if (!registry.wasExecuted && registry.count > 0) {
      console.warn(
        "Cleanup running in fixture teardown - prefer calling cleanup.runAll() at end of test",
      );
      try {
        await registry.runAll();
      } catch (error) {
        console.warn("Cleanup registry failed in teardown:", error);
      }
    }
  },
});

export { CleanupRegistry } from "../utilities/cleanup-utility";
