import { createContext } from "react";

const UserContext = createContext(null);

export default UserContext;

// mock functionality
export let MOCK_CURRENT_USER = { firstName: "Julia", lastName: "Squirrl", hasAvatar: false };
