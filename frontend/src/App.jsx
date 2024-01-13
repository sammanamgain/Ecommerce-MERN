import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1> this is rendering </h1>
      <h2>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        consectetur aut omnis, labore enim perspiciatis sapiente, exercitationem
        quibusdam earum ab harum, sed eligendi eveniet perferendis quas
        repellendus consequatur. Omnis, iure.
      </h2>
    </>
  );
}

export default App;
