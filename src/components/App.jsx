import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Loader from "./Loader";
import Error from "./Error";
import "../App.css";

const initialState = {
  questions: [],
  // States: 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceivedSuccess":
      return { ...state, status: "ready", questions: action.payload };
    case "dataReceivedFail":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "setAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          currentQuestion.correctOption === action.payload
            ? state.score + currentQuestion.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finishQuiz":
      return { ...state, status: "finished" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, score }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

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
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
              points={score}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            {answer !== null && (
              <NextButton
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
              />
            )}
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={score} totalPoints={totalPoints} />
        )}
      </Main>
    </div>
  );
}
