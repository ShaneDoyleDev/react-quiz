export default function Options({ options, question, answer, dispatch }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer}
          onClick={() => dispatch({ type: "setAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
