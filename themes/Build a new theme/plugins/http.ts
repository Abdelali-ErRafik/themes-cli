import axios from 'axios';
import { getQuery, parseCookies } from 'h3';
import { defineNuxtPlugin, useRoute } from '#app';
import { useMainStore } from '@/stores/main';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useMainStore() as any;
  const tools = nuxtApp.$tools as any;
  const route = useRoute();

  // Utilities for token handling
  const getToken = async (config: {
    clientId: string;
    clientSecret: string;
  }) => {
    try {
      const { clientId, clientSecret } = config;
      if (!clientId || !clientSecret) {
        throw new Error('Invalid token configuration');
      }

      const response = await axios.post(
        `${store.baseURL}/stores/auth`,
        { clientId, clientSecret },
        {
          // Remove httpsAgent and use axios defaults
          validateStatus: (status) => status < 500,
        }
      );

      return response.data.accessToken;
    } catch (error) {
      console.error('Token acquisition failed:', error);
      throw new Error('Failed to acquire valid token');
    }
  };

  // Initialize Axios instance
  const createAxiosInstance = () => {
    // Create Axios instance with default configuration
    const instance = axios.create({
      baseURL: store.baseURL,
      headers: {
        'x-auth-token': store.token || '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Add default timeout
      timeout: 30000,
      // Add validateStatus to handle responses
      validateStatus: (status) => status < 500,
    });

    // Request interceptor
    instance.interceptors.request.use((config) => {
      const { language, currency } = store;
      config.params = {
        ...config.params,
        lang: language.code || config.params?.lang,
        cur: currency.code || config.params?.cur,
      };
      return config;
    });

    // Add response interceptor for error handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          store.setToken(null);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  };

  if (import.meta.server) {
    const event = useRequestEvent() as any;
    const config = event.context.config;
    const req = event.node.req;

    // Extract and set IP address
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    store.IP = Array.isArray(clientIp) ? clientIp[0] : clientIp || '';

    // Check Production Environment
    if (config.env === 'production') {
      store.baseURL = 'https://api-stores.storeino.com/api';
      store.managerURL = 'https://api-managers.storeino.com/api';
    }

    // Extract query parameters
    const query = getQuery(event);
    const cookies = parseCookies(event);

    // Store UTM parameters and tracking IDs
    const trackingParams = ['fbclid', 'gclid', 'utm_content', 'utm_source'];
    trackingParams.forEach((param) => {
      store[param] = query[param] || cookies[param] || null;
    });

    // Detect user agent for iOS
    store.isIos = req.headers['user-agent']?.includes('iPhone') || false;

    // Process referer header
    let referer = req.headers.referer || req.headers.host || '';
    referer = !referer.startsWith('http') ? `https://${referer}` : referer;

    // Handle source attribution
    let source = 'newv2/';
    if (store.gclid) source = 'gads/';
    if (store.fbclid) source = 'fbads/';
    if (store.utm_content) source = `${store.utm_content}/`;
    if (store.utm_source) source = `${store.utm_source}/`;

    const uri = new URL(referer);
    source +=
      uri.host !== req.headers.host
        ? `${uri.hostname}${uri.pathname}`
        : 'direct';

    if (query['affiliate-id']) {
      source = `affiliate/${query['affiliate-id']}`;
    }

    store.source = source;

    // Handle currency and language preferences
    const preferences = {
      currency: { query: 'cur', cookie: 'CURRENT_CURRENCY' },
      language: { query: 'lang', cookie: 'CURRENT_LANGUAGE' },
    };

    Object.entries(preferences).forEach(([key, { query: q, cookie }]) => {
      if (route.query[q]) {
        store[key].code = route.query[q].toString();
      } else if (cookies[cookie]) {
        store[key].code = cookies[cookie];
      }
    });

    // Token
    if (req && req.headers && req.headers['x-auth-token']) {
      store.token = req.headers['x-auth-token'];
    }

    // Token configuration
    if (!store.token && config?.token) {
      try {
        const token = await getToken(config.token);
        store.setToken(token);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
  } else {
    // Client-side operations
    if (store.source) {
      localStorage.setItem('CSource', store.source);
    }

    // Set cookies for preferences
    ['currency', 'language'].forEach((pref) => {
      if (store[pref].code) {
        tools.setCookie(`CURRENT_${pref.toUpperCase()}`, store[pref].code, {
          path: '/',
        });
      }
    });

    // Check Connect Customer
    const customerToken = tools.getCookie('CUSTOMER');
    if (customerToken) {
      store.customer = tools.tokenDecode(customerToken);
    }
  }

  // Create and provide Axios instance
  const http = createAxiosInstance();
  nuxtApp.provide('http', http);
});
