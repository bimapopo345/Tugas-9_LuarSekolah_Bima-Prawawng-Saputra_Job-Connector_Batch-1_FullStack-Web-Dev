import React from "react";

const Note = ({
  id,
  text,
  editHandler,
  deleteHandler,
  bookmarkHandler,
  pinHandler,
  isBookmarked,
  isPinned,
}) => {
  return (
    <div className="note">
      <div className="note-body">{text}</div>
      <div className="note_footer">
        <button className="note_save" onClick={() => deleteHandler(id)}>
          Delete
        </button>{" "}
        &nbsp;
        <button className="note_save" onClick={() => editHandler(id, text)}>
          Edit
        </button>{" "}
        &nbsp;
        <button className="note_save" onClick={() => bookmarkHandler(id)}>
          {isBookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>{" "}
        &nbsp;
        <button className="note_save" onClick={() => pinHandler(id)}>
          {isPinned ? "Unpin" : "Pin"}
        </button>
      </div>
    </div>
  );
};

export default Note;
