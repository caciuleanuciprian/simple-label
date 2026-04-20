import type { TaskValues } from "@/constants/task";
import { createProvider } from "./utils";

type AnnotationsActions = {
	selectedAnnotation: TaskValues | null;
	setSelectedAnnotation: React.Dispatch<
		React.SetStateAction<TaskValues | null>
	>;
	annotations: TaskValues[] | null;
	setAnnotations: React.Dispatch<React.SetStateAction<TaskValues[] | null>>;
};

type ActionsProviderValue = {
	annotations: AnnotationsActions;
};

export const { provider: ActionsProvider, useValue: useActions } =
	createProvider<ActionsProviderValue>("ActionsProvider");
