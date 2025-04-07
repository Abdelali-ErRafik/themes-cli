import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    loading: true,
    customer: null as null | Record<string, any> | any,
    IP: undefined as undefined | string | string[],
    showCurrencyModal: false,
    cart: [] as Record<string, unknown>[],
    isPreview: false,
    wishlist: [] as Record<string, unknown>[],
    seo: {
      logo: '',
      title: '',
      description: '',
      keywords: [] as string[],
      url: '',
      image: '',
      metaTags: [] as Record<string, string>[],
      scripts: [] as string[],
    },
    settings: null as null | Record<string, any> | any,
    domain: 'www.storeino.com',
    apps: [] as Record<string, unknown>[],
    token: null as null | string,
    primary: {
      rgb: { r: 0, g: 0, b: 0 },
      color: '#000000',
    },
    search: '',
    defaults: {
      logo: 'https://storeno.b-cdn.net/stores/1-2025/1736526391385.png',
      noImage: 'https://storeno.b-cdn.net/stores/12-2024/1734534897164.jpeg',
      carouselImage:
        'https://storeno.b-cdn.net/stores/2-2025/1739263184295.jpeg',
      offersImage: 'https://storeno.b-cdn.net/stores/2-2025/1739262893706.jpeg',
      blogImage: 'https://storeno.b-cdn.net/stores/12-2024/1735123844371.webp',
      BannersImage:
        'https://storeno.b-cdn.net/stores/2-2025/1739263744893.jpeg',
      ServiceImage: 'https://storeno.b-cdn.net/stores/2-2025/1739264185244.png',
      shopImage: 'https://storeno.b-cdn.net/stores/2-2025/1739207718722.png',
      icon: 'https://storeno.b-cdn.net/themes/palest/icon.png',
    },
    baseURL: 'https://api-stores.storeino.world/api',
    managerURL: 'https://api-managers.storeino.world/api',
    currency: {
      symbol: 'DH',
      code: undefined as undefined | string,
    },
    language: {
      name: 'Unknown',
      code: undefined as undefined | string,
    },
    fullImage: null as null | string,
    showHeaderMenu: false,
    showCollectionsMenu: false,
  }),

  getters: {
    isCurrencyModalVisible: (state) => state.showCurrencyModal,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setSearch(query: string) {
      this.search = query;
    },
  },
});
