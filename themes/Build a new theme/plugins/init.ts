import type { AxiosInstance } from 'axios';
import { getQuery, parseCookies } from 'h3';
import { initializeStoreinoApp } from '@/utils/storeinoApp';
import { fetchApps } from '@/utils/fetchApps';
import { useMainStore } from '@/stores/main';
import { defineNuxtPlugin, useRoute } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useMainStore();
  const route = useRoute();

  const tools = nuxtApp.$tools as any;
  const storeino = nuxtApp.$storeino as any;
  const http = nuxtApp.$http as AxiosInstance;

  const setCurrency = (currencies: any) => {
    if (store.currency.code) {
      const matchedCurrency = currencies.find(
        (c: any) => c.code === store.currency.code
      );
      if (matchedCurrency) {
        store.currency.symbol = matchedCurrency.symbol;
        return;
      }
    }

    const defaultCurrency =
      currencies.find((c: any) => c.default) || currencies[0];
    store.currency = {
      code: defaultCurrency.code,
      symbol: defaultCurrency.symbol,
    };
  };

  // Handler for setting store language
  const setLanguage = (languages: any) => {
    if (!store.language.code) {
      const defaultLanguage =
        languages.find((l: any) => l.default) || languages[0];
      store.language = {
        code: defaultLanguage.code,
        name: defaultLanguage.name,
      };
    }
  };

  // Handler for processing meta tags
  const processMetaTags = (metaTags: any) => {
    if (!metaTags?.length) return;

    store.seo.metaTags = metaTags.map((metaTag: any) => ({
      hid: metaTag[metaTag.type],
      [metaTag.type]: metaTag[metaTag.type],
      content: metaTag.content,
    }));
  };

  // Server-side initialization
  if (import.meta.server) {
    const initializeServer = async () => {
      const event: any = useRequestEvent();
      const req = event.node.req;

      // Set domain and IP
      store.domain = req?.headers.host || '';
      const clientIp =
        req?.headers['x-forwarded-for'] || req?.socket.remoteAddress;
      store.IP = Array.isArray(clientIp) ? clientIp[0] : clientIp || '';

      // Fetch settings
      const query = getQuery(event);
      const preview = query.preview ? '?preview=true' : '';
      store.isPreview = Boolean(query.preview);

      try {
        const { data: settings } = await http.get(
          `/settings/current${preview}`
        );
        store.settings = settings;

        // Initialize store configurations
        processMetaTags(settings.meta_tags);
        setCurrency(settings.store_currencies);
        setLanguage(settings.store_languages);

        // Parse cookies
        const cookies = parseCookies(event);
        store.cart = JSON.parse(cookies['STOREINO-CART'] || '[]');
        store.wishlist = JSON.parse(cookies['STOREINO-WISHLIST'] || '[]');

        await fetchApps(storeino, http);
      } catch (error: any) {
        const errorMessage = error.response
          ? `ERROR :: ${error.response.data}`
          : `ERROR :: INVALID TOKEN ${error}`;
        throw new Error(errorMessage);
      }
    };

    await initializeServer().catch((error) => {
      console.error('Server-side initialization error:', error);
    });
  }

  // Client-side initialization
  if (import.meta.client) {
    const initializeClient = async () => {
      if (route.name === 'thanks') {
        const orderId = tools.getCookie('ORDER_ID');
        if (orderId) {
          tools.deleteCookie('ORDER_ID');
          tools.setCookie('STOREINO-CART', '[]', { path: '/' });
          store.cart = [];
        } else {
          // window.location.href = '/';
        }
      }

      await initializeStoreinoApp(http);
    };

    await initializeClient().catch((error) => {
      console.error('Client-side initialization error:', error);
    });
  }

  return {
    provide: {
      settings: store.settings,
    },
  };
});
