import type { AxiosInstance } from 'axios';
import { useRoute, useNuxtApp } from '#app';
import { useMainStore } from '@/stores/main';

interface FacebookPixel {
  id: string;
  active: boolean;
}

interface SnapchatPixel {
  id: string;
  email?: string;
  active: boolean;
}

interface TwitterPixel {
  id: string;
  active: boolean;
}

interface TikTokPixel {
  id: string;
  active: boolean;
}

interface LinkedInPixel {
  name: string;
  pId: string;
  value: string;
}

interface GoogleAds {
  name: string;
  value: any;
}

interface GoogleAnalytics {
  id: string;
}

// Facebook Pixel
export const initializeFacebookPixel = (fbPixel: FacebookPixel[]) => {
  const { $storeino } = useNuxtApp();
  const storeino = $storeino as Record<string, any>;

  const router = useRoute();
  const win = window as any;

  // Ensure we have a valid router
  if (router?.query?.fbclid) {
    const fbclid = router.query.fbclid as string;
    localStorage.setItem('__fbc', `fb.1.${Date.now()}.${fbclid}`);
  }

  // Set a unique external ID for the user
  const externalId = `U${Date.now()}`;
  localStorage.setItem('__external_id', externalId);

  // Facebook Pixel initialization function
  const loadFacebookPixelScript = () => {
    return new Promise((resolve, reject) => {
      if (win.fbq) {
        resolve(true);
        return;
      }

      const fbq: any = (win.fbq = function () {
        fbq.callMethod
          ? fbq.callMethod.apply(fbq, arguments)
          : fbq.queue.push(arguments);
      });

      fbq.queue = [];
      fbq.version = '2.0';
      fbq.loaded = true;

      // Load Facebook Pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';

      // Add event listeners for load and error
      script.onload = () => {
        console.log(
          '%cFacebook Pixel loaded successfully! 🎉',
          'color: #1877F2; background-color: rgba(24, 119, 242, 0.1); font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;'
        );
        resolve(true);
      };

      script.onerror = (error) => {
        console.error('Failed to load Facebook Pixel:', error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  // Call function to load the script and initialize pixels
  loadFacebookPixelScript()
    .then(() => {
      // Set the global external_id variable
      win.external_id = externalId;

      // Initialize Facebook Pixels
      let initializedPixels = 0;
      fbPixel.forEach((pixel: any) => {
        if (pixel.active) {
          try {
            win.fbq('init', pixel.id);
            win.fbq.disablePushState = true;
            initializedPixels++;

            console.log(
              `%cPixel ${pixel.id} initialized successfully! ✅`,
              'color: #1877F2; background-color: rgba(24, 119, 242, 0.1); font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;'
            );
          } catch (error) {
            console.error(`Failed to initialize pixel ${pixel.id}:`, error);
          }
        }
      });

      // Log summary of initialized pixels
      if (initializedPixels > 0) {
        console.log(
          `%cSuccessfully initialized ${initializedPixels} Facebook Pixel${initializedPixels > 1 ? 's' : ''}! 🚀`,
          'color: #1877F2; background-color: rgba(24, 119, 242, 0.1); font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;'
        );
      }

      // Attach the custom fbpx
      win._fbpx = storeino.fbpx;
    })
    .catch((error) => {
      console.error('Facebook Pixel initialization failed:', error);
    });
};

// Snapchat Pixel
export const initializeSnapchatPixel = (SnapPixel: SnapchatPixel[]) => {
  const win = window as any;

  // Snapchat Pixel script initialization
  const loadSnapchatPixelScript = () => {
    return new Promise((resolve, reject) => {
      if (win.snaptr) {
        resolve(true);
        return;
      }

      const snaptr: any = (win.snaptr = function () {
        snaptr.handleRequest
          ? snaptr.handleRequest.apply(snaptr, arguments)
          : snaptr.queue.push(arguments);
      });

      snaptr.queue = [];

      // Define helper functions
      win.snapPixel = (id: string, email = '') => {
        snaptr('init', id, { user_email: email });
      };
      win.snapPageView = (data = {}) => {
        snaptr('track', 'PAGE_VIEW', data);
      };
      win.snapPurchase = (data = {}) => {
        snaptr('track', 'PURCHASE', data);
      };
      win.snapViewContent = (data = {}) => {
        snaptr('track', 'VIEW_CONTENT', data);
      };
      win.snapAddToCart = (data = {}) => {
        snaptr('track', 'ADD_CART', data);
      };
      win.snapAddToWishlist = (data = {}) => {
        snaptr('track', 'ADD_WISHLIST', data);
      };
      win.snapSignUp = (data = {}) => {
        snaptr('track', 'SIGN_UP', data);
      };

      // Load Snapchat Pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://sc-static.net/scevent.min.js';

      // Add event listeners for load and error
      script.onload = () => {
        console.log(
          '%cSnapchat Pixel loaded successfully! 👻',
          'color: #FFFC00; background-color: #000000; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;'
        );
        resolve(true);
      };

      script.onerror = (error) => {
        console.error('Failed to load Snapchat Pixel:', error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  // Load the Snapchat Pixel script and initialize pixels
  loadSnapchatPixelScript()
    .then(() => {
      // Initialize Snapchat Pixels
      let initializedPixels = 0;
      for (const pixel of SnapPixel) {
        if (pixel.active) {
          try {
            win.snapPixel(pixel.id, pixel.email);
            initializedPixels++;

            console.log(
              `%cSnapchat Pixel ${pixel.id} initialized successfully! ✨`,
              'color: #FFFC00; background-color: #000000; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px;'
            );
          } catch (error) {
            console.error(
              `Failed to initialize Snapchat pixel ${pixel.id}:`,
              error
            );
          }
        }
      }

      // Log summary of initialized pixels
      if (initializedPixels > 0) {
        console.log(
          `%cSuccessfully initialized ${initializedPixels} Snapchat Pixel${initializedPixels > 1 ? 's' : ''}! 🎯`,
          'color: #FFFC00; background-color: #000000; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px; margin: 4px 0;'
        );
      }
    })
    .catch((error) => {
      console.error('Snapchat Pixel initialization failed:', error);
    });
};

// Twitter Pixel
export const initializeTwitterPixel = (twitPixel: TwitterPixel[]) => {
  const store = useMainStore();
  const route = useRoute();
  const win = window as any;

  // Twitter Pixel script initialization
  const loadTwitterPixelScript = () => {
    return new Promise((resolve, reject) => {
      if (win.twq) {
        resolve(true);
        return;
      }

      const twq: any = (win.twq = function () {
        twq.exe ? twq.exe.apply(twq, arguments) : twq.queue.push(arguments);
      });

      twq.version = '1.1';
      twq.queue = [];

      // Load Twitter Pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://static.ads-twitter.com/uwt.js';

      // Add event listeners for load and error
      script.onload = () => {
        console.log(
          '%cTwitter Pixel loaded successfully! 🐦',
          'color: #657786; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(101, 119, 134, 0.1); border-radius: 4px;'
        );
        resolve(true);
      };

      script.onerror = (error) => {
        console.error('Failed to load Twitter Pixel:', error);
        reject(error);
      };

      document.head.appendChild(script);

      // Define helper functions for tracking events
      win.twitterPixel = (id: string) => twq('init', id);
      win.twitterPageView = (data = {}) => twq('track', 'PageView', data);
      win.twitterViewContent = (data = {}) => twq('track', 'ViewContent', data);
      win.twitterAddToCart = (data = {}) => twq('track', 'AddToCart', data);
      win.twitterAddToWishlist = (data = {}) =>
        twq('track', 'AddToWishlist', data);
      win.twitterInitiateCheckout = (data = {}) =>
        twq('track', 'InitiateCheckout', data);
      win.twitterSearch = (data = {}) => twq('track', 'Search', data);
      win.twitterAddPaymentInfo = (data = {}) =>
        twq('track', 'AddPaymentInfo', data);
      win.twitterSignup = (data = {}) => twq('track', 'Signup', data);
      win.twitterCompleteRegistration = (data = {}) =>
        twq('track', 'CompleteRegistration', data);
      win.twitterDownload = (data = {}) => twq('track', 'Download', data);
      win.twitterPurchase = (data = {}) => twq('track', 'Purchase', data);
    });
  };

  // Load the Twitter Pixel script and initialize pixels
  loadTwitterPixelScript()
    .then(() => {
      // Initialize active Twitter Pixels
      let initializedPixels = 0;
      for (const pixel of twitPixel) {
        if (pixel.active) {
          try {
            win.twitterPixel(pixel.id);
            initializedPixels++;

            console.log(
              `%cTwitter Pixel ${pixel.id} initialized successfully! ✨`,
              'color: #657786; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(101, 119, 134, 0.1); border-radius: 4px;'
            );
          } catch (error) {
            console.error(
              `Failed to initialize Twitter pixel ${pixel.id}:`,
              error
            );
          }
        }
      }

      // Log summary of initialized pixels
      if (initializedPixels > 0) {
        console.log(
          `%cSuccessfully initialized ${initializedPixels} Twitter Pixel${initializedPixels > 1 ? 's' : ''}! 🚀`,
          'color: #657786; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(101, 119, 134, 0.1); border-radius: 4px; margin: 4px 0;'
        );
      }

      // Handle Twitter Purchase Pixel tracking
      if (route.query.pixel) {
        try {
          const pixel = JSON.parse(route.query.pixel as string);
          win.twitterPurchase({
            content_ids: pixel.contents.map((p: any) => p.id),
            num_items: pixel.contents.length,
            content_type: 'product',
            value: pixel.total,
            currency: store.currency.code || 'USD',
          });

          console.log(
            '%cTwitter Purchase event tracked successfully! 💫',
            'color: #657786; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(101, 119, 134, 0.1); border-radius: 4px;'
          );
        } catch (error) {
          console.error('Error parsing Twitter Pixel data from query:', error);
        }
      }
    })
    .catch((error) => {
      console.error('Twitter Pixel initialization failed:', error);
    });
};

// TikTok Pixel
export const initializeTikTokPixel = (tikPixel: TikTokPixel[]) => {
  const store = useMainStore();
  const route = useRoute();
  const win = window as any;

  // TikTok Pixel script initialization
  const loadTikTokPixelScript = () => {
    if (win.ttq) return;

    win.TiktokAnalyticsObject = 'ttq';
    const ttq: any = (win.ttq = win.ttq || []);
    ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
    ];

    // Method to defer function calls
    ttq.setAndDefer = (obj: any, method: string) => {
      obj[method] = (...args: any[]) => {
        obj.push([method, ...args]);
      };
    };

    // Attach all methods to ttq
    for (const method of ttq.methods) {
      ttq.setAndDefer(ttq, method);
    }

    // Load TikTok Pixel
    ttq.load = (id: string, options = {}) => {
      ttq._i = ttq._i || {};
      ttq._i[id] = ttq._i[id] || [];
      ttq._i[id]._u = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = options;

      // Inject the TikTok Pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = `${ttq._i[id]._u}?sdkid=${id}&lib=ttq`;
      document.head.appendChild(script);

      // Log success message for script loading
      console.log(
        '%cTikTok Pixel script loaded successfully! 🎯',
        'color: #FFFC00; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(255, 252, 0, 0.1); border-radius: 4px;'
      );
    };

    // Define TikTok Pixel helper methods
    win.tiktokPixel = (id: string) => {
      ttq.load(id);
      console.log(
        `%cTikTok Pixel initialized with ID: ${id}`,
        'color: #FFFC00; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(255, 252, 0, 0.1); border-radius: 4px;'
      );
    };
    win.tiktokPageView = () => ttq.page();
    win.tiktokAddPaymentInfo = (data = {}) => ttq.track('AddPaymentInfo', data);
    win.tiktokAddToCart = (data = {}) => ttq.track('AddToCart', data);
    win.tiktokAddToWishlist = (data = {}) => ttq.track('AddToWishlist', data);
    win.tiktokClickButton = (data = {}) => ttq.track('ClickButton', data);
    win.tiktokPurchase = (data = {}) => ttq.track('CompletePayment', data);
    win.tiktokCompleteRegistration = (data = {}) =>
      ttq.track('CompleteRegistration', data);
    win.tiktokViewContent = (data = {}) => ttq.track('ViewContent', data);
    win.tiktokSubscribe = (data = {}) => ttq.track('Subscribe', data);
    win.tiktokSubmitForm = (data = {}) => ttq.track('SubmitForm', data);
    win.tiktokSearch = (data = {}) => ttq.track('Search', data);
    win.tiktokPlaceAnOrder = (data = {}) => ttq.track('PlaceAnOrder', data);
    win.tiktokInitiateCheckout = (data = {}) =>
      ttq.track('InitiateCheckout', data);
    win.tiktokDownload = (data = {}) => ttq.track('Download', data);
    win.tiktokContact = (data = {}) => ttq.track('Contact', data);
  };

  // Load the TikTok Pixel script
  loadTikTokPixelScript();

  // Initialize active TikTok Pixels
  for (const pixel of tikPixel) {
    if (pixel.active) {
      win.tiktokPixel(pixel.id);
    }
  }

  // Handle TikTok Purchase Pixel tracking
  if (route.query.pixel) {
    try {
      const pixel = JSON.parse(route.query.pixel as string);
      win.tiktokPurchase({
        contents: pixel.contents.map((p: any) => ({
          content_id: p.id,
          content_type: 'product',
          content_name: p.name,
          quantity: p.quantity,
          price: p.price,
        })),
        value: pixel.total,
        currency: store.currency?.code || 'USD',
      });
    } catch (error) {
      console.error('Error parsing TikTok Pixel data from query:', error);
    }
  }
};

// LinkedIn Pixel
export const initializeLinkedInPixel = (linkPixel: LinkedInPixel[]) => {
  const route = useRoute();
  const win = window as any;

  // Load LinkedIn Pixel script
  const loadLinkedInPixelScript = () => {
    if (win.lintrk) {
      console.log(
        '%cLinkedIn Pixel script is already loaded.',
        'color: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 100); border-radius: 4px;'
      );
      return;
    }

    const scriptId = 'linkedin-pixel-script';
    if (document.getElementById(scriptId)) {
      console.log(
        '%cLinkedIn Pixel script is already appended.',
        'color: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 100); border-radius: 4px;'
      );
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';

    script.onload = () =>
      console.log(
        '%cLinkedIn Pixel script loaded successfully! \uD83D\uDCAC',
        'color: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 100); border-radius: 4px;'
      );
    script.onerror = () =>
      console.error('Failed to load LinkedIn Pixel script.');

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  };

  // Initialize LinkedIn Partner IDs
  const initializePartnerIds = () => {
    win._linkedin_data_partner_ids = win._linkedin_data_partner_ids || [];

    linkPixel.forEach((event: any) => {
      if (event.pId && !win._linkedin_data_partner_ids.includes(event.pId)) {
        win._linkedin_data_partner_ids.push(event.pId);
        console.log(
          `%cLinkedIn Partner ID initialized: ${event.pId}`,
          'color: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 100); border-radius: 4px;'
        );
      } else {
        console.warn('Missing or duplicate Partner ID for event:', event);
      }
    });
  };

  // Helper to fetch events by name
  const getEvent = (eventName: string) => {
    return linkPixel.filter((event: any) => event.name === eventName);
  };

  // Fire LinkedIn Events
  const fireLinkedInEvent = (eventName: string) => {
    const matchingEvents = getEvent(eventName);
    if (!matchingEvents.length) {
      console.warn(`No matching LinkedIn events found for event: ${eventName}`);
      return;
    }

    matchingEvents.forEach((event: any) => {
      if (win.lintrk) {
        win.lintrk('track', { conversion_id: event.value });
        console.log(
          `%cLinkedIn event fired: ${eventName}, Conversion ID: ${event.value}`,
          'color: #FFFFFF; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 100); border-radius: 4px;'
        );
      } else {
        console.error('LinkedIn tracking function not available.');
      }
    });
  };

  // Initialize LinkedIn Pixel
  const init = () => {
    loadLinkedInPixelScript();
    initializePartnerIds();

    // Fire purchase event if on the "thanks" page with pixel query
    if (route.name === 'thanks' && route.query.pixel) {
      fireLinkedInEvent('purchase');
    }
  };

  // Attach the event tracking function globally
  win.linkedInEvent = fireLinkedInEvent;

  // Start the initialization process
  init();
};

// Google Ads
export const initializeGoogleAds = (
  goAds: GoogleAds[],
  goAnalyticsId: string,
  goAdsId: string
) => {
  const route = useRoute();
  const win = window as any;

  // Load Google Ads script
  const loadGoogleAdsScript = () => {
    if (document.getElementById('google-ads-script')) {
      console.log(
        '%cGoogle Ads script is already loaded.',
        'color: #F4B400; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(219, 68, 55, 0.1); border-radius: 4px;'
      );
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-ads-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${goAnalyticsId}`;
    document.head.appendChild(script);

    script.onload = () =>
      console.log(
        '%cGoogle Ads script loaded successfully!',
        'color: #F4B400; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(219, 68, 55, 0.1); border-radius: 4px;'
      );
    script.onerror = () => console.error('Failed to load Google Ads script.');
  };

  // Initialize Google Ads tracking
  const initializeTracking = () => {
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag() {
      win.dataLayer.push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', goAdsId);

    console.log(
      '%cGoogle Ads tracking initialized.',
      'color: #F4B400; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(219, 68, 55, 0.1); border-radius: 4px;'
    );
  };

  // Fetch events by name
  const getEvent = (eventName: string) => {
    return goAds.filter((event: any) => event.name === eventName);
  };

  // Fire Google Ads event
  const fireGoogleAdsEvent = (eventName: string) => {
    const eventsGroup = getEvent(eventName);

    if (eventsGroup.length === 0) {
      console.warn(`No matching events found for event name: ${eventName}`);
      return;
    }

    eventsGroup.forEach((event: any) => {
      const eventData = {
        send_to: `${goAdsId}/${event.value}`,
        event_callback: () => {
          console.log(
            `%cGoogle Ads event fired: ${eventName}, Conversion ID: ${event.value}`,
            'color: #F4B400; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(219, 68, 55, 0.1); border-radius: 4px;'
          );
        },
      };

      if (win.gtag) {
        win.gtag('event', 'conversion', eventData);
      } else {
        console.error('Google gtag function is not available.');
      }
    });
  };

  // Initialization process
  const init = () => {
    loadGoogleAdsScript();
    initializeTracking();

    // Automatically fire purchase event if on the "thanks" page with pixel query
    if (route.name === 'thanks' && route.query.pixel) {
      fireGoogleAdsEvent('purchase');
    }
  };

  // Attach global event function for manual triggers
  win.googleAdsEvent = fireGoogleAdsEvent;

  // Start initialization
  init();
};

// Google Analytics
export const initializeGoogleAnalytics = (goAnalyticsId: GoogleAnalytics[]) => {
  const win = window as any;

  // Load Google Analytics Script
  const loadGoogleAnalyticsScript = () => {
    const existingScript = document.getElementById('google-analytics-script');
    if (existingScript) {
      console.log(
        '%cGoogle Analytics script is already loaded.',
        'color: #0F9D58; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(15, 157, 88, 0.1); border-radius: 4px;'
      );
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${goAnalyticsId}`;
    script.onload = () =>
      console.log(
        '%cGoogle Analytics script loaded successfully! \uD83D\uDCCA',
        'color: #0F9D58; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(15, 157, 88, 0.1); border-radius: 4px;'
      );
    script.onerror = () =>
      console.error('Failed to load Google Analytics script.');

    document.head.appendChild(script);
  };

  const initializeTracking = () => {
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag() {
      win.dataLayer.push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', goAnalyticsId);

    console.log(
      '%cGoogle Analytics initialized with ID: ' + goAnalyticsId,
      'color: #0F9D58; font-weight: bold; font-size: 12px; padding: 4px 8px; background: rgba(15, 157, 88, 0.1); border-radius: 4px;'
    );
  };

  const init = () => {
    loadGoogleAnalyticsScript();
    initializeTracking();
  };

  // Start initialization
  init();
};

// Storeino Views
export const initializeStoreinoViews = async (
  store: any,
  http: AxiosInstance
) => {
  try {
    // Fetch GeoLite data
    const { data } = await http.get(
      `https://api-views.storeino.com/api/geoLite/get?ip=${store.IP}`
    );
    const geoCurrency = data?.geoplugin_currencyCode;

    // Validate and trigger currency modal
    if (
      geoCurrency &&
      geoCurrency !== store.currency.code &&
      store.settings.store_currencies.some(
        (c: { code: string }) => c.code === geoCurrency
      )
    ) {
      store.showCurrencyModal = true;
      console.log(`Currency modal triggered for ${geoCurrency}.`);
    }
  } catch (error) {
    console.error('Error initializing Storeino Views:', error);
  }
};
