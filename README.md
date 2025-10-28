# ShortB: API Test Automation

## 📖 About The Project

API test automation project designed to test a URL shortener backend application. This project demonstrates modern testing practices including parallel execution, test data factories, reusable service modules, and maintainable test architecture.

## 🛠️ Tech Stack

![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bruno](https://img.shields.io/badge/Bruno-F4AA41.svg?style=for-the-badge&logo=Bruno&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white)
![Podman](https://img.shields.io/badge/Podman-892CA0.svg?style=for-the-badge&logo=Podman&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-D97757.svg?style=for-the-badge&logo=Claude&logoColor=white)

## 🚀 Getting Started

> [!NOTE]
> To install and run the project tests, make sure you have the following:
> | Required | Recommended version |
> | ------------- |:-------------:|
> | Node.js | ^18.x or higher |
> | Yarn | ^1.22 |
> | Playwright | ^1.55 |
> | Podman | 4.9.3 |

To verify your installations:

```bash
node --version   # Should be 18.x or higher
yarn --version   # Should be 1.22 or higher
podman --version # Should be 4.9.3 or compatible
```

### Installation

1. **Fork the repository**

   Click the "Fork" button at the top right of the repository page to create your own copy.

2. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR-USERNAME/bootcamp-shortbeyond.git
   cd shortbeyond
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

   This will install all required dependencies and packages.

4. **Install Playwright browsers** (if not already installed)

   ```bash
   npx playwright install
   ```

5. **Start the backend application**

   The project uses Podman to manage the backend application container:

   ```bash
   yarn pod:start
   ```

> [!NOTE]
> The backend application must be running on `http://localhost:3333` before executing tests.

6. **Verify the setup**

   Run the health check test to ensure everything is configured correctly:

   ```bash
   npx playwright test playwright/health.spec.js
   ```

7. **Stop the backend when done**

   ```bash
   yarn pod:stop
   ```

## 🧪 Running Tests

Execute all tests with 4 parallel workers:

```bash
yarn pl:run
```

Interactive test execution with Playwright UI:

```bash
yarn pl:ui
```

Run a Specific Test by their Tag

```bash
npx playwright test --grep "SRB-003: CT-1"
```

View Test Report

```bash
yarn pl:report
```

## 🎨 Code Quality

### Linting

Check and fix code quality issues:

```bash
yarn lint          # Check for linting errors
yarn lint:fix      # Auto-fix linting errors
```
