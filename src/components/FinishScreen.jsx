export default function FinishScreen({ points, totalPoints }) {
  const percentage = ((points / totalPoints) * 100).toFixed(2);

  function getEmoji(percentage) {
    if (percentage >= 80) return "🥇";
    if (percentage >= 60) return "🥈";
    if (percentage >= 40) return "🥉";
    if (percentage >= 20) return "😐";
    return "😢";
  }

  return (
    <p>
      You scored <strong>{points}</strong> out of {totalPoints} ({percentage}%){" "}
      {getEmoji(parseFloat(percentage))}
    </p>
  );
}
