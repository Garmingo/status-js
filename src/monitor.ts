/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { BASE_URL, HEADER_NAME, MonitorStatus } from ".";
import { ERROR_CODE } from "./error";
import { buildEventObject, StatusEvent } from "./event";

/**
 * Build a Monitor object from a raw object.
 * @param rawObject - Raw object to build the Monitor from.
 * @returns Monitor object.
 */
function buildMonitorObject(rawObject: any): Monitor {
  return {
    id: rawObject.id,
    displayName: rawObject.displayName,
    ttl: rawObject.ttl,
    type: rawObject.type,
    region: rawObject.region,
    enabled: rawObject.enabled,
    retries: rawObject.retries,
    keywords: rawObject.keywords,
    metadata: rawObject.metadata,
    settings: rawObject.settings,
    lastCheck: new Date(rawObject.lastCheck),
    proxyType: rawObject.proxyType,
    proxyHost: rawObject.proxyHost,
    proxyPort: rawObject.proxyPort,
    proxyUsername: rawObject.proxyUsername,
    proxyPassword: rawObject.proxyPassword,
    currentStatus: rawObject.currentStatus,
  };
}

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
 * Type of monitored Service.
 */
export type MonitorType = "http" | "icmp" | "tcp" | "udp" | "heartbeat";

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
  type: MonitorType;

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
  currentStatus: MonitorStatus;
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
  type: MonitorType;

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
  type?: MonitorType;

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
      data: {
        /**
         * List of Monitors.
         */
        monitors: Monitor[];
        /**
         * Total number of Monitors.
         */
        count: number;
      };
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.append("limit", limit.toString());
  if (page) searchParams.append("page", page.toString());

  const response = await fetch(
    BASE_URL +
      "/monitors" +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [HEADER_NAME]: apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: {
      monitors: responseData.data.monitors.map(buildMonitorObject),
      count: responseData.data.count,
    },
  };
}

/**
 * Search for Monitors.
 * @param query - Search query to filter Monitors.
 * @param limit - Number of Monitors to return.
 * @param page - Page number to return.
 * @returns All Monitors that match the search query.
 */
export async function searchMonitors(
  apiKey: string,
  search: {
    query?: string;
    status?: "online" | "offline";
    regions?: StatusRegion[];
    types?: MonitorType[];
  },
  limit?: number,
  page?: number
): Promise<
  | {
      success: true;
      data: {
        /**
         * List of Monitors.
         */
        monitors: Monitor[];
        /**
         * Total number of Monitors.
         */
        count: number;
      };
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const searchParams = new URLSearchParams();
  if (search.query) searchParams.append("query", search.query);
  if (search.status) searchParams.append("status", search.status);
  if (search.regions)
    searchParams.append("regions", JSON.stringify(search.regions));
  if (search.types) searchParams.append("types", JSON.stringify(search.types));
  if (limit) searchParams.append("limit", limit.toString());
  if (page) searchParams.append("page", page.toString());

  const response = await fetch(
    BASE_URL +
      "/monitors/search" +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [HEADER_NAME]: apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: {
      monitors: responseData.data.monitors.map(buildMonitorObject),
      count: responseData.data.count,
    },
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
  const response = await fetch(BASE_URL + `/monitors/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
  });

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: buildMonitorObject(responseData.data),
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
      data: {
        events: StatusEvent[];
        count: number;
      };
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.append("limit", limit.toString());
  if (page) searchParams.append("page", page.toString());

  const response = await fetch(
    BASE_URL +
      `/monitors/${id}/events` +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [HEADER_NAME]: apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: {
      events: responseData.data.events.map(buildEventObject),
      count: responseData.data.count,
    },
  };
}

/**
 * Get uptime for a Monitor.
 * @param id - ID of the Monitor.
 * @param timespan - Timespan to get the uptime for.
 */
export async function getMonitorUptime(
  apiKey: string,
  id: string,
  timespan: "24h" | "7d" | "30d" | "90d"
): Promise<
  | {
      success: true;
      /**
       * Uptime percentage in percent.
       */
      data: number;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const searchParams = new URLSearchParams();
  searchParams.append("timespan", timespan);

  const response = await fetch(
    BASE_URL +
      `/monitors/${id}/uptime` +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [HEADER_NAME]: apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: responseData.data,
  };
}

/**
 * Get response time for a Monitor.
 * @param id - ID of the Monitor.
 * @param timespan - Timespan to calculate the get time for.
 */
export async function getMonitorResponseTime(
  apiKey: string,
  id: string,
  timespan: "24h" | "7d" | "30d" | "90d"
): Promise<
  | {
      success: true;
      data: {
        /**
         * Minimum response time in milliseconds.
         */
        min: number;
        /**
         * Maximum response time in milliseconds.
         */
        max: number;
        /**
         * Average response time in milliseconds.
         */
        avg: number;
      };
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const searchParams = new URLSearchParams();
  searchParams.append("timespan", timespan);

  const response = await fetch(
    BASE_URL +
      `/monitors/${id}/response-time` +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [HEADER_NAME]: apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: responseData.data,
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

      data: {
        /**
         * ID of the created Monitor.
         */
        id: string;
      };
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const response = await fetch(BASE_URL + "/monitors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
    body: JSON.stringify(monitor),
  });

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
    data: responseData.data,
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
  const response = await fetch(BASE_URL + `/monitors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
    body: JSON.stringify(monitor),
  });

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
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
  const response = await fetch(BASE_URL + `/monitors/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
  });

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
  };
}

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
export async function sendHeartbeat(
  token: string,
  fail = false
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
  const response = await fetch(
    BASE_URL + `/heartbeat/${token}${fail ? "/fail" : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
  };
}

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
export async function pauseMonitor(
  apiKey: string,
  id: string,
  duration: number
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
  const response = await fetch(BASE_URL + `/monitors/${id}/pause`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
    body: JSON.stringify({ duration }),
  });

  if (!response.ok) {
    const errorMessage = (await response.json()).message ?? response.statusText;

    return {
      success: false,
      message: errorMessage,
      errorCode: response.status,
    };
  }

  const responseData = await response.json();

  if (!responseData.success) {
    return {
      success: false,
      message: responseData.message,
      errorCode: response.status ?? ERROR_CODE.BAD_REQUEST,
    };
  }

  return {
    success: true,
  };
}
