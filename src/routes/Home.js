import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
  const [gweet, setGweet] = useState("");
  const [gweets, setGweets] = useState([]);

  const getGweets = async () => {
    const dbGweets = await dbService.collection("gweets").get();
    dbGweets.forEach((document) => {
      const gweetObject = {
        ...document.data(),
        id: document.id,
      };
      setGweets((prev) => [gweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getGweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("gweets").add({
      gweet,
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
            <h4>{gweet.gweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
