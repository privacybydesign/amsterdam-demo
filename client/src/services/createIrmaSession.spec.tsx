import React from 'react';
import IrmaCore from '@privacybydesign/irma-core';
import { setupMocks, wrappedRender } from '@test/utils';
import { act } from 'react-dom/test-utils';
import createIrmaSession, { getConfig } from './createIrmaSession';

// Setup all the generic mocks
setupMocks();

// Mock user agent
const mockedUserAgent: any = null;
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

    it('createIrmaSession()', async () => {
        await act(async (): Promise<any> => await wrappedRender(<div id="test-elementID"></div>));

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
