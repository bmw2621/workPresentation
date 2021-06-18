<script>
    let firstName;
    let lastName;
    let age;
    let isBamaFan = false;

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

    const createUser = () => {
        if (
            firstName !== "" &&
            firstName &&
            lastName !== "" &&
            lastName &&
            age
        ) {
            fetch("http://localhost:5000/user", {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    age,
                    isBamaFan
                }),
            })
                .then(() => {
                showToast("User Created");
                })
                .catch(() => showToast("User Creation Failed"));
            } else {
            showToast("Missing field values");
            }
        }

</script>

<article>
    <h1>Create User</h1>
    <input
        type="text"
        bind:value={firstName}
        placeholder="firstName"

      />
      <input
        type="text"
        bind:value={lastName}
        placeholder="lastName"
      />
      <input
        type="number"
        min="0"
        placeholder="age"
        bind:value={age}
      />
      <label for="bamaFan">
        Bama Fan?
        <input
          type="checkbox"
          id="bamaFan"
          name="bamaFan"
            bind:checked={isBamaFan}
        />
      </label>
      <button on:click={createUser}>Create User</button>
</article>
<style></style>