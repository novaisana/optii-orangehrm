# OPTII-ORANGEHRM - Test Automation
> E2E and Unit Testing Framework for OrangeHRM

---

## 📋 Scope

### Target Application
- **Application:** [OrangeHRM Demo]
- **URL:** [https://opensource-demo.orangehrmlive.com/]

### Why This Target?
- Focused and functional UI for testing page navigation
- Search functionality exercises API use cases through UI actions
- Adding new candidates validates database and API connections
- Functional validations that fail if essential APIs break
- Validates essential user flows (login, navigation, API requests)

### Coverage

Complete DBB can be found in gherkin/**-feature.md

Approach: Verify essential workflows to ensure application is stable and verify if connections to API and database are working with a simple CRUD test.

#### Coverage summary
- Verify login/logout flows;
- Verify if home page is loaded with all required items;
- Verify if user can navigate thru the site from main bar;
- Verify if all pages available on the main bar are loading properly;
- Verify if candidate can be added, viewd, searched, and deleted (inderectly verify if APIs and Database connections are accessible)

### Technologies used
- List depencys added

---

## 🚀 How to Run

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Install
```bash
git clone [REPO_URL]
npm install
```
### Test triggers

**Run all tests**
```bash
npm test
```

**Run smoke tests**
```bash
npm run test:smoke
```

**Run regression suite**
```bash
npm run test:regression
```

**Run by feature**
```bash
npm run test:login
npm run test:homepage
npm run test:sidebar
npm run test:recruitment
```

**Run by environment**
```bash
npm run test:env:test    # Test environment
npm run test:env:prod    # Production environment
```

**Debug & UI Mode**
```bash
npm run test:headed      # Run with browser visible
npm run test:ui          # Playwright UI mode
npm run test:debug       # Debug mode with inspector
```


### Tagging
- `@smoke` - Verify environment is functional (login, all pages are accessible)
- `@regression` - Regression suite for the environment
- `@recruitment`, `@login`, `@homepage`, `@sidebar` - Feature Regression


### View Reports

Generate and open Allure report:
```bash
npm run report:generate
npm run report:open
```

---

## 📁 Structure

```
OPTII-ORANGEHRM/
├── enums/              # TypeScript enums
├── fixtures/           # Test and auth orchestration
├── locators/           # Centralized selectors
├── pages/              # Page Object Model
├── utilities/          # Utilitys for fixtures and pages
├── tests/              # E2E tests for orangerhm
├── resources/          # Static files
├── unit-tests/         # Unit test for 
└── Gherkin/            # Gherkin BDD Cucumber style
```

### Selector Strategy
1. getByRole
2. getByLabel
3. getByPlaceHolder
4. locators

---

## 🔄 CI/CD

### Configuration
- **Platform:** [GitHub Actions]
- **Triggers:**
- *Main* - Push, and pull request
- *Test* - Pull request, pull on feature/*, scheduler.
- *Production* - Push, Pull Request, scheduler.
- **Browsers:** [Chromium, Firefox, WebKit]

### Artifacts Uploaded
- Allure HTML report (30 days)
- Screenshots on failure (30 days)

### View CI Results
1. Go to Actions tab
2. Click workflow run
3. Download artifacts

### View Local Results
1. Run tests locally: `npm test`
2. Generate the Allure report: `npm run report:generate`
3. Open the report in browser: `npm run report:open`
---

## Branch/Commit strategy
1. Create test branch from main
2. Create production from main
3. Create feature branch from test
4. Commit scripts on feature branch
5. Merge feature branch with test
6. Merge test with production
7. Pull request with required commit to main

**PS: Used --amend and push --force strategy to test action workflow without creating multiple commits in the history.**

## ⚠️ Known Gaps & Next Steps

### Known Issues
- Recruitment feature was removed from OrangeRHM (tests are failing)
- Authenticated page should be used as a shared state in the test session
- Missing automated coverage for edge cases
- Repository history

### Next Steps
- Share authenticated page for all tests in session (exception for login)
- Create generic function to intercept and verify API requests, response objects, and status during UI tests
- [ ] [FILL: Improvement 3]

**Last Updated:** [FILL: Date]