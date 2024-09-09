import React, { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import "./notes.css";
import { v4 as uuid } from "uuid";
import Note from "./Note";
import Header from "./Header"; // Import the Header component

const Notes = () => {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false); // State to filter bookmarked notes

  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  const saveHandler = () => {
    if (editToggle) {
      setNotes(
        notes.map((note) =>
          note.id === editToggle ? { ...note, text: inputText } : note
        )
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
          isPinned: false,
          isBookmarked: false,
        },
      ]);
    }
    setInputText("");
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };

  const bookmarkHandler = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isBookmarked: !note.isBookmarked } : note
      )
    );
  };

  const pinHandler = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const toggleShowBookmarked = () => {
    setShowBookmarkedOnly(!showBookmarkedOnly); // Toggle filter for bookmarked notes
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // Filter notes based on pin and bookmark status
  const sortedNotes = [
    ...notes.filter((note) => note.isPinned),
    ...notes.filter((note) => !note.isPinned),
  ];

  // Filter notes based on whether the user wants to see only bookmarked notes
  const displayedNotes = showBookmarkedOnly
    ? sortedNotes.filter((note) => note.isBookmarked)
    : sortedNotes;

  return (
    <div>
      <Header
        showBookmarkedOnly={showBookmarkedOnly}
        toggleShowBookmarked={toggleShowBookmarked}
      />
      <div className="notes">
        {displayedNotes.map((note) =>
          editToggle === note.id ? (
            <CreateNote
              inputText={inputText}
              setInputText={setInputText}
              saveHandler={saveHandler}
            />
          ) : (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              isBookmarked={note.isBookmarked}
              isPinned={note.isPinned}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
              bookmarkHandler={bookmarkHandler}
              pinHandler={pinHandler}
            />
          )
        )}
        {editToggle === null ? (
          <CreateNote
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Notes;
