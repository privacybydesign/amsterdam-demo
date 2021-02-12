import React from 'react';
import IrmaCore from '@privacybydesign/irma-core';
import { setupMocks, wrappedRender } from '@test/utils';
import { act } from 'react-dom/test-utils';
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
    [
        {
            rawvalue: 'Set1Value1',
            value: {
                '': 'Set1Value1',
                en: 'Set1Value1',
                nl: 'Set1Value1'
            },
            id: 'irma-demo.test.data.proof.set1value1',
            status: 'PRESENT',
            issuancetime: 1597881600
        },
        {
            rawvalue: 'Set1Value2',
            value: {
                '': 'Set1Value2',
                en: 'Set1Value2',
                nl: 'Set1Value2'
            },
            id: 'irma-demo.test.data.proof.set1value2',
            status: 'PRESENT',
            issuancetime: 1597881600
        }
    ],
    [
        {
            rawvalue: 'Set2Value1',
            value: {
                '': 'Set2Value1',
                en: 'Set2Value1',
                nl: 'Set2Value1'
            },
            id: 'irma-demo.test.data.proof.set2value1',
            status: 'PRESENT',
            issuancetime: 1597881600
        },
        {
            rawvalue: 'Set2Value2',
            value: {
                '': 'Set2Value2',
                en: 'Set2Value2',
                nl: 'Set2Value2'
            },
            id: 'irma-demo.test.data.proof.set2value2',
            status: 'PRESENT',
            issuancetime: 1597881600
        }
    ]
];

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
        await act(async () => await wrappedRender(<div id="test-elementID"></div>));

        IrmaCore.prototype.start = jest.fn().mockReturnValue({
            token: '1234567890abcdefg',
            status: 'DONE',
            type: 'disclosing',
            proofStatus: 'VALID',
            disclosed: irmaResult
        });

        const sessionResult = await createIrmaSession('test', 'test-elementID', false);
        expect(sessionResult).toMatchInlineSnapshot(`
            Object {
              "set1value1": "Set1Value1",
              "set1value2": "Set1Value2",
              "set2value1": "Set2Value1",
              "set2value2": "Set2Value2",
            }
        `);
    });
});
