import { createContext } from "react";

const UserContext = createContext(null);

export default UserContext;

// mock functionality
const MOCK_USER_1 = { firstName: "Julia", lastName: "Squirrl", hasAvatar: false };
const MOCK_USER_2 = { firstName: "Anna", lastName: "Cat", hasAvatar: true };

export let MOCK_CURRENT_USER = MOCK_USER_1;

export function switchUser() {
  if (MOCK_CURRENT_USER == MOCK_USER_1) {
    MOCK_CURRENT_USER = MOCK_USER_2;
  } else {
    MOCK_CURRENT_USER = MOCK_USER_1;
  }
}
