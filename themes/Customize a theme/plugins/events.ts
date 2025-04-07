import { defineNuxtPlugin, useRouter } from '#app';
import { useMainStore } from '@/stores/main';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  const tools = nuxtApp.$tools as any;
  const settings = nuxtApp.$settings as Record<string, any>;

  const store = useMainStore();
  const router = useRouter();

  // Event Handlers
  const eventHandlers: Record<
    string,
    (e: Event & { detail?: any; data?: any }) => void
  > = {
    TO_CHECKOUT: () => {
      window.location.href = '/checkout2';
    },

    APP_GO_TO: (e) => {
      if (e.detail?.url) {
        router.push(e.detail.url);
      }
    },

    PAGE_VIEW: (e) => {
      const win = window as any;

      // SnapChat Pixel
      if (
        settings &&
        settings.snapchat_pixel &&
        settings.snapchat_pixel.length > 0
      ) {
        // Snapchat PageView
        win.snapPageView();
        // Snapchat ViewContent
        if (e.data && e.data._id) {
          win.snapViewContent({ item_ids: [e.data._id] });
        }
      }

      // Twitter Pixel
      if (
        !store.isPreview &&
        settings &&
        settings.twitter_pixel &&
        settings.twitter_pixel.length > 0
      ) {
        // Twitter PageView
        win.twitterPageView();
        // Twitter ViewContent
        if (e.data && e.data._id) {
          win.twitterViewContent({
            content_ids: [e.data._id],
            content_type: 'product',
            content_name: e.data.name,
            value: e.data.price.salePrice,
            currency: store.currency.code || 'USD',
          });
        }
      }

      // Tiktok Pixel
      if (
        settings &&
        settings.tiktok_pixel &&
        settings.tiktok_pixel.length > 0
      ) {
        // Tiktok PageView
        win.tiktokPageView();
        // Tiktok ViewContent
        if (e.data && e.data._id) {
          win.tiktokViewContent({
            content_id: e.data._id,
            quantity: 1,
            price: e.data.price.salePrice,
            value: e.data.price.salePrice,
            currency: store.currency.code || 'USD',
          });
        }
      }

      // Google Ads
      if (
        settings.google_ads &&
        settings.google_ads.id &&
        settings.google_ads.events &&
        settings.google_ads.events.length > 0
      ) {
        win.gtag('config', `${settings.google_ads.id}`);
      }

      // Google Analytics
      if (settings && settings.google_analytics_id) {
        win.gtag('js', new Date());
        win.gtag('config', window.escape(`${settings.google_analytics_id}`));
      }
    },

    ADD_TO_CART: (e) => {
      const win = window as any;

      // Get Cart item
      const item = tools.reformCartItem(e.detail);

      // Check Item Variants
      let exists = null as any;
      if (item.variant) {
        exists = store.cart.find(
          (i: any) =>
            i._id === item._id &&
            i.variant &&
            i.variant._id === item.variant._id
        );
      } else {
        exists = store.cart.find((i) => i._id === item._id);
      }

      // Snapchat Pixel
      if (
        settings &&
        settings.snapchat_pixel &&
        settings.snapchat_pixel.length > 0
      ) {
        win.snapAddToCart({
          item_ids: [item._id],
          price: item.price,
          currency: store.currency.code || 'USD',
        });
      }

      // Twitter Pixel
      if (
        !store.isPreview &&
        settings &&
        settings.twitter_pixel &&
        settings.twitter_pixel.length > 0
      ) {
        win.twitterAddToCart({
          content_ids: [item._id],
          content_type: 'product',
          value: item.price * item.quantity,
          currency: store.currency.code || 'USD',
        });
      }

      // TikTok Pixel
      if (
        settings &&
        settings.tiktok_pixel &&
        settings.tiktok_pixel.length > 0
      ) {
        win.tiktokAddToCart({
          content_id: item._id,
          quantity: item.quantity,
          price: item.price,
          value: item.price * item.quantity,
          currency: store.currency.code || 'USD',
        });
      }

      // Linkedin
      if (
        settings.linkedin_pixel &&
        settings.linkedin_pixel.id &&
        settings.linkedin_pixel.events &&
        settings.linkedin_pixel.events.length > 0
      ) {
        win.linkedInEvent('add_to_cart');
      }

      // Check Item Exists
      if (exists) {
        item.parents = [...new Set([...exists.parents, ...item.parents])];
        exists.quantity = item.quantity;
      } else {
        store.cart.push(item);
      }

      // Set Cart
      tools.setCart(store.cart);

      if (
        settings.analitycs_shere &&
        settings.analitycs_shere[0] &&
        settings.analitycs_shere[0]['data-website-id'] &&
        win.umami
      ) {
        win.umami.track('ADD_TO_CART', { name: item.name, id: item._id });
      }

      // Call Add To Cart
      tools.call('ADDED_TO_CART');
    },

    REMOVE_FROM_CART: (e) => {
      // Reforme Cart
      const item = tools.reformCartItem(e.detail);

      // Set Index
      let index = -1;
      if (item.variant) {
        index = store.cart.findIndex(
          (i: any) =>
            i._id === item._id &&
            i.variant &&
            i.variant._id === item.variant._id
        );
      } else {
        index = store.cart.findIndex((i) => i._id === item._id);
      }

      // Return if not found index
      if (index == -1) return;

      // Delete index from cart
      store.cart.splice(index, 1);

      // Set Cart
      const childs = store.cart.filter(
        (i: any) => i.parents && i.parents.includes(item._id)
      );
      for (const child of childs as any) {
        const childIndex = store.cart.findIndex((i) => i._id == child._id);
        child.parents.splice(child.parents.indexOf(item._id), 1);
        if (child.parents.length == 0) store.cart.splice(childIndex, 1);
      }
      tools.setCart(store.cart);
    },

    ADD_TO_WISHLIST: (e) => {
      const win = window as any;

      // Get Wishlist item
      const item = tools.reformWishlistItem(e.detail);

      // Check If Item Exist
      const exists = store.wishlist.find((i) => i._id === item._id);
      if (!exists) {
        store.wishlist.push(item);
      }

      // Set Wishlist
      tools.setWishlist(store.wishlist);

      // SnapChat Pixel
      if (
        settings &&
        settings.snapchat_pixel &&
        settings.snapchat_pixel.length > 0
      ) {
        win.snapAddToWishlist({ item_ids: [item._id] });
      }

      // Twitter Pixel
      if (
        !store.isPreview &&
        settings &&
        settings.twitter_pixel &&
        settings.twitter_pixel.length > 0
      ) {
        win.twitterAddToWishlist({
          content_ids: [item._id],
          content_type: 'product',
          currency: store.currency.code || 'USD',
        });
      }

      // Tiktok Pixel
      if (
        settings &&
        settings.tiktok_pixel &&
        settings.tiktok_pixel.length > 0
      ) {
        win.tiktokAddToWishlist({
          content_id: item._id,
          price: item.price,
          currency: store.currency.code || 'USD',
        });
      }
      if (
        settings.analitycs_shere &&
        settings.analitycs_shere[0] &&
        settings.analitycs_shere[0]['data-website-id'] &&
        win.umami
      ) {
        win.umami.track('ADD_TO_WISHLIST', {
          name: item.name,
          id: item._id,
        });
      }
    },

    REMOVE_FROM_WISHLIST: (e) => {
      // Reforme Wishlist Items
      const item = tools.reformWishlistItem(e.detail);
      const index = store.wishlist.findIndex((i) => i._id === item._id);
      if (index == -1) return;
      store.wishlist.splice(index, 1);
      tools.setWishlist(store.wishlist);
    },

    message: (e) => {
      const response = e.data;
      if (response.type == 'addToCart')
        router.push(`/products/${response.data.product.slug}`);
      if (response.type == 'loading') {
        if (response.data.route == '/login') {
          router.push('/account/login');
        }
        setTimeout(() => {
          store.loading = false;
        }, 1000);
      }

      if (e.data.token) store.customer = tools.tokenDecode(e.data.token);
      if (response.data == 'login') store.customer = null;
      if (response.type == 'route') {
        window.history.pushState(
          {},
          '',
          tools.$pushState('/account/', [`${response.data}`], '')
        );
      }
      if (response.type == 'route_id') {
        window.history.pushState(
          {},
          '',
          tools.$pushState('/account/', [`${response.data.name}`], {
            orderId: response.data.query,
          })
        );
      }
    },
  };

  // Attach Event Listeners
  for (const [event, handler] of Object.entries(eventHandlers)) {
    window.addEventListener(event, handler);
  }

  // Provide the events utility
  nuxtApp.provide('events', eventHandlers);
});
