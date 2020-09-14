import { setupMocks } from '@test/utils';
import getGGW from './getGGW';

// Setup all the generic mocks
setupMocks();

describe('getGGW', () => {
    it('getGGW()', async () => {
        const ggwResult = await getGGW('1011PT');
        expect(ggwResult).toMatchInlineSnapshot(`
            Object {
              "buurtcombinatieNamen": "Test buurt",
              "ggwCode": "DX02",
              "ggwNaam": "Test gebied",
            }
        `);
    });
});
