import React, { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [gWeet, setGweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("gweets").add({
      gWeet,
      createdAt: Date.now(),
    });
    setGweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setGweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={gWeet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Gweet" />
      </form>
    </div>
  );
};
export default Home;
