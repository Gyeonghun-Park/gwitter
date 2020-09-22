import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="gweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container gweetEdit">
            <input
              type="text"
              placeholder="Edit your gweet"
              value={newGweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Gweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{gweetObj.text}</h4>
          {gweetObj.attachmentUrl && (
            <img src={gweetObj.attachmentUrl} alt="gweet" />
          )}
          {isOwner && (
            <div class="gweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gweet;
