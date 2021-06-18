import GetUserComponent from "./GetUser";
import GetAllUsersComponent from "./GetUsers";
import CreateUserComponent from "./CreateUser";

function App() {
  return (
    <>
      <header>Fetching data with ReactJS</header>
      <main>
        <GetAllUsersComponent />
        <GetUserComponent />
        <CreateUserComponent />
      </main>
    </>
  );
}

export default App;
