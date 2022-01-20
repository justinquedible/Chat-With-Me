import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/Navigation";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtDZGfqTvTAJ_qb-rIqJCuR5sptJrGNuw",
  authDomain: "omegle-app-28aed.firebaseapp.com",
  projectId: "omegle-app-28aed",
  storageBucket: "omegle-app-28aed.appspot.com",
  messagingSenderId: "792607975915",
  appId: "1:792607975915:web:d2e004b0fefdda0cd751ae",
  measurementId: "G-JME17M71XC",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
