import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [gweet, setGweet] = useState("");
  const [gweets, setGweets] = useState([]);

  useEffect(() => {
    dbService.collection("gweets").onSnapshot((snapshot) => {
      const gweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGweets(gweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("gweets").add({
      text: gweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
          value={gweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="gweet" />
      </form>
      <div>
        {gweets.map((gweet) => (
          <div key={gweet.id}>
            <h4>{gweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
