import { expect, test } from '@playwright/test';
import { testUser } from '../../support/factories/testUser';
import { AuthMessage, Type } from '../../support/factories/auth';
import { REGISTER_ROUTE } from '../../support/apiRoutes'

test.describe('POST /auth/register', () => {
    test('should register a new user', async ({ request }) => {
        const response = await request.post(REGISTER_ROUTE, {
            data: testUser
        })
        const responseBody = await response.json();

        expect(response.status()).toBe(201);
        expect(responseBody.user).toHaveProperty(Type.ID);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REGISTER_SUCCESS);
        expect(responseBody.user).not.toHaveProperty(Type.PASSWORD);
        expect(responseBody.user.name).toEqual(testUser.name);
        expect(responseBody.user.email).toEqual(testUser.email);
    });

    test('should not register with email is already used', async ({request}) => {
        await request.post(REGISTER_ROUTE, {
            data: testUser
        });

        const response = await request.post(REGISTER_ROUTE, {
            data: {
                name: 'Valid User Name',
                email: testUser.email,
                password: testUser.password
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.DUPLICATED_EMAIL);
    });
    
    test('should validate name as a required field', async ({request}) => {
        const response = await request.post(REGISTER_ROUTE, {
            data: {
                email: testUser.email,
                password: testUser.password
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REQUIRED_NAME);
    });

    test('should validate email as a required field', async ({request}) => {
        const response = await request.post(REGISTER_ROUTE, {
            data: {
                name: testUser.name,
                password: testUser.password
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REQUIRED_EMAIL);
    });

    test('should validate password as a required field', async ({request}) => {
        const response = await request.post(REGISTER_ROUTE, {
            data: {
                name: testUser.name,
                email: testUser.email
            }
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(400);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REQUIRED_PASSWORD);
    });
});