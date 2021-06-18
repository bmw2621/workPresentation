import useFetchData from "../hooks/useFetchData";
import UserCard from "./UserCard";

const GetUsers = () => {
  const { users, getUsers, clearUsers } = useFetchData();

  return (
    <article>
      <h1>Get Users</h1>
      {users && (
        <div id="allUsers">
          {users.map((user) => (
            <UserCard user={user} />
          ))}
        </div>
      )}
      {users && <button onClick={clearUsers}>Clear Users</button>}
      <button onClick={getUsers}>Get All Users</button>
      <hr />
    </article>
  );
};

export default GetUsers;
