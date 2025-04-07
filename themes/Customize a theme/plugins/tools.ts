import { defineNuxtPlugin } from '#app';

type RGB = { r: number; g: number; b: number };

interface CartItem {
  _id: string;
  quantity: number;
  price: number;
  variant?: {
    _id: string;
  };
  upsell?: {
    _id?: string;
    name?: string;
    product?: {
      _id: string;
    };
    discount?: {
      code: string;
      type: string;
      value: number;
    };
  };
}

type WishlistItem = { _id: string };

export default defineNuxtPlugin((nuxtApp) => {
  const tools = {
    /**
     * Converts a HEX color to an RGB object.
     * @param hex - HEX color string.
     * @returns RGB object.
     */

    hexToRgb(hex: string): RGB {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    },

    /**
     * Deep copies an object or primitive.
     * @param value - Value to copy.
     * @returns Deep copied value.
     */

    copy<T>(value: T): T {
      if (value === null || value === undefined) return value;
      if (typeof value === 'object') return JSON.parse(JSON.stringify(value));
      return value;
    },

    /**
     * Converts cookies string into an object.
     * @param cookie - Cookie string.
     * @returns Object representation of cookies.
     */

    cookieToObject(cookie: string): Record<string, string> {
      return cookie
        ? Object.fromEntries(
            cookie.split(';').map((pair) => {
              const [key, value] = pair.split('=');
              return [key.trim(), value?.trim() ?? ''];
            })
          )
        : {};
    },

    /**
     * Sets a cookie with the specified name and value.
     * @param name - The name of the cookie.
     * @param value - The value to set for the cookie.
     * @param options - Optional configuration for the cookie.
     */
    setCookie(
      name: string,
      value: string,
      options: {
        path?: string;
        expires?: Date;
        maxAge?: number;
        domain?: string;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
      } = {}
    ): void {
      let cookieString = `${name}=${value}`;

      if (options.path) {
        cookieString += `;path=${options.path}`;
      }

      if (options.expires) {
        cookieString += `;expires=${options.expires.toUTCString()}`;
      }

      if (options.maxAge) {
        cookieString += `;max-age=${options.maxAge}`;
      }

      if (options.domain) {
        cookieString += `;domain=${options.domain}`;
      }

      if (options.secure) {
        cookieString += ';secure';
      }

      if (options.sameSite) {
        cookieString += `;samesite=${options.sameSite}`;
      }

      document.cookie = cookieString;
    },

    /**
     * Retrieves the value of a specified cookie by name.
     * @param name - The name of the cookie to retrieve.
     * @returns The value of the cookie, or null if not found.
     */
    getCookie(name: string): string | null {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie
          .split('=')
          .map((c) => c.trim());
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    },

    /**
     * Deletes a cookie by setting its expiration to the past.
     * @param name - The name of the cookie to delete.
     * @param path - Optional path of the cookie.
     */

    deleteCookie(name: string, path: string = '/'): void {
      this.setCookie(name, '', {
        path,
        expires: new Date(0),
      });
    },

    /**
     * Dispatches a custom event with optional data.
     * @param name - Event name.
     * @param data - Data to attach to the event.
     */

    call(name: string, data: Record<string, any> = {}): void {
      if (import.meta.client) {
        const event = new CustomEvent(name, { detail: data });
        window.dispatchEvent(event);
      }
    },

    /**
     * Reformats a cart item for processing by extracting essential properties
     * and handling optional upsell data.
     *
     * @param item - Cart item to be reformatted
     * @returns Reformatted cart item with selected properties
     */

    reformCartItem(item: CartItem) {
      const result: any = {
        _id: item._id,
        quantity: item.quantity,
        price: item.price,
        parents: [],
      };

      if (item.variant?._id) {
        result.variant = { _id: item.variant._id };
      }

      if (item.upsell?.product?._id) {
        result.parents.push(item.upsell.product._id);

        result.upsell = {
          _id: item.upsell._id,
          name: item.upsell.name,
        };

        if (item.upsell.discount) {
          const { code, type, value } = item.upsell.discount;
          Object.assign(result.upsell, { code, type, value });
        }
      }

      return result;
    },

    /**
     * Reformats a wishlist item for further processing.
     * @param item - Wishlist item object.
     * @returns Reformatted wishlist item.
     */

    reformWishlistItem(item: WishlistItem): WishlistItem {
      return { _id: item._id };
    },

    /**
     * Sets a cart in cookies using useCookies.
     * @param cart - Cart data.
     */

    setCart(cart: any): void {
      const cartString = JSON.stringify(cart);
      this.setCookie('STOREINO-CART', cartString, {
        path: '/',
      });
    },

    /**
     * Sets a wishlist in cookies using useCookies.
     * @param wishlist - Wishlist data.
     */

    setWishlist(wishlist: any): void {
      const wishString = JSON.stringify(wishlist);
      this.setCookie('STOREINO-WISHLIST', wishString, {
        path: '/',
      });
    },

    /**
     * Displays a toast notification.
     * @param message - Message to display.
     * @param type - Type of the notification ('success' | 'error' | 'info').
     */

    toast(
      message: string,
      type: 'success' | 'error' | 'info' = 'success'
    ): void {
      if (import.meta.client) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    },

    /**
     * Decodes a JWT token.
     * @param token - JWT token string.
     * @returns Decoded token payload.
     */

    tokenDecode<T = any>(token: string): T | null {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
      } catch {
        return null;
      }
    },

    /**
     * Builds a URL with path, params, and query.
     * @param path - Base path.
     * @param params - Path params.
     * @param query - Query parameters.
     * @returns Constructed URL.
     */

    pushState(
      path: string,
      params: Record<string, any> = {},
      query: Record<string, any> = {}
    ): string {
      const paramsStr = Object.values(params).join('+');
      const queryStr = new URLSearchParams(query).toString();
      return `${path}${paramsStr ? '/' + paramsStr : ''}${queryStr ? '?' + queryStr : ''}`;
    },

    /**
     * Generates a unique event ID (UUID v4).
     * @returns Unique event ID.
     */
    generateEventID(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
  };

  // Provide tools globally
  nuxtApp.provide('tools', tools);
});
