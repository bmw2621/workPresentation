<script>
    import UserCard from "./UserCard.svelte"
    let users;
    let fetchErr;

    const getUsers = () => {
        fetch("http://localhost:5000/user")
            .then(data => data.json())
            .then(data => users=data)
            .catch(err => fetchErr=err)
    }
</script>

<article>
    <h1>Get Users</h1>
    {#if users}
        <div id="allUsers">
            {#each users as user}
                <UserCard user={user} />
            {/each}
        </div>
        <button on:click={() => users = null}>Clear Users</button>
    {/if}
    <button on:click={getUsers}>Get All Users</button>
      <hr />
</article>

<style>
    #allUsers {
        min-width: 700px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>