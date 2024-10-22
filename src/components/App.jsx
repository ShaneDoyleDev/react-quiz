import { useReducer } from "react";
import "../App.css";

const initialState = {};

function reducer(state, payload) {}

export default function App() {
  const [state, dispatch] = useReducer(initialState, reducer);
  return <div></div>;
}
