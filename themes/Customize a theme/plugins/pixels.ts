import type { AxiosInstance } from 'axios';
import { defineNuxtPlugin } from '#app';
import { useMainStore } from '@/stores/main';
import {
  initializeFacebookPixel,
  initializeSnapchatPixel,
  initializeTwitterPixel,
  initializeTikTokPixel,
  initializeLinkedInPixel,
  initializeGoogleAds,
  initializeGoogleAnalytics,
  initializeStoreinoViews,
} from '@/utils/initializePixels';

export default defineNuxtPlugin((nuxtApp) => {
  // Ensure the code runs only on the client side
  if (!import.meta.client) return;

  const store = useMainStore();
  const settings = nuxtApp.$settings as Record<string, any>;
  const http = nuxtApp.$http as AxiosInstance;

  // Map of pixels and their initialization functions
  const pixelConfigurations = [
    {
      condition:
        !store.isPreview &&
        settings &&
        settings.facebook_multiple_pixel &&
        settings.facebook_multiple_pixel.length > 0,
      initializer: () =>
        initializeFacebookPixel(settings.facebook_multiple_pixel),
    },
    {
      condition:
        settings &&
        settings.snapchat_pixel &&
        settings.snapchat_pixel.length > 0,
      initializer: () => initializeSnapchatPixel(settings.snapchat_pixel),
    },
    {
      condition:
        !store.isPreview &&
        settings &&
        settings.twitter_pixel &&
        settings.twitter_pixel.length > 0,
      initializer: () => initializeTwitterPixel(settings.twitter_pixel),
    },
    {
      condition:
        settings && settings.tiktok_pixel && settings.tiktok_pixel.length > 0,
      initializer: () => initializeTikTokPixel(settings.tiktok_pixel),
    },
    {
      condition:
        settings &&
        settings.linkedin_pixel &&
        settings.linkedin_pixel.id &&
        settings.linkedin_pixel.events &&
        settings.linkedin_pixel.events.length > 0,
      initializer: () =>
        initializeLinkedInPixel(settings.linkedin_pixel.events),
    },
    {
      condition:
        settings &&
        settings.google_ads &&
        settings.google_ads.id &&
        settings.google_ads.events &&
        settings.google_ads.events.length > 0 &&
        settings.google_analytics_id,
      initializer: () =>
        initializeGoogleAds(
          settings.google_ads.events,
          settings.google_analytics_id,
          settings.google_ads.id
        ),
    },
    {
      condition: settings && settings.google_analytics_id,
      initializer: () =>
        initializeGoogleAnalytics(settings.google_analytics_id),
    },
    {
      condition:
        settings &&
        settings.store_currencies &&
        settings.store_currencies.length > 1 &&
        store.IP,
      initializer: () => initializeStoreinoViews(store, http),
    },
  ];

  // Loop through configurations and initialize each pixel
  pixelConfigurations.forEach(({ condition, initializer }) => {
    if (condition) initializer();
  });
});
