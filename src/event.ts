/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { BASE_URL, HEADER_NAME, MonitorStatus } from ".";
import { ERROR_CODE } from "./error";

/**
 * Status Event Interface.
 */
export type StatusEvent = {
  /**
   * Event ID.
   */
  id: string;

  /**
   * Monitor ID.
   */
  monitorId: string;

  /**
   * Status of the Event.
   * Whether the Monitor is online or offline.
   */
  status: MonitorStatus;

  /**
   * Timestamp of the Event.
   */
  timestamp: Date;

  /**
   * Metadata of the Event.
   */
  metadata: any;
};

/**
 * Build an Event Object from the API Response.
 * @param event - Event Object from the API.
 * @returns Event Object.
 */
export function buildEventObject(event: any): StatusEvent {
  return {
    id: event.id,
    monitorId: event.monitor_id,
    status: event.status,
    timestamp: new Date(event.timestamp),
    metadata: event.metadata,
  };
}

/**
 * Get an Event by its ID.
 * @param id - ID of the Event.
 */
export async function getEvent(
  apiKey: string,
  id: string
): Promise<
  | {
      success: true;
      data: StatusEvent;
    }
  | {
      success: false;
      message: string;
      errorCode: ERROR_CODE;
    }
> {
  const response = await fetch(BASE_URL + `/events/${id}`, {
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
    data: buildEventObject(responseData.data),
  };
}
