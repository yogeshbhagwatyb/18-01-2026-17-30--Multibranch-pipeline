import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>React Frontend</h1>
      <h3>{message}</h3>
    </div>
  );
}

export default App;