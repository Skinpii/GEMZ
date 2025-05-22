import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ onToggle, checked, leftLabel = "Movie", rightLabel = "Anime" }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    if (onToggle) onToggle(e.target.checked);
  };

  return (
    <div className="toggle-switch-wrapper" style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
      <span className="toggle-label">{leftLabel}</span>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className="slider"></span>
      </label>
      <span className="toggle-label">{rightLabel}</span>
    </div>
  );
};

export default ToggleSwitch;
