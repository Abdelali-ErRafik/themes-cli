<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMainStore } from '@/stores/main';

// Define props
const props = defineProps({
  placement: {
    type: String,
    required: true,
  },
});

// Store and Reactive State
const store = useMainStore();
const loading = ref(false);
const { $tools }: any = useNuxtApp();

// Load App Function
function loadApp(app: any, element: HTMLElement | null) {
  if (!element) return;

  const uid = `${app.route}_${props.placement}`;
  if (!app[`loaded_${uid}`]) {
    try {
      const stateApp = store.apps.find((a: any) => a.route === app.route);
      if (!stateApp) return;

      let { manifest, html, css, js } = $tools.copy(stateApp.loaded);

      js = js.replace(
        '__DATA__',
        JSON.stringify({
          placement: props.placement,
          ...app.config,
        }).replace(/"/g, '"')
      );

      html = html.replace(
        new RegExp(`app_${app.route}`, 'g'),
        `app_${app.route}_${uid}`
      );

      css = css.replace(
        new RegExp(`#app_${app.route}`, 'g'),
        `#app_${app.route}_${uid}`
      );

      js = js.replace(
        new RegExp(`app_${app.route}`, 'g'),
        `app_${app.route}_${uid}`
      );

      app[`loaded_${uid}`] = { manifest, html, css, js };
    } catch (err) {
      console.error('Error loading app:', err);
    }
  }

  if (app[`loaded_${uid}`]) {
    const htmlElement = document.createElement('div');
    const styleElement = document.createElement('style');

    element.append(htmlElement);
    htmlElement.innerHTML = app[`loaded_${uid}`].html;

    element.append(styleElement);
    styleElement.innerHTML = app[`loaded_${uid}`].css;

    window.eval(app[`loaded_${uid}`].js);
  }
}

// Mounted Lifecycle Hook
onMounted(() => {
  const element: any = document.querySelector(`#${props.placement}`);
  if (store.apps) {
    const apps = store.apps.filter((app: any) =>
      app.placement.split('|').includes(props.placement)
    );

    if (apps.length > 0) {
      loading.value = true;
      apps.forEach((app: any) => loadApp(app, element));
      loading.value = false;
    }
  }
});
</script>

<template>
  <div :id="placement"></div>
</template>
