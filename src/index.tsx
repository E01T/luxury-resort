import reportWebVitals from './reportWebVitals';

import ReactDOM from "react-dom";
import App from "./App";
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <RoomProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RoomProvider>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
