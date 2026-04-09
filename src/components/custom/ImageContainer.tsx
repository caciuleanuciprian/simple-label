import { ActionsProvider } from "@/providers/ActionsProvider";
import { Canvas } from "./Canvas";
import type { TODO } from "@/utils/general";
import React from "react";
import { useConfig } from "@/providers/ConfigProvider";

export const ImageContainer = () => {
	const { image } = useConfig();

	const [selectedAnnotation, setSelectedAnnotation] =
		React.useState<TODO | null>(null);
	const [numOfAnnotations, setNumOfAnnotations] = React.useState<number | null>(
		null,
	);

	const providerValues = React.useMemo(() => {
		return {
			annotations: {
				selectedAnnotation,
				setSelectedAnnotation,
				numOfAnnotations,
				setNumOfAnnotations,
			},
		};
	}, [selectedAnnotation, numOfAnnotations]);

	return (
		<div className="bg-gray-300 p-2 ">
			<ActionsProvider value={providerValues}>
				<Canvas image={image} />
			</ActionsProvider>
		</div>
	);
};
