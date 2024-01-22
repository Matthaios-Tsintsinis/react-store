import { useState } from "react";

function ShwMore({ wordLimit, text, className = "" }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <p className={className}>
        {showMore
          ? text
          : text.length > wordLimit
          ? text.slice(0, wordLimit) + "..."
          : text}
        <span
          style={{ cursor: "pointer", color: "black" }}
          onClick={() => setShowMore(!showMore)}
        >
          {text.length > wordLimit
            ? showMore
              ? " Show less"
              : "Show more"
            : ""}
        </span>
      </p>
    </div>
  );
}

export default ShwMore;
