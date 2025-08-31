import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
