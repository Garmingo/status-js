/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { StatusAPI } from "../src";
import { ERROR_CODE } from "../src/error";

const statusAPI = new StatusAPI(process.env.API_KEY as string);

describe("Retrieve Monitors List", () => {
  test("Get a list of monitors", async () => {
    const result = await statusAPI.monitors.getAll();

    expect(result.success).toBe(true);
  });

  test("Fail when limit is not a number", async () => {
    const result = await statusAPI.monitors.getAll("test" as unknown as number);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when page is not a number", async () => {
    const result = await statusAPI.monitors.getAll(
      undefined,
      "test" as unknown as number
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when limit is less than 1", async () => {
    const result = await statusAPI.monitors.getAll(-1);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when page is less than 1", async () => {
    const result = await statusAPI.monitors.getAll(undefined, -1);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Result is empty when page is too high", async () => {
    const result = await statusAPI.monitors.getAll(undefined, 1000000);

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.data.monitors).toHaveLength(0);
  });
});

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
