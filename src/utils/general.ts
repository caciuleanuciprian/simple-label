export const randomUUID = () => {
	const uuid = crypto.randomUUID();
	return uuid;
};

// TODO: Replace with actual types when available
// biome-ignore lint/suspicious/noExplicitAny: Will be replaced with actual types in the future
export type TODO = any;
