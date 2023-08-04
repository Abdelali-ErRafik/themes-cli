<template>
  <!-- We use this file to load application from our store to theme -->
    <div :id="placement"></div>
</template>

<script>
export default {
  props: { placement: String },
  data() {
    return {
      loading: false
    }
  },
  async mounted() {
    if (this.$store.state.apps) {
      let apps = this.$store.state.apps.filter(app => app.placement.split('|').indexOf(this.placement) > -1);
      if (apps.length > 0) {
        this.loading = true;
        const element = document.querySelector(`#${this.placement}`);
        for (let index = 0; index < apps.length; index++) {
          const app = apps[index];
          this.loadApp(app, element);
        }
      };
      this.loading = false;
    }
  },
  methods: {
    async loadApp(app, element) {
      if (!element) return;
      const uid = `${app.route}_${this.placement}`;
      if (!app[`loaded_${uid}`]) {
        try {
          const stateApp = this.$store.state.apps.find(a => a.route === app.route);
          let { manifest, html, css, js } = this.$tools.copy(stateApp.loaded);
          js = js.replace("__DATA__", JSON.stringify({ placement: this.placement, ...app.config }).replace(/\"/g, '"'));
          html = html.replace(new RegExp(`app_${app.route}`, "g"), `app_${app.route}_${uid}`);
          css = css.replace(new RegExp(`#app_${app.route}`, "g"), `#app_${app.route}_${uid}`);
          js = js.replace(new RegExp(`app_${app.route}`, "g"), `app_${app.route}_${uid}`);
          app[`loaded_${uid}`] = { manifest, html, css, js };
        } catch (err) {
          console.log({err});
        }
      }
      const html = document.createElement(`div`);
      const style = document.createElement(`style`);
      element.append(html);
      html.innerHTML = app[`loaded_${uid}`].html;
      element.append(style);
      style.innerHTML = app[`loaded_${uid}`].css;
      window.eval(app[`loaded_${uid}`].js);
    }
  }
}
</script>