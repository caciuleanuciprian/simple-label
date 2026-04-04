import image from "@/images/test1.jpg";
import { SimpleLabel } from "./components/custom/SimpleLabel";
import { config } from "./constants/config";

function App() {
	return <SimpleLabel image={image} config={config} />;
}

export default App;
