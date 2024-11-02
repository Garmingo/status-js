/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { getEvent } from "./event";
import { getAllIncidents } from "./incident";
import {
  getAllMonitors,
  getMonitorEvents,
  getMonitor,
  MonitorCreate,
  MonitorUpdate,
  createMonitor,
  updateMonitor,
  deleteMonitor,
  searchMonitors,
  StatusRegion,
  MonitorType,
  getMonitorUptime,
  getMonitorResponseTime,
  sendHeartbeat,
  pauseMonitor,
  setMonitorStatus,
} from "./monitor";

export const BASE_URL = "https://garmingo.com/api/status/v1";
export const HEADER_NAME = "x-garmingo-status-key";
export const MonitorStatus = {
  ONLINE: true,
  OFFLINE: false,
} as const;

export type MonitorStatus = (typeof MonitorStatus)[keyof typeof MonitorStatus];

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
     * Search for Monitors.
     * @param query - Search query to filter Monitors.
     * @param limit - Number of Monitors to return.
     * @param page - Page number to return.
     * @returns All Monitors that match the search query.
     */
    searchMonitors: async (
      search: {
        query?: string;
        status?: "online" | "offline";
        regions?: StatusRegion[];
        types?: MonitorType[];
      },
      limit?: number,
      page?: number
    ) => {
      return await searchMonitors(this.apiKey, search, limit, page);
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
     * Get uptime for a Monitor.
     * @param id - ID of the Monitor.
     * @param timespan - Timespan to get the uptime for.
     */
    getUptime: async (id: string, timespan: "24h" | "7d" | "30d" | "90d") => {
      return await getMonitorUptime(this.apiKey, id, timespan);
    },

    /**
     * Get response time for a Monitor.
     * @param id - ID of the Monitor.
     * @param timespan - Timespan to calculate the get time for.
     */
    getResponseTime: async (
      id: string,
      timespan: "24h" | "7d" | "30d" | "90d"
    ) => {
      return await getMonitorResponseTime(this.apiKey, id, timespan);
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

    /**
     * Send a Heartbeat to the Monitor.
     * @param token - Heartbeat token.
     *
     * @remarks
     * This function is used to send a heartbeat to the Monitor.
     * It only works for Monitors of type `heartbeat`.
     *
     * The heartbeat token is generated when the Monitor is created and can be obtained from the Dashboard.
     */
    sendHeartbeat: async (token: string, fail = false) => {
      return await sendHeartbeat(token, fail);
    },

    /**
     * Temporarily pause a Monitor.
     * @param id - ID of the Monitor.
     * @param duration - Duration in seconds to pause the Monitor. 1 minute (60) minimum. 12 hours (43.200) maximum.
     *
     * @remarks
     * This function is used to pause a Monitor for a specific duration.
     * The Monitor will not be checked during this time.
     * This is especially useful for maintenance or debugging purposes e.g. in CI/CD pipelines.
     */
    pause: async (id: string, duration: number) => {
      return await pauseMonitor(this.apiKey, id, duration);
    },

    /**
     * Set the status of a Monitor.
     * @param id - ID of the Monitor.
     * @param status - Status of the Monitor.
     */
    setStatus: async (id: string, status: MonitorStatus) => {
      return await setMonitorStatus(this.apiKey, id, status);
    },
  };

  /**
   * All Functions that can be performed related to Events.
   */
  public events = {
    /**
     * Get a specific Event by its ID.
     * @param id - ID of the Event.
     * @returns Event Object.
     */
    get: async (id: string) => {
      return await getEvent(this.apiKey, id);
    },
  };

  /**
   * All Functions that can be performed related to Incidents.
   */
  public incidents = {
    /**
     * Get all Incidents.
     * @param limit - Number of Incidents to return.
     * @param page - Page number to return.
     * @returns All Incidents.
     */
    getAll: async (limit?: number, page?: number) => {
      return await getAllIncidents(this.apiKey, limit, page);
    },

    get: async () => {},

    create: async () => {},

    update: async () => {},

    delete: async () => {},
  };
}

export {
  Monitor,
  MonitorCreate,
  MonitorUpdate,
  Proxy,
  StatusRegion,
} from "./monitor";

export { StatusEvent } from "./event";

export {
  StatusIncident,
  StatusIncidentUpdate,
  StatusIncidentCreate,
} from "./incident";
