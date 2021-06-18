<script>
    export let error;
</script>

<div class="errorCard">
    {error}
</div>

<style>
    .errorCard {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid gray;
        margin: 10px;
        box-shadow: 5px 5px 10px gray;
        padding: 10px;
        width: 300px;
    }
</style>