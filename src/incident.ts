/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { BASE_URL, HEADER_NAME } from ".";
import { ERROR_CODE } from "./error";

/**
 * Status Incident.
 */
export type StatusIncident = {
  /**
   * Incident ID.
   * Unique identifier for the Incident.
   */
  id: string;

  /**
   * Incident Title.
   * Short description of the Incident.
   */
  title: string;

  /**
   * Incident Description.
   * Detailed description of the Incident.
   */
  description: string;

  /**
   * Incident Status.
   * Cosmetic status of the resolving process.
   */
  status: string;

  /**
   * Incident Resolved.
   * Whether the Incident has been resolved.
   */
  resolved: boolean;

  /**
   * Resolve When Online.
   * Whether the Incident should be resolved when the Monitor is online.
   */
  resolveWhenOnline: boolean;

  /**
   * Monitor IDs.
   * Monitors affected by the Incident.
   */
  monitorIds: string[];

  /**
   * Event IDs.
   * Events that triggered the Incident.
   */
  eventIds: string[];

  /**
   * Start Time.
   * Timestamp when the Incident started.
   */
  start: Date;

  /**
   * End Time.
   * Timestamp when the Incident ended.
   */
  end?: Date;

  /**
   * Metadata.
   * Additional data about the Incident.
   */
  metadata?: Map<string, any>;
};

/**
 * Status Incident CRUD Operation Create.
 */
export type StatusIncidentCreate = {
  /**
   * Incident Title.
   * Short description of the Incident.
   */
  title: string;

  /**
   * Incident Description.
   * Detailed description of the Incident.
   */
  description?: string;

  /**
   * Incident Status.
   * Cosmetic status of the resolving process.
   */
  status?: string;

  /**
   * Resolve When Online.
   * Whether the Incident should be resolved when the Monitor is online.
   */
  resolveWhenOnline?: boolean;

  /**
   * Monitor IDs.
   * Monitors affected by the Incident.
   */
  monitorIds?: string[];

  /**
   * Event IDs.
   * Events that triggered the Incident.
   */
  eventIds: string[];
};

/**
 * Status Incident CRUD Operation Update.
 */
export type StatusIncidentUpdate = {
  /**
   * Incident Title.
   * Short description of the Incident.
   */
  title?: string;

  /**
   * Incident Description.
   * Detailed description of the Incident.
   */
  description?: string;

  /**
   * Incident Status.
   * Cosmetic status of the resolving process.
   */
  status?: string;

  /**
   * Incident Resolved.
   * Whether the Incident has been resolved.
   */
  resolved?: boolean;

  /**
   * Resolve When Online.
   * Whether the Incident should be resolved when the Monitor is online.
   */
  resolveWhenOnline?: boolean;

  /**
   * Monitor IDs.
   * Monitors affected by the Incident.
   */
  monitorIds?: string[];
};

/**
 * Build an Incident Object from the API Response.
 * @param incident - Incident Object from the API.
 * @returns Incident Object.
 */
function buildIncidentObject(incident: any): StatusIncident {
  return {
    id: incident.id,
    title: incident.title,
    description: incident.description,
    status: incident.status,
    resolved: incident.resolved,
    resolveWhenOnline: incident.resolve_when_online,
    monitorIds: incident.monitor_ids,
    eventIds: incident.event_ids,
    start: new Date(incident.start),
    end: incident.end ? new Date(incident.end) : undefined,
    metadata: incident.metadata
      ? new Map(Object.entries(incident.metadata))
      : undefined,
  };
}

/**
 * Get all Incidents.
 * @param limit - Number of Incidents to return.
 * @param page - Page number to return.
 * @returns All Incidents.
 */
export async function getAllIncidents(
  apiKey: string,
  limit?: number,
  page?: number
): Promise<
  | {
      success: true;
      data: {
        /**
         * List of Incidents.
         */
        incidents: StatusIncident[];
        /**
         * Total number of Incidents.
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
      "/incidents" +
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
      incidents: responseData.data.incidents.map(buildIncidentObject),
      count: responseData.data.count,
    },
  };
}

/**
 * Get an Incident by its ID.
 * @param id - ID of the Incident.
 */
export async function getIncident(
  apiKey: string,
  id: string
): Promise<
  | {
      success: true;
      data: StatusIncident;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const response = await fetch(BASE_URL + `/incidents/${id}`, {
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
    data: buildIncidentObject(responseData.data),
  };
}

/**
 * Create a new Incident.
 * @param incident - Incident to create.
 */
export async function createIncident(
  apiKey: string,
  incident: StatusIncidentCreate
): Promise<
  | {
      success: true;

      data: {
        /**
         * ID of the created incident.
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
  const response = await fetch(BASE_URL + "/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
    body: JSON.stringify(incident),
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
 * Update an Incident by its ID.
 * @param id - ID of the Incident.
 * @param incident - The fields to update.
 */
export async function updateIncident(
  apiKey: string,
  id: string,
  incident: StatusIncidentUpdate
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
  const response = await fetch(BASE_URL + `/incidents/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      [HEADER_NAME]: apiKey,
    },
    body: JSON.stringify(incident),
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
 * Delete an Incident by its ID.
 * @param id - ID of the Incident.
 */
export async function deleteIncident(
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
  const response = await fetch(BASE_URL + `/incidents/${id}`, {
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
