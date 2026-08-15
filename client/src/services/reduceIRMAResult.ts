interface IDisclosedCredential {
    id: string;
    rawvalue: string;
    value: { [key: string]: unknown };
    status: string;
    issuancetime: number;
}

// A disclosed set is a conjunction: an array of disclosed credentials.
type IDisclosedCredentialSet = IDisclosedCredential[];

const reduceIRMAResult = (disclosedCredentialSets: IDisclosedCredentialSet[]) => {
    let joinedResults = {};
    disclosedCredentialSets.forEach((conjunction: IDisclosedCredentialSet) => {
        joinedResults = {
            ...joinedResults,
            ...conjunction.reduce(
                (acc, { id, rawvalue }) => ({ ...acc, [(id as any).match(/[^.]*$/g)[0]]: rawvalue }),
                {}
            )
        };
    });
    return joinedResults;
};

export default reduceIRMAResult;
