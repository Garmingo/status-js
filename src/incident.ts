/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

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
  metadata?: any;
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
    metadata: incident.metadata,
  };
}
