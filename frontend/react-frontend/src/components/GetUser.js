import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import UserCard from "./UserCard";
import ErrorCard from "./ErrorCard";

const GetUser = () => {
  const [userId, setUserId] = useState(null);
  const { user, getUser, userError, clearUser } = useFetchData();

  const handleClick = (e) => {
    if (!Number.isNaN(userId)) getUser(userId);
  };

  return (
    <article>
      <h1>Get User</h1>
      {user && <UserCard user={user} />}
      {userError && <ErrorCard error={userError} />}
      {user && <button onClick={clearUser}>Clear User</button>}
      <input
        type="number"
        min="1"
        id="searchUserId"
        onChange={(e) => setUserId(parseInt(e.target.value))}
      />
      <button onClick={handleClick}>Get user</button>
      <hr />
    </article>
  );
};

export default GetUser;
