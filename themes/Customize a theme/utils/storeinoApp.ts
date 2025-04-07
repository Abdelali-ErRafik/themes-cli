import type { AxiosInstance } from 'axios';

// @ts-ignore
import Vue from '@vue/compat';

export function initializeStoreinoApp($http: AxiosInstance): void {
  // Define the $store object with the methods
  Vue.$store = {
    search: async function (module: string, params: any) {
      const response = await $http.get(`/${module}/search`, { params });
      return response.data;
    },

    get: async function (module: string, params: any) {
      const response = await $http.get(`/${module}/get`, { params });
      return response.data;
    },

    create: async function (module: string, params: any, data: any) {
      const response = await $http.post(`/${module}/create`, data, { params });
      return response.data;
    },

    update: async function (module: string, params: any, data: any) {
      const response = await $http.post(`/${module}/update`, data, { params });
      return response.data;
    },

    customUpdate: async function (
      module: string,
      params: any,
      data: any,
      headers = {}
    ) {
      const response = await $http.post(`/${module}/me`, data, {
        params,
        headers,
      });
      return response.data;
    },

    invoke: async function (
      method: 'get' | 'post' | 'put' | 'delete',
      path: string,
      params = {},
      body = {}
    ) {
      let result;
      try {
        if (method === 'get' || 'delete') {
          result = await $http[method](`/${path}`, { params });
        } else {
          result = await $http[method](`/${path}`, body, { params });
        }
      } catch (error: any) {
        result = error.response
          ? error.response
          : { status: 500, data: error.message };
      }
      return result.data;
    },
  };

  // Attach the $store to the global object
  (window as any).StoreinoApp = Vue;
}
