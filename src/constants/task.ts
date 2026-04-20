import type { AnnotationType } from "./annotation";
import type { LabelConfig } from "./label";

export type TaskType =
	| "CLASSIFICATION"
	| "OBJECT_DETECTION"
	| "SEMANTIC_SEGMENTATION"
	| "KEYPOINTS"
	| "OCR"
	| "INSTANCE_SEGMENTATION"
	| "KEYPOINTS_DETECTION";

type GenericTaskValue = {
	id: string;
	type: AnnotationType;
};

export type ClassificationTaskValue = GenericTaskValue & {
	choices: string[];
	type: "choices";
};

export type ObjectDetectionTaskValue = GenericTaskValue & {
	x: number;
	y: number;
	width: number;
	height: number;
	type: "bounding_box";
	// TODO: Add labelId to link to the label
};

export const TASK_TYPE_TO_LABEL: Record<string, string> = {
	CLASSIFICATION: "Classification",
	OBJECT_DETECTION: "Object Detection",
	SEMANTIC_SEGMENTATION: "Semantic Segmentation",
	KEYPOINTS: "Keypoints",
	OCR: "OCR",
	INSTANCE_SEGMENTATION: "Instance Segmentation",
	KEYPOINTS_DETECTION: "Keypoints Detection",
};

export type TaskValues = ClassificationTaskValue | ObjectDetectionTaskValue;

export type TaskConfig = {
	id: string;
	name: string;
	description: string;
	type: TaskType;
	labels: LabelConfig[]; // TODO: Remove this
	values: TaskValues[];
};
