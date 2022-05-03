<script>
  import Router from "svelte-spa-router";
  import routes from "./router";
  //export let name;
</script>

<body>
  <Router {routes} />
</body>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
