import { useEffect, useReducer } from "react";
import Header from "./Header";
import "../App.css";

const initialState = {
  questions: [],
};

function reducer(state, payload) {}

export default function App() {
  const [state, dispatch] = useReducer(initialState, reducer);
  return (
    <div className="app">
      <Header />
    </div>
  );
}
