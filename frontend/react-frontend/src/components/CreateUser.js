import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFirstName":
      return { ...state, firstName: action.payload };
    case "updateLastName":
      return { ...state, lastName: action.payload };
    case "updateAge":
      return { ...state, age: action.payload };
    case "updateFanStatus":
      return { ...state, isBamaFan: action.payload };
    default:
      return state;
  }
};

const CreateUser = () => {
  const [userState, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    age: null,
    isBamaFan: false,
  });

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.style.padding = "10px";
    toast.style.marginTop = "10px";
    toast.style.position = "absolute";
    toast.style.top = "50px";
    toast.style.right = "20px";
    toast.style.zIndex = 100;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  const handleClick = () => {
    if (
      userState.firstName !== "" &&
      userState.lastName !== "" &&
      userState.age
    ) {
      fetch("http://localhost:5000/user", {
        method: "POST",
        body: JSON.stringify(userState),
      })
        .then(() => {
          showToast("User Created");
        })
        .catch(() => showToast("User Creation Failed"));
    } else {
      showToast("Missing field values");
    }
  };

  return (
    <article>
      <h1>Create User</h1>
      <input
        type="text"
        value={userState.firstName}
        placeholder="firstName"
        onChange={(e) =>
          dispatch({ type: "updateFirstName", payload: e.target.value })
        }
      />
      <input
        type="text"
        value={userState.lastName}
        placeholder="lastName"
        onChange={(e) =>
          dispatch({ type: "updateLastName", payload: e.target.value })
        }
      />
      <input
        type="number"
        min="0"
        placeholder="age"
        onChange={(e) =>
          dispatch({ type: "updateAge", payload: parseInt(e.target.value) })
        }
      />
      <label htmlFor="bamaFan">
        Bama Fan?
        <input
          type="checkbox"
          id="bamaFan"
          name="bamaFan"
          onChange={(e) =>
            dispatch({ type: "updateFanStatus", payload: e.target.checked })
          }
        />
      </label>
      <button onClick={handleClick}>Create User</button>
    </article>
  );
};

export default CreateUser;
