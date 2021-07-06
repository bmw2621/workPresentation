import { useState } from "react";

const useFetchData = () => {
  const [userError, setUserError] = useState(null);
  const [usersError, setUsersError] = useState();
  const [users, setUsers] = useState();
  const [user, setUser] = useState();

  const getUser = (id) => {
    setUser(null);
    fetch(`http://localhost:5000/user/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setUserError(null);
        setUser(data);
      })
      .catch(() => setUserError("User id does not exist"));
  };

  const getUsers = async () => {
    let data = await fetch(`http://localhost:5000/user`);
    if (data.status !== 200) {
      setUsersError("Failed to fetch users");
    } else {
      data = await data.json();
      setUsers(data);
    }
  };

  const clearUsers = () => {
    setUsers(null);
  };

  const clearUser = () => {
    setUser(null);
  };

  return {
    userError,
    usersError,
    users,
    user,
    getUser,
    getUsers,
    clearUsers,
    clearUser,
  };
};

export default useFetchData;
