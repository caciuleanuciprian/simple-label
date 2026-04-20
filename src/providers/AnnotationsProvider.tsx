import type { TaskValues } from "@/constants/task";
import { createProvider } from "./utils";

type AnnotationsProviderValue = {
	selectedAnnotation: TaskValues | null;
	setSelectedAnnotation: React.Dispatch<
		React.SetStateAction<TaskValues | null>
	>;
	annotations: TaskValues[] | null;
	setAnnotations: React.Dispatch<React.SetStateAction<TaskValues[] | null>>;
};

export const { provider: AnnotationsProvider, useValue: useAnnotations } =
	createProvider<AnnotationsProviderValue>("AnnotationsProvider");
