import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import OfflineNotifier from "./widgets/custom-widgets/offline-notifier";
import Toast from './components/toasts';
import { Provider } from 'react-redux';
import configureStores from '../src/store/index';
import AuthRedirector from './components/auth-redirector';

const { store } = configureStores();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <OfflineNotifier/>
          <Toast/>
          <MaterialTailwindControllerProvider>
            <AuthRedirector>
            <App />
            </AuthRedirector>
          </MaterialTailwindControllerProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
