import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import { initializeAgora } from "./src/services/agoraService";

export default function App() {
  React.useEffect(() => {
    initializeAgora();
  }, []);

  return <AppNavigator />;
}
