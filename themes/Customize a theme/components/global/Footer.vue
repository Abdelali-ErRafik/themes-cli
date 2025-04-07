<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';

const { $settings } = useNuxtApp();

const footer = $settings.sections.footer;
const bgColor = ref(footer.colors.background_color);
const textColor = ref(footer.colors.text_color);
</script>

<template>
  <!--  -->
  <div class="footer-section">
    <!--  -->
    <AppsLoader placement="BEFORE_FOOTER" />
    <!--  -->

    <!--  -->
    <footer :style="{ backgroundColor: bgColor, color: textColor }">
      <!--  -->
      <div class="border-b py-4">
        <!--  -->
        <div
          class="container flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <!--  -->
          <FooterSocialMedia :footer="footer" />
          <!--  -->

          <!--  -->
          <FooterPhone :call-us="footer.call_us" :text-color="textColor" />
          <!--  -->
        </div>
        <!--  -->
      </div>

      <!--  -->
      <div
        class="container flex flex-wrap justify-between py-10 container-nop menus lg:py-14"
      >
        <!--  -->
        <FooterAbout :about="footer.about" />
        <!--  -->

        <!--  -->
        <FooterMenu :menus="footer.menus" />
        <!--  -->

        <!--  -->
        <FooterPayments :methods="footer.methods" />
        <!--  -->
      </div>
      <!--  -->
    </footer>
    <!--  -->

    <!--  -->
    <AppsLoader placement="AFTER_FOOTER" />
    <!--  -->
  </div>
  <!--  -->
</template>
