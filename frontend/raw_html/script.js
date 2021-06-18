const fetchAllUserData = async () => {
  const data = await fetch("http://localhost:5000/user").then((x) => x.json());
  addAllUsersToDom(data);
};

const fetchUserData = async () => {
  const userId = document.getElementById("searchUserId").value;
  let data = await fetch(`http://localhost:5000/user/${userId}`);
  if (data.status === 404) {
    addErrorToDom();
  } else {
    data = await data.json();
    addUserToDom(data);
  }
};

const createUser = async () => {
  const newUser = {
    firstName: document.getElementById("firstNameInput").value,
    lastName: document.getElementById("lastNameInput").value,
    age: parseInt(document.getElementById("ageInput").value),
    isBamaFan: document.getElementById("bamaFan").checked,
  };

  if (
    newUser.firstName !== "" &&
    newUser.lastName !== "" &&
    !Number.isNaN(newUser.age)
  ) {
    fetch(`http://localhost:5000/user`, {
      method: "POST",
      body: JSON.stringify(newUser),
    }).then((data) =>
      data.status !== 201 ? console.error(data) : userCreated()
    );
  } else {
    console.warn("missing user data");
  }
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function addAllUsersToDom(data) {
  const userDataElement = document.getElementById("allUserData");
  userDataElement.innerHTML = "";
  data.forEach((user) => {
    const newUserElement = document.createElement("div");
    newUserElement.className = "user";

    const newUserIdElement = document.createElement("div");
    newUserIdElement.innerHTML = user.id;
    newUserIdElement.className = "userid";
    newUserElement.appendChild(newUserIdElement);

    const newUserDataElement = document.createElement("div");

    const newUserFirstName = document.createElement("div");
    newUserFirstName.innerHTML = user.firstName;
    newUserDataElement.appendChild(newUserFirstName);

    const newUserLastName = document.createElement("div");
    newUserLastName.innerHTML = user.lastName;
    newUserDataElement.appendChild(newUserLastName);

    const newUserAge = document.createElement("div");
    newUserAge.innerHTML = user.age;
    newUserDataElement.appendChild(newUserAge);

    const newUserBamaFan = document.createElement("div");
    newUserBamaFan.innerHTML = `${user.firstName} is ${
      user.isBamaFan ? " " : "not "
    }an Alabama Fan`;
    newUserDataElement.appendChild(newUserBamaFan);

    newUserElement.appendChild(newUserDataElement);

    userDataElement.appendChild(newUserElement);
  });
  const clearButton = document.createElement("button");
  clearButton.onclick = (e) => clearData(e, "allUserData");
  clearButton.style.marginBottom = "10px";
  clearButton.innerHTML = "Clear";

  userDataElement.parentElement.insertBefore(
    clearButton,
    userDataElement.nextSibling
  );

  userDataElement.style.display = "inherit";
}

function clearData(e, elId) {
  el = document.getElementById(elId);
  el.innerHTML = "";
  el.style.display = "none";
  e.target.remove();
}

function addUserToDom(data) {
  const userDataElement = document.getElementById("userData");
  userDataElement.innerHTML = "";

  userDataElement.style.display = "inherit";
  const newUserElement = document.createElement("div");
  newUserElement.className = "user";

  const newUserIdElement = document.createElement("div");
  newUserIdElement.innerHTML = data.id;
  newUserIdElement.className = "userid";
  newUserElement.appendChild(newUserIdElement);

  const newUserDataElement = document.createElement("div");

  const newUserFirstName = document.createElement("div");
  newUserFirstName.innerHTML = data.firstName;
  newUserDataElement.appendChild(newUserFirstName);

  const newUserLastName = document.createElement("div");
  newUserLastName.innerHTML = data.lastName;
  newUserDataElement.appendChild(newUserLastName);

  const newUserAge = document.createElement("div");
  newUserAge.innerHTML = data.age;
  newUserDataElement.appendChild(newUserAge);

  const newUserBamaFan = document.createElement("div");
  newUserBamaFan.innerHTML = `${data.firstName} is ${
    data.isBamaFan ? " " : "not "
  }an Alabama Fan`;
  newUserDataElement.appendChild(newUserBamaFan);

  newUserElement.appendChild(newUserDataElement);

  userDataElement.appendChild(newUserElement);
}

function addErrorToDom() {
  const userDataElement = document.getElementById("userData");
  userDataElement.innerHTML = "User with id does not exist";

  const clearButton = document.createElement("button");
  clearButton.onclick = (e) => clearData(e, "userData");
  clearButton.style.marginBottom = "10px";
  clearButton.innerHTML = "Clear";

  userDataElement.parentElement.insertBefore(
    clearButton,
    userDataElement.nextSibling
  );

  userDataElement.style.display = "inherit";
}

function userCreated() {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.style.padding = "10px";
  toast.style.marginTop = "10px";

  toast.innerHTML = "User Created!";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
