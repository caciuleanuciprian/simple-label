import type { TaskConfig } from "./task";

export type Config = {
	tasks: TaskConfig[];
};

export const exampleConfig: Config = {
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
			values: [
				{
					id: "classification-0",
					choices: ["Frog"],
					type: "choices",
				},
			],
		},
		{
			id: "task1",
			name: "Object Detection",
			description: "Detect objects in the image",
			type: "OBJECT_DETECTION",
			labels: [
				{
					id: "obj-det-0",
					name: "Car",
					color: "#FF0000",
				},
				{
					id: "obj-det-1",
					name: "Person",
					color: "#00FF00",
				},
			],
			values: [
				{
					id: "obj-det-0",
					x: 50,
					y: 50,
					width: 100,
					height: 100,
					type: "bounding_box",
				},
				{
					id: "obj-det-1",
					x: 200,
					y: 200,
					width: 100,
					height: 100,
					type: "bounding_box",
				},
				{
					id: "obj-det-2",
					x: 350,
					y: 350,
					width: 100,
					height: 100,
					type: "bounding_box",
				},
			],
		},
	],
};
