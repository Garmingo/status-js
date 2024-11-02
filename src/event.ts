/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

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
  status: boolean;

  /**
   * Timestamp of the Event.
   */
  timestamp: Date;

  /**
   * Metadata of the Event.
   */
  metadata: any;
};
