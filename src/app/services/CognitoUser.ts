import { CognitoAttributes } from "./CognitoAttributes";


export interface CognitoUser {
  id: string;
  username: string;
  attributes: CognitoAttributes;
}
