import { createRoot } from "react-dom/client"
import App from "@/app/App.tsx"

const app = document.getElementById("root")

try {
	createRoot(app).render(<App />)
} catch (e) {
	console.log("App-Error")
}
