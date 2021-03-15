export type CredentialSet = string[] | string[][] | string[][][];
export type CredentialSetFunction = (...args: any[]) => CredentialSet;

export interface IDemoCredentials {
    DEMO: CredentialSetFunction | CredentialSet;
    PRODUCTION: CredentialSetFunction | CredentialSet;
}
