import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import "../App.css";

const initialState = {
  questions: [],
  // States: 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceivedSuccess":
      return { ...state, status: "ready", questions: action.payload };
    case "dataReceivedFail":
      return { ...state, status: "error" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceivedSuccess", payload: data }))
      .catch(() => dispatch({ type: "dataReceivedFail" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question placeholder</p>
      </Main>
    </div>
  );
}
