<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Главная" @tap="$router.push('/home')">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>

    <StackLayout class="hello-world">
      <Label color="white" fontSize="25" textWrap=true textAlignment="center" text="Привет"/>

      <Button class="btn btn-primary" @tap="$router.push('/home')" text="начать"/>
      <Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>

    </StackLayout>

  </Page>
</template>

<script>
  export default {
    data () {
      return {
        surprise: false,
      };
    },

    mounted(){

      setTimeout(()=>{this.$router.push('/home')},200)

    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
</style>
