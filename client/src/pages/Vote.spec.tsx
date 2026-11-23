import { isHttpUrl } from './Vote';

describe('Vote page redirect', () => {
    it('follows web URLs', () => {
        expect(isHttpUrl('https://stemmen.example/result')).toBe(true);
        expect(isHttpUrl('http://localhost:3000/result?x=1')).toBe(true);
        expect(isHttpUrl('/result')).toBe(true);
    });

    it('does not follow script, data or missing URLs', () => {
        expect(isHttpUrl('javascript:alert(document.domain)')).toBe(false);
        expect(isHttpUrl(' JavaScript:alert(1)')).toBe(false);
        expect(isHttpUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
        expect(isHttpUrl(undefined)).toBe(false);
        expect(isHttpUrl('')).toBe(false);
    });
});
