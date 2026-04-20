import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import {
	ANNOTATION_TYPE_TO_LABEL,
	ANNOTATION_TYPES_WITHOUT_REGIONS,
} from "@/constants/annotation";
import type { ObjectDetectionTaskValue } from "@/constants/task";
import { cn } from "@/lib/utils";
import { useAnnotations } from "@/providers/AnnotationsProvider";
import { useConfig } from "@/providers/ConfigProvider";
import React from "react";

type RegionsProps = {
	emptyLabel?: string;
};

export const Regions = (props: RegionsProps) => {
	const { emptyLabel = "You have no regions yet." } = props;
	const { annotations } = useAnnotations();
	const isEmpty = React.useMemo(() => annotations?.length === 0, [annotations]);
	const filteredAnnotations = React.useMemo(
		() =>
			annotations?.filter(
				(annotation) =>
					!ANNOTATION_TYPES_WITHOUT_REGIONS.includes(annotation.type),
				// TODO: Replace with a generic type that can handle all task types that should appear in the regions list
			) as ObjectDetectionTaskValue[] | undefined,
		[annotations],
	);
	return (
		<div className="flex h-full w-full">
			<Table>
				{isEmpty && <TableCaption>{emptyLabel}</TableCaption>}
				{!isEmpty && <RegionHeader />}
				{!isEmpty && (
					<TableBody>
						{filteredAnnotations?.map((annotation) => (
							<RegionRow key={annotation.id} annotation={annotation} />
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

const RegionHeader = () => {
	const { withDebug } = useConfig();

	return (
		<TableHeader>
			<TableRow>
				{withDebug && <TableHead>ID</TableHead>}
				<TableHead>Type</TableHead>
				<TableHead>X</TableHead>
				<TableHead>Y</TableHead>
				<TableHead>Width</TableHead>
				<TableHead>Height</TableHead>
				<TableHead>{/* Actions */}</TableHead>
			</TableRow>
		</TableHeader>
	);
};

type RegionRowProps = {
	// TODO: Replace with a generic type that can handle all task types that should appear in the regions list
	annotation: ObjectDetectionTaskValue;
};

const RegionRow = (props: RegionRowProps) => {
	const { annotation } = props;
	const { withDebug } = useConfig();
	const { selectedAnnotation, setSelectedAnnotation } = useAnnotations();

	const handleClick = () => {
		setSelectedAnnotation(annotation);
	};

	return (
		<TableRow
			onClick={handleClick}
			className={cn(
				"cursor-pointer",
				selectedAnnotation?.id === annotation.id ? "bg-gray-200" : "",
			)}
		>
			{withDebug && <TableCell>{annotation.id}</TableCell>}
			<TableCell>
				{ANNOTATION_TYPE_TO_LABEL[annotation.type] ?? "Unknown"}
			</TableCell>
			<TableCell>{annotation.x}</TableCell>
			<TableCell>{annotation.y}</TableCell>
			<TableCell>{annotation.width}</TableCell>
			<TableCell>{annotation.height}</TableCell>
			<TableCell>{/* Actions */}</TableCell>
		</TableRow>
	);
};
