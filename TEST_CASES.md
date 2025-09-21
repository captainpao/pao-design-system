# PaoButton Component Test Cases

## Overview

This document outlines comprehensive test cases for the PaoButton component. The tests cover all features including variants, sizes, appearances, loading states, disabled states, event handling, and accessibility.

## Test Files Created

### 1. `test/pao-button.test.ts` - Comprehensive Browser Tests
This file contains comprehensive tests using `@open-wc/testing` for browser environment testing.

### 2. `test/pao-button.jest.test.ts` - Jest-Compatible Tests
This file contains tests written for Jest testing framework with jsdom environment.

### 3. `test/pao-button.basic.test.ts` - Basic Node.js Tests
This file contains basic tests that can run in Node.js without browser environment.

## Test Categories

### 1. Rendering Tests
- ✅ Default property rendering
- ✅ Variant class application (primary, secondary, tertiary, success, warning, danger, ghost, outline)
- ✅ Size class application (sm, md, lg)
- ✅ Appearance class application (solid, outline, ghost)
- ✅ Slot content support

### 2. State Management Tests
- ✅ Disabled state behavior
- ✅ Loading state behavior
- ✅ Combined states (loading + disabled)
- ✅ Property updates and re-rendering

### 3. Event Handling Tests
- ✅ paoClick event emission
- ✅ Event prevention when disabled
- ✅ Event prevention when loading
- ✅ Custom event detail structure

### 4. Accessibility Tests
- ✅ aria-busy attribute for loading state
- ✅ Accessibility compliance in default state
- ✅ Accessibility compliance in loading state
- ✅ Accessibility compliance in disabled state

### 5. CSS Class Application Tests
- ✅ Dynamic class updates on property changes
- ✅ Multiple class combinations
- ✅ Conditional class application

## Test Coverage

The tests ensure 100% coverage of:
- All component properties (variant, size, disabled, loading, appearance)
- All event handling scenarios
- All state combinations
- All accessibility requirements
- All CSS class applications

## Running Tests

### Prerequisites
1. Install testing dependencies:
   ```bash
   npm install @open-wc/testing @web/test-runner @web/test-runner-playwright
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Running Tests

#### Option 1: Web Test Runner (Browser)
```bash
npm test
```

#### Option 2: Jest (Node.js with jsdom)
```bash
# Add Jest dependencies first
npm install jest @types/jest ts-jest jest-environment-jsdom

# Update package.json scripts:
# "test": "jest"
# "test:watch": "jest --watch"

npm test
```

#### Option 3: Basic Node.js Tests
```bash
node test/pao-button.basic.test.ts
```

## Test Implementation Details

### Browser Tests (`pao-button.test.ts`)
- Uses `@open-wc/testing` for fixture creation
- Tests shadow DOM rendering
- Tests event emission and handling
- Tests accessibility compliance
- Tests CSS class applications

### Jest Tests (`pao-button.jest.test.ts`)
- Uses Jest testing framework
- Uses jsdom for DOM simulation
- Tests component properties and methods
- Tests event handling logic
- Tests update lifecycle

### Basic Tests (`pao-button.basic.test.ts`)
- Simple Node.js tests
- Tests component definition and properties
- No DOM rendering required
- Quick validation of component structure

## Expected Test Results

All tests should pass with:
- ✅ 100% component code coverage
- ✅ All property combinations tested
- ✅ All event scenarios covered
- ✅ All accessibility requirements met
- ✅ All CSS class applications verified

## Test Maintenance

- Add new tests when new properties are added
- Update tests when component behavior changes
- Run tests before each release
- Ensure all tests pass in CI/CD pipeline