import React from "react";
import { NavLink } from "react-router-dom";

const TaskNav = (probs) => {
  return (
    <div className="nav">
      <NavLink to="/All" className="nav-link" onClick={() => probs.click('All')}>
        All
      </NavLink>
      <NavLink to="/Active" className="nav-link" onClick={() => probs.click('Active')}>
        Active
      </NavLink>
      <NavLink to="/Complete" className="nav-link" onClick={() => probs.click('Complete')}>
        Completed
      </NavLink>
    </div>
  );
};

export default TaskNav;
