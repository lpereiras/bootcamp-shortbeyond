import { expect, test } from '@playwright/test';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { testUser } from '../../support/factories/testUser';
import { Type } from '../../support/factories/auth';

test.describe('POST /auth/login', () => {
    test.beforeAll(async ({request}) => {
        await request.post(REGISTER_ROUTE, {
                data: testUser
        })
    });

    test('', async ({request}) => {
        const response = await request.post(LOGIN_ROUTE, {
            data: {
                email: testUser.email,
                password: testUser.password
            }
        })
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody.data.user).toHaveProperty(Type.ID)
    });
});