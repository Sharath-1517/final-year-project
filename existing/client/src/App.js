import "./App.css";
import { BrowserRouter } from "react-router-dom";

//import components
import Main from "./components/main";

function App() {
	return (
		<BrowserRouter>
			<div className="">
				<Main />
			</div>
		</BrowserRouter>
	);
}

export default App;
