import React from "react";

const Header = ({ showBookmarkedOnly, toggleShowBookmarked }) => {
  return (
    <div className="header">
      <h1 className="title">Notes</h1>
      <button className="bookmark-toggle" onClick={toggleShowBookmarked}>
        {showBookmarkedOnly ? "Show All Notes" : "Show Bookmarked Notes"}
      </button>
    </div>
  );
};

export default Header;
