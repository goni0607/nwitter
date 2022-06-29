import React, { useState } from "react";
import { doc, deleteDoc, runTransaction } from "firebase/firestore";
import { dbService } from "fbase";
import { useInput } from "hooks/useInput";

export default function Nweet({ nweet, isOnwer }) {
  const [isEditing, setIsEditing] = useState(false);
  const editNweet = useInput(nweet.text);
  const onDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this nweet?")) {
      await deleteDoc(doc(dbService, "nweets", nweet.id));
    }
  };
  const onEditClick = () => setIsEditing(true);
  const onEditCancelClick = () => setIsEditing(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    const sfDocRef = doc(dbService, "nweets", nweet.id);
    try {
      await runTransaction(dbService, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          window.alert("Nweet does not exist!");
          return;
        }
        transaction.update(sfDocRef, {
          text: editNweet.value,
          updatedAt: Date.now(),
        });
      });
      setIsEditing(false);
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }
  };

  return (
    <li>
      {!isEditing && nweet.text}
      {isOnwer && (
        <>
          {isEditing && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={editNweet.value}
                  onChange={editNweet.onChange}
                  required
                  placeholder="Edit you want it"
                />
                <button>Update Nweet</button>
                <button onClick={onEditCancelClick}>cancel</button>
              </form>
            </>
          )}
          <div>
            <button onClick={onEditClick}>Edit Nweet</button>
            <button onClick={onDeleteClick}>Delete Nweet</button>
          </div>
        </>
      )}
    </li>
  );
}
