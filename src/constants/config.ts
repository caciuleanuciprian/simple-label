export type TaskType =
	| "CLASSIFICATION"
	| "OBJECT_DETECTION"
	| "SEMANTIC_SEGMENTATION"
	| "KEYPOINTS"
	| "OCR"
	| "INSTANCE_SEGMENTATION"
	| "KEYPOINTS_DETECTION";

export type LabelConfig = {
	id: string;
	name: string;
	color: string;
};

export type TaskConfig = {
	id: string;
	name: string;
	description: string;
	type: TaskType;
	labels: LabelConfig[];
};

export type Config = {
	tasks: TaskConfig[];
};

export const config: Config = {
	tasks: [
		{
			id: "task0",
			name: "Task Name",
			description: "Task Description",
			type: "CLASSIFICATION",
			labels: [
				{
					id: "label0",
					name: "Frog",
					color: "#FF0000",
				},
				{
					id: "label1",
					name: "Dog",
					color: "#00FF00",
				},
				{
					id: "label2",
					name: "Cat",
					color: "#0000FF",
				},
			],
		},
	],
};
