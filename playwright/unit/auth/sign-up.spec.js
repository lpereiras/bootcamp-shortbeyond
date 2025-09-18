import { expect, test } from '@playwright/test';

test('***', async ({ request }) => {
  const response = await request.get('/');
  const responseBody = await response.json();


});