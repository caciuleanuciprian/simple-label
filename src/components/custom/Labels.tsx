import type { TaskConfig } from "@/constants/config";
import { Badge } from "@/components/ui";
import React from "react";
import { useConfig } from "@/providers/ConfigProvider";

export const Tasks = () => {
	const { config } = useConfig();
	return (
		<div className="p-2">
			{config.tasks.map((task) => (
				<div key={task.id}>
					<p className="font-bold">{task.name}</p>
					<Labels {...task} />
				</div>
			))}
		</div>
	);
};

type LabelsProps = TaskConfig;

export const Labels = (props: LabelsProps) => {
	const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);
	const { labels } = props;
	return (
		<div className="flex gap-2">
			{labels.map((label) => (
				<Badge
					key={label.id}
					style={{
						backgroundColor: label.color,
						opacity: selectedLabel === label.id ? 1 : 0.5,
					}}
					className="cursor-pointer"
					onClick={() => {
						if (selectedLabel === label.id) {
							setSelectedLabel(null);
						} else {
							setSelectedLabel(label.id);
						}
					}}
				>
					{label.name}
				</Badge>
			))}
		</div>
	);
};
