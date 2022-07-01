import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useInput } from "hooks/useInput";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NweetFactory({ userObj }) {
  const [attachment, setAttachment] = useState(null);
  const nweet = useInput();
  // input[file] 파일 선택 후 저장이나 초기화 시 value 값을 지워주지 않으면
  // onChange 이벤트가 발생하지 않아 재선택이 되지 않는 문제가 발생함.
  // useRef로 직접 value 속성값을 초기화시켜서 해결함.
  const imageInputRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet.value === "") {
      return;
    }
    const nweetObj = {
      text: nweet.value,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    };
    if (attachment !== null) {
      const storageRef = ref(
        storageService,
        `images/${userObj.uid}/${uuidv4()}`
      );
      const response = await uploadString(storageRef, attachment, "data_url");
      nweetObj.attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "nweets"), nweetObj);
    nweet.changeValue("");
    imageInputRef.current.value = "";
    setAttachment(null);
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhoto = () => {
    imageInputRef.current.value = "";
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet.value}
          onChange={nweet.onChange}
          required
        />
        <input
          type="submit"
          value="&rarr;"
          aria-label="Nweet"
          className="factoryInput__arrow"
        />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        ref={imageInputRef}
        style={{ opacity: 0 }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="preview attach file"
            style={{ backgroundImage: attachment }}
          />
          <button className="factoryForm__clear" onClick={onClearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </form>
  );
}
