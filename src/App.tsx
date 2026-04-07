import image from "@/images/test1.jpg";
import { SimpleLabel } from "@/components/custom/SimpleLabel";
import { config } from "./constants/config";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
	return (
		<TooltipProvider>
			<SimpleLabel image={image} config={config} />
		</TooltipProvider>
	);
}

export default App;
