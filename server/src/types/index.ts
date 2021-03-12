export type CredentialSet = string[] | string[][] | string[][][];
export type CredentialSetFunction = (...args: any[]) => CredentialSet;

export interface IDemoCredentials {
    DEMO: { [key: string]: CredentialSetFunction | CredentialSet };
    PRODUCTION: { [key: string]: CredentialSetFunction | CredentialSet };
}
