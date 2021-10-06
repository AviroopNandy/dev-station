import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DevStationProvider } from "./helpers/Context";

import "./index.css";

ReactDOM.render(
    <DevStationProvider>
        <App />
    </DevStationProvider>,
    document.getElementById("root")
);