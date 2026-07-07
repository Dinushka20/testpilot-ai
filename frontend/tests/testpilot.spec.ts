import { test, expect } from '@playwright/test';

test.describe('TestPilot AI E2E Test Suite', () => {

  // Run this before every single test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Landing page renders and navigates to dashboard', async ({ page }) => {
    // Check for main hero text
    await expect(page.locator('h1')).toContainText('Automate API Testing');
    
    // Click the CTA button and verify routing
    await page.click('text=Start Generating');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Theme toggle switches to dark mode', async ({ page }) => {
    // The default should not be dark
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
    
    // Click the theme toggle icon in the navbar
    await page.locator('.theme-toggle').click();
    
    // Verify the HTML tag now has the dark theme data attribute
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Uploads Swagger file and parses endpoints', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    // Assert initial empty state
    await expect(page.getByText('No API Loaded')).toBeVisible();

    // Upload the mock swagger file from the fixtures folder
    await page.setInputFiles('input[type="file"]', 'tests/fixtures/test-swagger.json');
    
    // Click Extract
    await page.click('text=Extract Endpoints');
    
    // Verify the endpoints rendered on the screen
    await expect(page.getByText('Endpoint Configuration (2)')).toBeVisible();
    
    // Fix: Use getByText instead of the text= locator
    await expect(page.getByText('/auth/login')).toBeVisible();
    await expect(page.getByText('/users')).toBeVisible();
  }); // <-- ADDED THE MISSING CLOSING BRACE HERE

  test('Manually adds a test case to an endpoint', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.setInputFiles('input[type="file"]', 'tests/fixtures/test-swagger.json');
    await page.click('text=Extract Endpoints');

    // Wait for endpoints to render
    await expect(page.locator('.endpoint-card').first()).toBeVisible();

    // Fill out the form for the first endpoint
    await page.locator('input[name="desc"]').first().fill('Verify 200 OK response');
    await page.locator('input[name="status"]').first().fill('200');
    
    // Click the submit button inside that specific form
    await page.locator('.endpoint-card').first().locator('button[type="submit"]').click();

    // Verify the test case was added to the DOM using the modern getByText locator
    await expect(page.getByText('Verify 200 OK response')).toBeVisible();
    await expect(page.getByText('200').first()).toBeVisible();
  });

  test('Catches empty file upload error', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    
    // Try to extract without selecting a file
    await page.click('text=Extract Endpoints');

    // Verify the error message appears
    await expect(page.getByText('Please select a file')).toBeVisible();
  });

});