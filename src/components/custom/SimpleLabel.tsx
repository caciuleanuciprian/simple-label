import { ImageContainer, SideMenu, Tasks } from "@/components/custom";
import type { TaskValues } from "@/constants/task";
import { AnnotationsProvider } from "@/providers/AnnotationsProvider";
import React from "react";

type SimpleLabelProps = {};

export const SimpleLabel = (_props: SimpleLabelProps) => {
	const [selectedAnnotation, setSelectedAnnotation] =
		React.useState<TaskValues | null>(null);
	const [annotations, setAnnotations] = React.useState<TaskValues[] | null>(
		null,
	);

	const providerValues = React.useMemo(() => {
		return {
			selectedAnnotation,
			setSelectedAnnotation,
			annotations,
			setAnnotations,
		};
	}, [selectedAnnotation, annotations]);

	return (
		<AnnotationsProvider value={providerValues}>
			<div>
				<div className="flex flex-col md:flex-row">
					<ImageContainer />
					<SideMenu />
				</div>
				<Tasks />
			</div>
		</AnnotationsProvider>
	);
};
