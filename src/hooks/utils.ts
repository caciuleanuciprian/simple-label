import type { Config } from "@/constants/config";
import type { TaskType } from "@/constants/task";

const DEBUG_FONT_SIZE = 12;

const drawDebugInfo = (
	context: CanvasRenderingContext2D,
	XYWHID: { id?: string; x: number; y: number; width: number; height: number },
) => {
	const { id, x, y, width, height } = XYWHID;
	const { x: centerX, y: centerY } = getBoxCenter(XYWHID);
	context.font = `${DEBUG_FONT_SIZE}px Arial`;
	context.fillStyle = "blue";
	context.textAlign = "center";
	const debugText = `
						id: ${id};\n
						originX: ${x};\n
						originY: ${y};\n
						w: ${width};\n
						h: ${height};\n
						centerX: ${centerX};\n
						centerY: ${centerY};
					`;
	const debugLines = debugText
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
	debugLines.forEach((line, index) => {
		context.fillText(
			line,
			x + width / 2,
			y +
				(height / 2 - ((debugLines.length - 1) * DEBUG_FONT_SIZE) / 2) +
				index * DEBUG_FONT_SIZE,
		);
	});
};

const getBoxCenter = (box: {
	id?: string;
	x: number;
	y: number;
	width: number;
	height: number;
}) => {
	return {
		x: box.x + box.width / 2,
		y: box.y + box.height / 2,
	};
};

export const loadConfigAnnotations = (config: Config, taskType: TaskType) => {
	const task = config.tasks.find((t) => t.type === taskType);
	if (!task) return [];
	return task.values;
};

export const drawBox = (
	context: CanvasRenderingContext2D,
	XYWHID: { id?: string; x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
	withDebug?: boolean,
) => {
	const { x, y, width, height } = XYWHID;
	context.strokeStyle = color ?? "blue";
	context.lineWidth = lineWidth ?? 2;
	context.strokeRect(x, y, width, height);
	if (withDebug) {
		drawDebugInfo(context, XYWHID);
	}
};

export const drawBoxSelected = (
	context: CanvasRenderingContext2D,
	XYWHID: { id?: string; x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
	withDebug?: boolean,
) => {
	const { x, y, width, height } = XYWHID;
	context.strokeStyle = color ?? "blue";
	context.lineWidth = lineWidth ?? 2;
	context.strokeRect(x, y, width, height);
	if (withDebug) {
		drawDebugInfo(context, XYWHID);
	}
};

export const drawBoxOverlay = (
	context: CanvasRenderingContext2D,
	XYWHID: { id?: string; x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
	withDebug?: boolean,
) => {
	const { x, y, width, height } = XYWHID;
	context.save();
	context.beginPath();
	context.lineWidth = lineWidth ?? 0.5;
	context.setLineDash([7, 2]);
	context.rect(x, y, width, height);
	context.globalAlpha = 0.2;
	context.fillStyle = color ?? "blue";
	context.fillRect(x, y, width, height);
	context.strokeStyle = color ?? "blue";
	context.stroke();
	context.globalAlpha = 1.0;
	context.restore();
	if (withDebug) {
		drawDebugInfo(context, XYWHID);
	}
};
