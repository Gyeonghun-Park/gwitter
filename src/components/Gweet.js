import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Gweet = ({ gweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newGweet, setNewGweet] = useState(gweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this gweet?");
    if (ok) {
      await dbService.doc(`gweets/${gweetObj.id}`).delete();
      await storageService.refFromURL(gweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`gweets/${gweetObj.id}`).update({
      text: newGweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewGweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your gweet"
              value={newGweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update gweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{gweetObj.text}</h4>
          {gweetObj.attachmentUrl && (
            <img
              src={gweetObj.attachmentUrl}
              alt="gweet"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete gweet</button>
              <button onClick={toggleEditing}>Edit gweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Gweet;
