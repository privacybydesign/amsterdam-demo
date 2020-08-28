import { setupMocks } from '@test/utils';
import createIrmaSession, { getConfig, isMobile } from './createIrmaSession';

// Setup all the generic mocks
setupMocks();

// Mock user agent
let mockedUserAgent = null;
Object.defineProperty(global.navigator, 'userAgent', {
    get() {
        return mockedUserAgent;
    }
});

const irmaResult = [
    {
        rawvalue: 'Yes',
        value: {
            '': 'Yes',
            en: 'Yes',
            nl: 'Yes'
        },
        id: 'irma-demo.test.data.proof',
        status: 'PRESENT',
        issuancetime: 1597881600
    }
];

// Mock irma module
jest.mock('@privacybydesign/irmajs', () => ({
    ...jest.requireActual('@privacybydesign/irmajs'),
    handleSession: () => ({
        token: '1234567890abcdefg',
        status: 'DONE',
        type: 'disclosing',
        proofStatus: 'VALID',
        disclosed: [irmaResult]
    })
}));

describe('createIrmaSession', () => {
    it('getConfig()', async () => {
        const config = await getConfig();
        expect(config).toMatchInlineSnapshot(`
            Object {
              "environment": "acceptance",
            }
        `);
    });

    it('isMobile()', () => {
        mockedUserAgent = 'Android';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'webOS';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'iPhone';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'iPad';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'iPod';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'BlackBerry';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'IEMobile';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'Opera Mini';
        expect(isMobile()).toBeTruthy();

        mockedUserAgent = 'PC';
        expect(isMobile()).toBeFalsy();

        mockedUserAgent = 'Unknown user agent';
        expect(isMobile()).toBeFalsy();
    });

    it('createIrmaSession()', async () => {
        const sessionResult = await createIrmaSession('test', 'test-elementID', false);
        expect(sessionResult).toMatchInlineSnapshot(`
            Object {
              "proof": "Yes",
            }
        `);
    });
});
