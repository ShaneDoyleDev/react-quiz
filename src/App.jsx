import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import "./App.css";

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, status: "ready", questions: action.payload };
    case "dataNotRecieved":
      return { ...state, status: "error" };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        dispatch({ type: "dataNotRecieved" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
