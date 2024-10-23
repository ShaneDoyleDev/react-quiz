export default function FinishScreen({ points, totalPoints }) {
  const percentage = ((points / totalPoints) * 100).toFixed(2);
  return (
    <p>
      You scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
    </p>
  );
}
