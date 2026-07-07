interface Props {
  endpoints: string[];
}

function EndpointList({ endpoints }: Props) {
  return (
    <div>
      <h3>Endpoints</h3>

      <ul>
        {endpoints.map((endpoint, index) => (
          <li key={index}>{endpoint}</li>
        ))}
      </ul>
    </div>
  );
}

export default EndpointList;