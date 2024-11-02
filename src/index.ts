/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import {
  getAllMonitors,
  getMonitorEvents,
  getMonitor,
  MonitorCreate,
  MonitorUpdate,
  createMonitor,
  updateMonitor,
  deleteMonitor,
} from "./monitor";

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
     * @param limit - Number of Monitors to return.
     * @param page - Page number to return.
     * @returns All Monitors.
     */
    getAll: async (limit?: number, page?: number) => {
      return await getAllMonitors(this.apiKey, limit, page);
    },

    /**
     * Get a Monitor by its ID.
     * @param id - ID of the Monitor.
     */
    get: async (id: string) => {
      return await getMonitor(this.apiKey, id);
    },

    /**
     * Get all Events for a monitor.
     * @param id - ID of the Monitor.
     */
    getEvents: async (id: string, limit?: number, page?: number) => {
      return await getMonitorEvents(this.apiKey, id, limit, page);
    },

    /**
     * Create a new Monitor.
     * @param monitor - Monitor to create.
     */
    create: async (monitor: MonitorCreate) => {
      return await createMonitor(this.apiKey, monitor);
    },

    /**
     * Update a Monitor by its ID.
     * @param id - ID of the Monitor.
     * @param monitor - The fields to update.
     */
    update: async (id: string, monitor: MonitorUpdate) => {
      return await updateMonitor(this.apiKey, id, monitor);
    },

    /**
     * Delete a Monitor by its ID.
     * @param id - ID of the Monitor.
     */
    delete: async (id: string) => {
      return await deleteMonitor(this.apiKey, id);
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
