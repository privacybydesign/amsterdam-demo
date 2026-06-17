import { CredentialSet, CredentialSetFunction, IDemoCredentials } from '@typedefs/index';
import { demoCredentials18, demoCredentials65 } from '@api/demo1';
import { demoCredentials as demo2Credentials } from '@api/demo2';
import { demoCredentials as demo3Credentials } from '@api/demo3';
import { demoCredentials as demo4Credentials } from '@api/demo4';
import { demoCredentials as demo5Credentials } from '@api/demo5';

/**
 * The IRMA disclose structure is a conjunction of disjunctions: the outer array
 * is a conjunction (every entry must be satisfied), each entry is a disjunction
 * (one of its options is chosen), and each option is a list of attribute ids.
 *
 * A "duplicate disclosure option" is the same option listed twice within one
 * disjunction — a copy-paste leftover that makes the chooser show the same
 * option multiple times. See issue #26 (demo1 18+ listed passport.over18 and
 * idcard.over18 twice).
 */
type Option = string[];
type Disjunction = Option[];

// demo5 (and the PRODUCTION blocks of demo1) build their credential set from a
// function; resolve those by asking for every available attribute.
const resolve = (set: CredentialSet | CredentialSetFunction): Disjunction[] => {
    const resolved = typeof set === 'function' ? set({ mobileNumber: true, email: true }) : set;
    return resolved as unknown as Disjunction[];
};

const findDuplicateOptions = (credentialSet: Disjunction[]): string[] => {
    const duplicates: string[] = [];
    for (const disjunction of credentialSet) {
        const seen = new Set<string>();
        for (const option of disjunction) {
            const key = JSON.stringify(option);
            if (seen.has(key)) {
                duplicates.push(key);
            } else {
                seen.add(key);
            }
        }
    }
    return duplicates;
};

const credentialSets: Array<[string, IDemoCredentials]> = [
    ['demo1 (18+)', demoCredentials18],
    ['demo1 (65+)', demoCredentials65],
    ['demo2', demo2Credentials],
    ['demo3', demo3Credentials],
    ['demo4', demo4Credentials],
    ['demo5', demo5Credentials]
];

describe('demo credential sets contain no duplicate disclosure options', () => {
    describe.each(credentialSets)('%s', (_name, credentials) => {
        it('has no duplicate options in the DEMO set', () => {
            expect(findDuplicateOptions(resolve(credentials.DEMO))).toEqual([]);
        });

        it('has no duplicate options in the PRODUCTION set', () => {
            expect(findDuplicateOptions(resolve(credentials.PRODUCTION))).toEqual([]);
        });
    });

    // Explicit regression for issue #26: the 18+ DEMO disjunction must list each
    // over18 option exactly once.
    it('lists each demo1 18+ over18 option exactly once (regression for #26)', () => {
        const [disjunction] = resolve(demoCredentials18.DEMO);
        const occurrences = (id: string) =>
            disjunction.filter(option => JSON.stringify(option) === JSON.stringify([id])).length;

        expect(occurrences('pbdf.pilot-amsterdam.passport.over18')).toBe(1);
        expect(occurrences('pbdf.pilot-amsterdam.idcard.over18')).toBe(1);
    });
});
