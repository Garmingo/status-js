/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { MonitorStatus } from ".";

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
