/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { Monitor, MonitorCreate, MonitorUpdate } from "./monitor";

export class StatusAPI {
  private readonly apiKey: string;

  constructor(apiKey: Readonly<string>) {
    this.apiKey = apiKey;
  }

  /**
   * All CRUD Functions that can be performed on Monitors.
   */
  public monitors = {
    /**
     * Get all Monitors.
     */
    getAll: async (
      limit?: number,
      page?: number
    ): Promise<
      | {
          success: true;
          data: Monitor[];
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },

    /**
     * Get a Monitor by its ID.
     * @param id - ID of the Monitor.
     */
    get: async (
      id: string
    ): Promise<
      | {
          success: true;
          data: Monitor;
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },

    /**
     * Get all Events for a monitor.
     * @param id - ID of the Monitor.
     */
    getEvents: async (
      id: string,
      limit?: number,
      page?: number
    ): Promise<
      | {
          success: true;
          data: Event[];
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },

    /**
     * Create a new Monitor.
     * @param monitor - Monitor to create.
     */
    create: async (
      monitor: MonitorCreate
    ): Promise<
      | {
          success: true;
          /**
           * ID of the created Monitor.
           */
          data: string;
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },

    /**
     * Update a Monitor by its ID.
     * @param id - ID of the Monitor.
     * @param monitor - The fields to update.
     */
    update: async (
      id: string,
      monitor: MonitorUpdate
    ): Promise<
      | {
          success: true;
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },

    /**
     * Delete a Monitor by its ID.
     * @param id - ID of the Monitor.
     */
    delete: async (
      id: string
    ): Promise<
      | {
          success: true;
        }
      | {
          success: false;
          message: string;
        }
    > => {
      return {
        success: false,
        message: "Not implemented",
      };
    },
  };
}

export {
  Monitor,
  MonitorCreate,
  MonitorUpdate,
  Proxy,
  StatusRegion,
} from "./monitor";
