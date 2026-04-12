import { Button } from "@/components/ui";
import { Trash, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { useAnnotations } from "@/providers/AnnotationsProvider";

type ActionsProps = {
	clearAnnotations: () => void;
	clearSelectedAnnotation: () => void;
};

export type ActionsRef = {
	clearAnnotations: () => void;
	clearSelectedAnnotation: () => void;
};

// NOTE: Z-index of this component should be the highest.
export const CanvasActions = (props: ActionsProps) => {
	const { annotations, selectedAnnotation } = useAnnotations();
	const { clearAnnotations, clearSelectedAnnotation } = props;

	return (
		<div className="absolute top-2 right-2 z-11">
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							onClick={(event) => {
								event.stopPropagation();
								clearAnnotations();
							}}
							disabled={!annotations || annotations.length === 0}
						>
							<Trash />
						</Button>
					}
				/>
				<TooltipContent>{`Clear ${annotations ? annotations.length : 0} annotations`}</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							onClick={(event) => {
								event.stopPropagation();
								clearSelectedAnnotation();
							}}
							disabled={!selectedAnnotation}
						>
							<Trash2 />
						</Button>
					}
				/>
				<TooltipContent>Clear selected annotation</TooltipContent>
			</Tooltip>
		</div>
	);
};
