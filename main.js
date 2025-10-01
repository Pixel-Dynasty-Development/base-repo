import Home from "./pages/Home.js";
import ExampleComponent from "./components/ExampleComponent.js";

document.getElementById("app").innerHTML = `
    <h1>Welcome to the Base Template!</h1>
    ${Home()}
    ${ExampleComponent()}
`;
//TODO Add your JavaScript code here