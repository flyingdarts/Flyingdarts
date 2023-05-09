import { CognitoIdentity } from "./CognitoIdentity";


export interface CognitoAttributes {
  sub: string;
  identities: CognitoIdentity[];
}
