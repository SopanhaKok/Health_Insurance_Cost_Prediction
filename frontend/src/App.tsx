import LoadingScreen from "components/LoadingScreen";
import AlertProvider from "contexts/AlertContext";
import LanguageProvider from "contexts/LanguageContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "redux/store";
import AppRoutes from "routes";
import "styles/global.css";
import AppThemeProvider from "themes";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppThemeProvider>
          <LanguageProvider>
            <AlertProvider>
              <AppRoutes />
            </AlertProvider>
          </LanguageProvider>
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
