/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import { StatusAPI } from "../src";
import { ERROR_CODE } from "../src/error";

const statusAPI = new StatusAPI(process.env.API_KEY as string);

describe("Get all Incidents", () => {
  test("Get all Incidents", async () => {
    const incidentResponse = await statusAPI.incidents.getAll();

    expect(incidentResponse.success).toBe(true);

    if (!incidentResponse.success) {
      return;
    }

    const incidents = incidentResponse.data.incidents;

    expect(incidents).toBeDefined();
  });
});

describe("Get specific Incident", () => {
  test("Get Incident by ID", async () => {
    const INCIDENT_ID = process.env.WORKING_INCIDENT_ID as string;
    const incidentResponse = await statusAPI.incidents.get(INCIDENT_ID);

    expect(incidentResponse.success).toBe(true);

    if (!incidentResponse.success) {
      return;
    }

    const incident = incidentResponse.data;

    expect(incident).toBeDefined();

    expect(incident.id).toBe(INCIDENT_ID);
  });

  test("Get Incident by Invalid ID", async () => {
    const INCIDENT_ID = "33333338a7221ba8f0ad8f0f";
    const incidentResponse = await statusAPI.incidents.get(INCIDENT_ID);

    expect(incidentResponse.success).toBe(false);

    if (incidentResponse.success) {
      return;
    }

    expect(incidentResponse.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });
});
