export default function NextButtton({ dispatch }) {
  return (
    <button
      className="btn  btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
