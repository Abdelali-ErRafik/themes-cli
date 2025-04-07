import { useRouter } from 'vue-router';
import type { AxiosInstance } from 'axios';
import { defineNuxtPlugin } from '#app';
import { useMainStore } from '@/stores/main';

interface StoreinoModule {
  get?: (params?: Record<string, any>) => Promise<any>;
  search?: (params?: Record<string, any>) => Promise<any>;
  create?: (
    data: Record<string, any>,
    query?: Record<string, any>
  ) => Promise<any>;
  update?: (
    data: Record<string, any>,
    query?: Record<string, any>
  ) => Promise<any>;
}

interface PixelData {
  content_ids: string[];
  contents: { quantity: number; price: number; [key: string]: any }[];
  total: number;
  fbParams?: Record<string, any>;
}

interface Pixel {
  id: string;
  active: boolean;
  token: string;
  type?: string;
}

interface Storeino {
  [key: string]: StoreinoModule | any;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useMainStore();
  const router = useRouter();

  // Using the `http` instance from your `http.ts` plugin
  const http = nuxtApp.$http as AxiosInstance;
  const tools = nuxtApp.$tools as any;

  const storeino: Storeino = {};

  // Define modules for endpoints
  const gets = ['products', 'collections', 'pages'];
  const searches = [
    'products',
    'collections',
    'categories',
    'upsells',
    'pages',
    'brands',
    'reviews',
    'apps',
  ];

  // Helper function to add endpoint handlers
  const addHandlers = (
    modules: string[],
    action: 'get' | 'search',
    method: 'get' | 'post'
  ) => {
    for (const module of modules) {
      if (!storeino[module]) storeino[module] = {};
      storeino[module][action] = async (params: Record<string, any>) => {
        const endpoint = `/${module}/${action}`;
        return method === 'get'
          ? http.get(endpoint, { params })
          : http.post(endpoint, params);
      };
    }
  };

  // Add handlers for GET and SEARCH endpoints
  addHandlers(gets, 'get', 'get');
  addHandlers(searches, 'search', 'get');

  // Add specific module logic
  storeino.products = {
    ...storeino.products,
    filters: async (params: Record<string, any>) =>
      http.get('/products/filters', { params }),
  };

  storeino.fbpx = async (
    ev: string,
    data: Record<string, any> = {},
    params: Record<string, any> = {}
  ) => {
    // Early exit if conditions are not met
    if (store.isPreview || !store.settings?.facebook_multiple_pixel?.length)
      return;

    // Facebook Purchase Without Currency
    if (
      ev === 'Purchase' &&
      !router.currentRoute.value.query.pixel &&
      !data.currency
    )
      return 0;

    // Handle Purchase & Query Pixel
    if (ev === 'Purchase' && router.currentRoute.value.query.pixel) {
      const pixelData: PixelData = JSON.parse(
        router.currentRoute.value.query.pixel as string
      );

      // Filter Content
      pixelData.contents.forEach((element) => {
        element.quantity = Math.round(element.quantity);
        // Delete Unused Element
        delete element._id;
        delete element.variant;
        delete element.name;
      });

      // Fill Data With Content
      data = {
        content_ids: pixelData.content_ids,
        content_type: 'product',
        contents: pixelData.contents,
        value: pixelData.total,
        currency: store.currency?.code || 'USD',
      };

      // Set FB Params if available
      if (pixelData.fbParams) {
        params = { ...pixelData.fbParams, ...params };
      }
    }

    // Create FB Query
    const query: Record<string, any> = {
      name: 'fbpx',
      type: ev,
      ref: window?.location?.href,
    };

    // Merge additional params into query
    Object.assign(query, params);

    // Add External ID if available
    const externalId = window?.localStorage?.getItem('__external_id');
    if (externalId) query.user_external_id = externalId;

    // Add __fbc if available
    const fbc = window?.localStorage?.getItem('__fbc');
    if (fbc) query.user_fbc = fbc;

    // Add Event ID
    query.eventID = tools.generateEventID();

    // Add Currency Value and Adjust Prices
    if (data.currency && data.value && data.contents) {
      let valueCur = 1;
      const currencyRate = store.settings?.facebook_currency?.[data.currency];
      if (currencyRate && currencyRate !== 0) {
        valueCur = currencyRate;
      }

      // Convert prices to USD
      data.currency = 'USD';
      data.contents.forEach((content: any) => {
        content.price = Number(content.price) / valueCur;
      });
      data.value = Number(data.value) / valueCur;
    }

    // Handle Multi Pixel or Single Pixel
    const activePixels: Pixel[] = store.settings.facebook_multiple_pixel;
    if (ev === 'Purchase') {
      activePixels.forEach((pixel) => {
        if (pixel.active) {
          const eventType = pixel.type === 'Lead' ? 'Lead' : 'Purchase';
          (window as any)?.fbq('trackSingle', pixel.id, eventType, data, query);
        }
      });
    } else {
      activePixels.forEach((pixel) => {
        if (pixel.active) {
          (window as any)?.fbq('trackSingle', pixel.id, ev, data, query);
        }
      });
    }

    // Check if any pixel with token exists
    const exists = activePixels.some((p) => p.active && p.token);
    if (exists) {
      await http.post(`/events/create`, data, { params: query });
    }
  };

  // Inject the storeino plugin into the app
  nuxtApp.provide('storeino', storeino);
});
