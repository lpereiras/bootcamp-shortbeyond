import { expect, test } from '@playwright/test';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { testUser } from '../../support/factories/testUser';
import { AuthMessage, Type } from '../../support/factories/auth';

test.describe('POST /auth/login', () => {
    test.beforeAll(async ({request}) => {
        await request.post(REGISTER_ROUTE, {
            data: testUser
        })
    });

    test('should get access token with valid credential', async ({request}) => {
        const response = await request.post(LOGIN_ROUTE, {
            data: {
                email: testUser.email,
                password: testUser.password
            }
        })
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody.data).toHaveProperty(Type.TOKEN);
        expect(responseBody.data.user).toHaveProperty(Type.ID);
        expect(responseBody.data.user.name).toEqual(testUser.name);
        expect(responseBody.data.user.email).toEqual(testUser.email);
        expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.LOGIN_SUCCESS)
    });
});