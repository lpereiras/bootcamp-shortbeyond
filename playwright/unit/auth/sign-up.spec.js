import { expect, test } from '@playwright/test';
import { testUser, AuthMessages } from '../../support/fixtures';

test.describe('POST /auth/register', () => {
    test('should register a new user', async ({ request }) => {
    
    const response = await request.post('/api/auth/register', {
        data: testUser
    })
    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.user).toHaveProperty('id');
    expect(responseBody).toHaveProperty('message', AuthMessages.REGISTER_SUCCESS);
    expect(responseBody.user).not.toHaveProperty('password');
    expect(responseBody.user.name).toEqual(testUser.name);
    expect(responseBody.user.email).toEqual(testUser.email);
    });

    test('should not register with email is already used', async ({request}) => {
        await request.post('/api/auth/register', {
            data: testUser
        });

        const response = await request.post('/api/auth/register', {
            data: {
                name: 'Valid User Name',
                email: testUser.email,
                password: testUser.password
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty('message', AuthMessages.DUPLICATED_EMAIL);
    });
    
    test('should validate name as a required field', async ({request}) => {
        const response = await request.post('/api/auth/register', {
            data: {
                email: testUser.email,
                password: testUser.password
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty('message', AuthMessages.REQUIRED_NAME );
    });

    test('should validate email as a required field', async ({request}) => {
        const response = await request.post('/api/auth/register', {
            data: {
                name: testUser.name,
                password: testUser.password
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty('message', AuthMessages.REQUIRED_EMAIL);
    });

    test('should validate password as a required field', async ({request}) => {
        const response = await request.post('/api/auth/register', {
            data: {
                name: testUser.name,
                email: testUser.email
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty('message', AuthMessages.REQUIRED_PASSWORD);
    });
});