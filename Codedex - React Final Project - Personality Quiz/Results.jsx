import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, dogImage, loading }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong> your element is: {element}
      </p>

      {loading ? (
        <p>Loading dog image...</p>
      ) : dogImage ? (
        <div className="artwork">
          <img src={dogImage} alt="Dog" style={{ maxWidth: "300px" }} />
        </div>
      ) : (
        <p>Failed to fetch dog image.</p>
      )}
    </div>
  );
}
