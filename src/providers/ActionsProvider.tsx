import type { TODO } from "@/utils/general";
import { createProvider } from "./utils";

type AnnotationsActions = {
	selectedAnnotation: TODO;
	setSelectedAnnotation: React.Dispatch<React.SetStateAction<TODO>>;
	numOfAnnotations: number | null;
	setNumOfAnnotations: React.Dispatch<React.SetStateAction<number | null>>;
};

type ActionsProviderValue = {
	annotations: AnnotationsActions;
};

export const { provider: ActionsProvider, useValue: useActions } =
	createProvider<ActionsProviderValue>("ActionsProvider");
