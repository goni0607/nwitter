import React, { useState } from "react";
import { doc, deleteDoc, runTransaction, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { ref, deleteObject } from "firebase/storage";
import { useInput } from "hooks/useInput";

export default function Nweet({ nweet, isOnwer }) {
  const [isEditing, setIsEditing] = useState(false);
  const editNweet = useInput(nweet.text);
  /**
   * 삭제 버튼 클릭 이벤트
   */
  const onDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this nweet?")) {
      await deleteDoc(doc(dbService, "nweets", nweet.id));
      if (nweet.attachmentUrl) {
        const attachmentRef = ref(storageService, nweet.attachmentUrl);
        await deleteObject(attachmentRef);
      }
    }
  };
  /**
   * 수정 버튼 클릭 이벤트
   * 수정 모드로 변경한다.
   */
  const onEditClick = () => setIsEditing(true);
  /**
   * 수정 취소 버튼 클릭 이벤트
   * 수정 모드를 취소한다.
   */
  const onEditCancelClick = () => setIsEditing(false);
  /**
   * 폼 전송 이벤트
   * 수정 모드에서 내용을 수정 후 Nweet 내용을 수정한다.
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const sfDocRef = doc(dbService, "nweets", nweet.id);
    await updateDoc(sfDocRef, {
      text: editNweet.value,
      updatedAt: Date.now(),
    });
    setIsEditing(false);
    /* transaction 사용
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
    */
  };

  return (
    <li>
      {!isEditing && (
        <>
          <p>{nweet.text}</p>
          {nweet.attachmentUrl && (
            <>
              <img src={nweet.attachmentUrl} style={{ maxWidth: "440px" }} />
            </>
          )}
        </>
      )}
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
