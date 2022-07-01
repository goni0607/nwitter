import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useInput } from "hooks/useInput";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NweetFactory({ userObj }) {
  const [attachment, setAttachment] = useState(null);
  const nweet = useInput();
  // input[file] 파일 선택 후 저장이나 초기화 시 value 값을 지워주지 않으면
  // onChange 이벤트가 발생하지 않아 재선택이 되지 않는 문제가 발생함.
  // useRef로 직접 value 속성값을 초기화시켜서 해결함.
  const imageInputRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
        value={nweet.value}
        onChange={nweet.onChange}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        ref={imageInputRef}
      />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img
            src={attachment}
            alt="preview attach file"
            style={{ maxWidth: "480px" }}
          />
          <button onClick={onClearPhoto}>Clear Photo</button>
        </div>
      )}
      <div></div>
    </form>
  );
}
