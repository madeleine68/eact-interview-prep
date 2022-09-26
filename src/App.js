import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import axios from "axios";

const getUserFullname = (userInfo) => {
  const {
    name: { first, last }
  } = userInfo;
  return `${first} ${last}`;
};
const fetchUserData = (pageNumber) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.error(err));
};
//https://randomuser.me/api
export default function App() {
  const [counter, setCounter] = useState(0);
  // const [randomUserData, setRandomUserData] = useState("");
  const [userInfo, setUserInfos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNextuser = useRef(() => {});
  fetchNextuser.current = () => {
    fetchUserData(pageNumber).then((randomData) => {
      if (randomData === undefined) return;
      // const newUser = [...userInfo, ...randomData.results,];
      setUserInfos([...userInfo, ...randomData.results]);
      console.log(userInfo);
      setPageNumber(randomData.results.page + 1);
    });
  };

  useEffect(() => {
    fetchNextuser.current();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {userInfo.map((user, id) => (
        <>
          <p key={id}>{getUserFullname(user)}</p>
          <img src={user.picture.thumbnail} alt="user" />
        </>
      ))}

      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment by one</button>
      <button onClick={() => fetchNextuser.current()}>
        {" "}
        get a random user
      </button>
    </div>
  );
}
