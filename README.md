# OPTII-ORANGEHRM - Test Automation

> E2E and Unit Testing Framework for OrangeHRM

---

## 📋 Scope

### Target Application

- **Application:** [OrangeHRM Demo]
- **URL:** [https://opensource-demo.orangehrmlive.com/]

## Test Documentation:
- README.md for setup and execution
- TEST_STRATEGY.md for test strategy
- Gherkin scenarios for BDD documentation in gherkin/



### Why This Target?

- Focused and functional UI for testing page navigation
- Search functionality exercises API use cases through UI actions
- Adding new candidates validates database and API connections
- Functional validations that fail if essential APIs break
- Validates essential user flows (login, navigation, database and API connection)

### Technologies Used

- **Playwright** `^1.58.2` - E2E testing framework
- **TypeScript** - Type-safe test development
- **@faker-js/faker** `^10.3.0` - Dynamic test data generation
- **Allure** `^3.4.5` - Test reporting and analytics
- **dotenv** `^17.2.4` - Environment configuration
- **cross-env** `^10.1.0` - Cross-platform environment variables
- **ESLint** `^9.39.2` - Code linting and standards

---

## 🚀 How to Run

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/novaisana/optii-orangehrm.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
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
**Unit Tests**

```bash
npm run test:unit        # Run unit tests
```


### Tagging

- `@smoke` - Verify environment is functional (login, all pages are accessible)
- `@regression` - Regression suite for the environment
- `@recruitment`, `@login`, `@homepage`, `@sidebar` - Feature Regression

---

## 📁 Structure

```
OPTII-ORANGEHRM/
├── enums/              # TypeScript enums
├── fixtures/           # Test and auth orchestration
├── locators/           # Centralized selectors
├── pages/              # Page Object Model
├── utilities/          # Utilities for fixtures and pages
├── tests/              # E2E tests for orangerhm
├── resources/          # Static files
├── unit-tests/         # Unit tests for utilities
└── Gherkin/            # Gherkin BDD Cucumber style
```

### Selector Strategy

1. getByRole
2. getByLabel
3. getByPlaceholder
4. locators

---

## 🔄 CI/CD

### Configuration

- **Platform:** [GitHub Actions]
- **Triggers:**
- _Main_ - Push, and pull request
- _Test_ - Pull request, pull on feature/\*, scheduler.
- _Production_ - Push, Pull Request, scheduler.
- **Browsers:** [Chromium, Firefox, WebKit]

### View CI Results

1. Go to Actions tab
2. Click workflow run
3. Download artifacts
4. Open index.html and test evidences

PS. CI artifacts will be Playwright reports, Allure is configured to be used locally.

### View Local Results with Allure

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
7. Pull request with required commits to main

**PS: Used --amend and push --force strategy to test action workflow without creating multiple commits in the history.**

## ⚠️ Known Gaps & Next Steps

### Known Issues

- Authenticated page should be used as a shared state in the test session
- Missing automated coverage for edge cases
- Patternized logging 
- Automation coverage could be better for negative scenarios

### Next Steps

- Share authenticated page for all tests in session (exception for login)
- Intercept and verify API requests thru UI navigation, response objects, and status during UI tests
- Add proper logging, and log pattern (.logger/)
- Improve unit tests
- Host Allure report on GitHub Pages

**Last Updated:** [2/10/2026]
