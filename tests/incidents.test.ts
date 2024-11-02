/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import { StatusAPI } from "../src";

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
