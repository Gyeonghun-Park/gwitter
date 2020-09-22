import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Gweet from "../components/Gweet";
import GweetFactory from "../components/GweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <GweetFactory userObj={userObj} />
      <div>
        {gweets.map((gweet) => (
          <Gweet
            key={gweet.id}
            gweetObj={gweet}
            isOwner={gweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
