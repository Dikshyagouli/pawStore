import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS (for navbar toggler/collapse)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Bootstrap Icons (optional but useful)
import "bootstrap-icons/font/bootstrap-icons.css";

// // Global CSS
// import "./../src/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
