/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import { StatusAPI, StatusIncidentCreate, StatusIncidentUpdate } from "../src";
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
    const allIncidentsResponse = await statusAPI.incidents.getAll();

    expect(allIncidentsResponse.success).toBe(true);

    if (!allIncidentsResponse.success) {
      return;
    }

    const incident = allIncidentsResponse.data.incidents[0];

    expect(incident).toBeDefined();

    expect(incident.id).toBe(incident.id);
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

describe("Create, Update, Delete Incident", () => {
  test("Full Incident Lifecycle", async () => {
    const monitorResponse = await statusAPI.monitors.getAll(1);

    expect(monitorResponse.success).toBe(true);

    if (!monitorResponse.success) {
      return;
    }

    const monitor = monitorResponse.data.monitors[0];

    const incidentCreate = {
      title: "Test Incident",
      description: "Test Incident Description",
      status: "Investigating",
      resolveWhenOnline: false,
      monitorIds: [monitor.id],
    } satisfies StatusIncidentCreate;

    const createResponse = await statusAPI.incidents.create(incidentCreate);

    expect(createResponse.success).toBe(true);

    if (!createResponse.success) {
      return;
    }

    const createdIncidentId = createResponse.data.id;

    expect(createdIncidentId).toBeDefined();

    const incidentUpdate = {
      title: "Test Incident Updated",
      description: "Test Incident Description Updated",
      status: "Identified",
      resolved: true,
      resolveWhenOnline: true,
      monitorIds: [],
    } satisfies StatusIncidentUpdate;

    const updateResponse = await statusAPI.incidents.update(
      createdIncidentId,
      incidentUpdate
    );

    expect(updateResponse.success).toBe(true);

    if (!updateResponse.success) {
      return;
    }

    const deleteResponse = await statusAPI.incidents.delete(createdIncidentId);

    expect(deleteResponse.success).toBe(true);
  });

  test("Create Incident with Invalid Monitor ID", async () => {
    const incidentCreate = {
      title: "Test Incident",
      description: "Test Incident Description",
      status: "Investigating",
      resolveWhenOnline: false,
      monitorIds: ["33333338a7221ba8f0ad8f0f"],
    } satisfies StatusIncidentCreate;

    const createResponse = await statusAPI.incidents.create(incidentCreate);

    expect(createResponse.success).toBe(false);

    if (createResponse.success) {
      return;
    }

    expect(createResponse.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Update Incident with Invalid ID", async () => {
    const incidentUpdate = {
      title: "Test Incident Updated",
      description: "Test Incident Description Updated",
      status: "Identified",
      resolved: true,
      resolveWhenOnline: true,
      monitorIds: [],
    } satisfies StatusIncidentUpdate;

    const updateResponse = await statusAPI.incidents.update(
      "33333338a7221ba8f0ad8f0f",
      incidentUpdate
    );

    expect(updateResponse.success).toBe(false);

    if (updateResponse.success) {
      return;
    }

    expect(updateResponse.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Create Incident without Title", async () => {
    const incidentCreate = {
      description: "Test Incident Description",
      status: "Investigating",
      resolveWhenOnline: false,
      monitorIds: [],
    } as any;

    const createResponse = await statusAPI.incidents.create(incidentCreate);

    expect(createResponse.success).toBe(false);

    if (createResponse.success) {
      return;
    }

    expect(createResponse.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Create Incident with empty Monitor IDs", async () => {
    const incidentCreate = {
      title: "Test Incident",
      description: "Test Incident Description",
      status: "Investigating",
      resolveWhenOnline: false,
      monitorIds: [],
    } satisfies StatusIncidentCreate;

    const createResponse = await statusAPI.incidents.create(incidentCreate);

    expect(createResponse.success).toBe(false);

    if (createResponse.success) {
      return;
    }

    expect(createResponse.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});
