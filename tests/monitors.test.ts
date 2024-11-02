/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { StatusAPI } from "../src";

test("Get a list of monitors", async () => {
  const statusAPI = new StatusAPI(process.env.API_KEY as string);

  const result = await statusAPI.monitors.getAll();

  expect(result.success).toBe(true);
});

test("Get a monitor by its ID", async () => {
  const statusAPI = new StatusAPI(process.env.API_KEY as string);

  const result = await statusAPI.monitors.getAll();

  if (!result.success) {
    expect(result.success).toBe(true);
    return;
  }

  const monitor = result.data.monitors[0];

  const monitorResult = await statusAPI.monitors.get(monitor.id);

  expect(monitorResult.success).toBe(true);
});
