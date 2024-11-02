/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { ERROR_CODE } from "./error";

/**
 * Geographical region from where the Monitor will be checked.
 */
export type StatusRegion =
  | "eu-central"
  | "eu-central-2"
  | "eu-west"
  | "na-north"
  | "as-south"
  | "oc-east"
  | "us-east"
  | "us-west";

/**
 * Proxy Types available for the Monitor.
 */
export type Proxy = "http" | "https" | "socks5";

/**
 * Monitored Service
 */
export type Monitor = {
  /**
   * Unique identifier of the Monitor.
   */
  id: string;

  /**
   * Display name of the Monitor.
   */
  displayName: string;

  /**
   * Checking interval in seconds.
   */
  ttl: number;

  /**
   * Type of the Monitor.
   */
  type: string;

  /**
   * Geographical region from where the Monitor will be checked.
   */
  region: StatusRegion;

  /**
   * Whether or not the Monitor is enabled.
   */
  enabled: boolean;

  /**
   * Number of retries before the Monitor is considered down.
   */
  retries: number;

  /**
   * Keywords to group Monitors and filter them.
   */
  keywords: string[];

  /**
   * Additional metadata for the Monitor.
   */
  metadata?: any;

  /**
   * Settings for the Monitor.
   */
  settings: any;

  /**
   * Last time the Monitor was checked.
   */
  lastCheck: Date;

  /**
   * Type of the Proxy.
   */
  proxyType?: Proxy;

  /**
   * Host of the Proxy.
   */
  proxyHost?: string;

  /**
   * Port of the Proxy.
   */
  proxyPort?: number;

  /**
   * Username for the Proxy.
   */
  proxyUsername?: string;

  /**
   * Password for the Proxy.
   */
  proxyPassword?: string;

  /**
   * Current status of the Monitor.
   * True if the Monitor is up, false if the Monitor is down.
   */
  currentStatus: boolean;
};

/**
 * CRUD Create Monitor
 */
export type MonitorCreate = {
  /**
   * Display name of the Monitor.
   */
  displayName: string;

  /**
   * Checking interval in seconds.
   */
  ttl?: number;

  /**
   * Type of the Monitor.
   */
  type: string;

  /**
   * Geographical region from where the Monitor will be checked.
   */
  region: StatusRegion;

  /**
   * Whether or not the Monitor is enabled.
   */
  enabled?: boolean;

  /**
   * Number of retries before the Monitor is considered down.
   */
  retries: number;

  /**
   * Keywords to group Monitors and filter them.
   */
  keywords?: string[];

  /**
   * Additional metadata for the Monitor.
   */
  metadata?: any;

  /**
   * Settings for the Monitor.
   */
  settings: any;

  /**
   * Type of the Proxy.
   */
  proxyType?: Proxy;

  /**
   * Host of the Proxy.
   */
  proxyHost?: string;

  /**
   * Port of the Proxy.
   */
  proxyPort?: number;

  /**
   * Username for the Proxy.
   */
  proxyUsername?: string;

  /**
   * Password for the Proxy.
   */
  proxyPassword?: string;
};

/**
 * CRUD Update Monitor
 */
export type MonitorUpdate = {
  /**
   * Display name of the Monitor.
   */
  displayName?: string;

  /**
   * Checking interval in seconds.
   */
  ttl?: number;

  /**
   * Type of the Monitor.
   */
  type?: string;

  /**
   * Geographical region from where the Monitor will be checked.
   */
  region?: StatusRegion;

  /**
   * Whether or not the Monitor is enabled.
   */
  enabled?: boolean;

  /**
   * Number of retries before the Monitor is considered down.
   */
  retries?: number;

  /**
   * Keywords to group Monitors and filter them.
   */
  keywords?: string[];

  /**
   * Additional metadata for the Monitor.
   */
  metadata?: any;

  /**
   * Settings for the Monitor.
   */
  settings?: any;

  /**
   * Type of the Proxy.
   */
  proxyType?: Proxy;

  /**
   * Host of the Proxy.
   */
  proxyHost?: string;

  /**
   * Port of the Proxy.
   */
  proxyPort?: number;

  /**
   * Username for the Proxy.
   */
  proxyUsername?: string;

  /**
   * Password for the Proxy.
   */
  proxyPassword?: string;
};

/**
 * Get all Monitors.
 * @param limit - Number of Monitors to return.
 * @param page - Page number to return.
 * @returns All Monitors.
 */
export async function getAllMonitors(
  apiKey: string,
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
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}

/**
 * Get a Monitor by its ID.
 * @param id - ID of the Monitor.
 */
export async function getMonitor(
  apiKey: string,
  id: string
): Promise<
  | {
      success: true;
      data: Monitor;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}

/**
 * Get all Events for a monitor.
 * @param id - ID of the Monitor.
 */
export async function getMonitorEvents(
  apiKey: string,
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
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}

/**
 * Create a new Monitor.
 * @param monitor - Monitor to create.
 */
export async function createMonitor(
  apiKey: string,
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
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}

/**
 * Update a Monitor by its ID.
 * @param id - ID of the Monitor.
 * @param monitor - The fields to update.
 */
export async function updateMonitor(
  apiKey: string,
  id: string,
  monitor: MonitorUpdate
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}

/**
 * Delete a Monitor by its ID.
 * @param id - ID of the Monitor.
 */
export async function deleteMonitor(
  apiKey: string,
  id: string
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  return {
    success: false,
    message: "Not implemented",
    errorCode: ERROR_CODE.NOT_IMPLEMENTED,
  };
}
