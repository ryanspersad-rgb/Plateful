import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { wakeApi } from "@/lib/api";

wakeApi();

createRoot(document.getElementById("root")!).render(<App />);
