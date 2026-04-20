export type AnnotationType =
	| "choices"
	| "bounding_box"
	| "polyline"
	| "keypoints"
	| "text";

export const ANNOTATION_TYPES_WITHOUT_REGIONS = ["choices", "text"];

export const ANNOTATION_TYPE_TO_LABEL: Record<string, string> = {
	choices: "Choices",
	bounding_box: "Bounding Box",
};
