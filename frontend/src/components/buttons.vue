<template>
    <div class=buttons>
      <button type="submit" class="buttons__Login">Login</button>
      <button type="submit" class="buttons__Signup">Sign up</button>
    </div>
</template>

<script>
export default {
  name: 'buttons',
  props: {
    msg: String
  }
}
</script>