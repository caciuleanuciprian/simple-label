export const drawBox = (
	context: CanvasRenderingContext2D,
	XYWH: { x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
) => {
	const { x, y, width, height } = XYWH;
	context.strokeStyle = color ?? "blue";
	context.lineWidth = lineWidth ?? 2;
	context.strokeRect(x, y, width, height);
};

export const drawBoxSelected = (
	context: CanvasRenderingContext2D,
	XYWH: { x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
) => {
	const { x, y, width, height } = XYWH;
	context.strokeStyle = color ?? "blue";
	context.lineWidth = lineWidth ?? 2;
	context.strokeRect(x, y, width, height);
};

export const drawBoxOverlay = (
	context: CanvasRenderingContext2D,
	XYWH: { x: number; y: number; width: number; height: number },
	color?: string,
	lineWidth?: number,
) => {
	const { x, y, width, height } = XYWH;
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
};
