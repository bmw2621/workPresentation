<script>
    import UserCard from "./UserCard.svelte"
    import ErrorCard from "./ErrorCard.svelte"

    let user;
    let fetchErr;
    let userId;
    const getUser = () => {
        
        fetch(`http://localhost:5000/user/${userId}`)
            .then(data => data.json())
            .then(data => {
                user = data
                fetchErr = null
            })
            .catch(err => {
                user = null
                fetchErr = "User id does not exist"
            })
    }
</script>

<article>
    <h1>Get User</h1>
    {#if user}
        <UserCard user={user} />
        <button on:click={() => user=null}>Clear User</button>
    {/if}
    {#if fetchErr}
        <ErrorCard error={fetchErr} />
    {/if}
    <input type="number" min="1" id="searchUserId" bind:value={userId}>
    <button on:click={getUser}>Get User</button>
      <hr /> 
</article>
<style></style>