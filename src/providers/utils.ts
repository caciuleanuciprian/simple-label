import React from "react";

type ProviderResult<T> = {
	provider: React.FC<{ children: React.ReactNode; value: T | null }>;
	useValue: () => T;
};

export const createProvider = <T>(providerName: string): ProviderResult<T> => {
	const Context = React.createContext<T | null>(null);

	const Provider: React.FC<{ children: React.ReactNode; value: T | null }> = ({
		children,
		value,
	}) => {
		return React.createElement(Context.Provider, { value }, children);
	};

	const useValue: ProviderResult<T>["useValue"] = () => {
		const contextValue = React.useContext(Context);
		if (!contextValue) {
			throw new Error(`${providerName} must be used within a Provider`);
		}
		return contextValue;
	};

	return { provider: Provider, useValue };
};
