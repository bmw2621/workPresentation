const UserCard = ({ user }) => (
  <div className="userCard">
    <div className="userId">{user.id}</div>
    <div className="userData">
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.age}</div>
      <div>{`${user.firstName} is${
        user.isBamaFan ? "" : " not"
      } a Bama Fan`}</div>
    </div>
  </div>
);

export default UserCard;
