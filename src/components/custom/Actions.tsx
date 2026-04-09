import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useActions } from "@/providers/ActionsProvider";

type ActionsProps = {
	clearAnnotations: () => void;
	clearSelectedAnnotation: () => void;
};

export type ActionsRef = {
	clearAnnotations: () => void;
	clearSelectedAnnotation: () => void;
};

// NOTE: Z-index of this component should be the highest.
export const Actions = (props: ActionsProps) => {
	const { annotations } = useActions();
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
							disabled={annotations.numOfAnnotations === 0}
						>
							<Trash />
						</Button>
					}
				/>
				<TooltipContent>{`Clear ${annotations.numOfAnnotations} annotations`}</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							onClick={(event) => {
								event.stopPropagation();
								clearSelectedAnnotation();
							}}
							disabled={!annotations.selectedAnnotation}
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
