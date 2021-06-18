<script>
	import GetAllUsers from "./GetAllUsers.svelte"
    import GetUser from "./GetUser.svelte"
    import CreateUser from "./CreateUser.svelte"
</script>

<div id="root">
    <header>
        Fetching Data with SvelteJS
    </header>
    <main>
        <GetAllUsers />
        <GetUser />
        <CreateUser />  
    </main>
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>