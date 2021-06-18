<script>
    export let user;
</script>

<div class="userCard">
    <div class="userId">{user.id}</div>
    <div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.age}</div>
      <div>{`${user.firstName} is${
        user.isBamaFan ? "" : " not"
      } a Bama Fan`}</div>
    </div>
  </div>

  <style>
    .userCard{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid gray;
        margin: 10px;
        box-shadow: 5px 5px 10px gray;
        padding: 10px;
        width: 300px;
    }
    .userId {
        padding-right: 50px;
        color: rgb(35, 57, 181);
        font-weight: bolder;
        font-size: 1.5rem;
    }
  </style>