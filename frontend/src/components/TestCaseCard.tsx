interface Props {
  endpoint: string;
}

function TestCaseCard({ endpoint }: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{endpoint}</h3>

      <h4>Positive Test</h4>
      <p>Verify valid request returns success.</p>

      <h4>Negative Test</h4>
      <p>Verify invalid data returns error.</p>

      <h4>Boundary Test</h4>
      <p>Verify edge cases are handled correctly.</p>
    </div>
  );
}

export default TestCaseCard;