import { createContext, ReactNode, useContext, useReducer } from "react";
import { IAlertContext } from "Store/Alert/types";
import { messageReducer, ALERT_INITIAL_VALUE } from "Store/Alert/alertReducer";
import { IUserContext } from "Store/User/types";
import { userReducer, USER_INITIAL_VALUE } from "Store/User/userReducer";
import { tokenReducer, TOKEN_INITIAL_VALUE } from "Store/Token/tokenReducer";
import { ITokenContext } from "Store/Token/types";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [userState, userDispatch] = useReducer(userReducer, USER_INITIAL_VALUE);
	const [alertState, alertDispatch] = useReducer(messageReducer, ALERT_INITIAL_VALUE);
	const [tokenState, tokenDispatch] = useReducer(tokenReducer, TOKEN_INITIAL_VALUE);
	return (
		<AlertContext.Provider value={{ alertState, alertDispatch }}>
			<TokenContext.Provider value={{ tokenState, tokenDispatch }}>
				<UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>;
			</TokenContext.Provider>
		</AlertContext.Provider>
	);
};

export const UserContext = createContext<IUserContext>({
	userState: USER_INITIAL_VALUE,
	userDispatch: () => null
});

export const AlertContext = createContext<IAlertContext>({
	alertState: ALERT_INITIAL_VALUE,
	alertDispatch: () => null
});

export const TokenContext = createContext<ITokenContext>({
	tokenState: TOKEN_INITIAL_VALUE,
	tokenDispatch: () => null
});

export const useUserContext = () => useContext(UserContext);
export const useAlertContext = () => useContext(AlertContext);
export const useTokenContext = () => useContext(TokenContext);
