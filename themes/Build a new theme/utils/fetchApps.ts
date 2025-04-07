import type { AxiosInstance } from 'axios';
import { useMainStore } from '@/stores/main';

/**
 * Fetch and initialize apps for the store.
 * @param storeino - The Storeino client instance.
 * @param http - The Axios HTTP client instance.
 */

export async function fetchApps(
  storeino: any,
  http: AxiosInstance
): Promise<void> {
  const store = useMainStore();

  try {
    // Initialize the apps array
    store.apps = [];

    // Fetch app data
    const response = await storeino.apps.search({
      only: ['name', 'route', 'placement', 'config'],
    });

    const names = response.data.results.map((app: any) => app.route);

    // Determine the base URL
    const baseURL =
      store.baseURL !== 'https://api-stores.storeino.com/api'
        ? 'https://appstatic.storeino.world'
        : 'https://appstatic.storeino.com';

    // Fetch app objects
    const { data: objects } = await http.get(`${baseURL}/all/store`, {
      params: { names },
    });

    // Process the apps
    for (const app of response.data.results) {
      const loaded = objects.find((object: any) => object.name === app.route);
      app.loaded = loaded;
      store.apps.push(app);
    }
  } catch (err) {
    console.error('Error initializing apps:', err);
    throw err;
  }
}
