import { test } from "../fixtures/login.fixture";
import { widgetTestData } from "../enums/home-page.enum";

test.describe(
  "Feature: Home Page",
  { tag: ["@smoke", "@regression", "@homepage"] },
  () => {
    test.describe("Verify user is directed to the home page when logged in", () => {
      test("User should be redirected to dashboard with sidebar and widgets visible", async ({
        dashboardPage,
      }) => {
        await dashboardPage.waitForPageLoad();
        await dashboardPage.verifyRedirectToDashboard();
        await dashboardPage.verifySidebarVisible();
        await dashboardPage.verifyDashboardWidgetsVisible();
      });
    });

    test.describe("Verify all information widgets are available on dashboard", () => {
      for (const { widget_name, widget_type } of widgetTestData) {
        test(`Verify "${widget_name}" ${widget_type} is visible on dashboard`, async ({
          dashboardPage,
        }) => {
          await dashboardPage.waitForPageLoad();
          await dashboardPage.verifyWidgetVisible(widget_name, widget_type);
        });
      }
    });
  },
);
