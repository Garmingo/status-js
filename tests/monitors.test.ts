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

describe("Search Monitors", () => {
  test("Search for monitors", async () => {
    const result = await statusAPI.monitors.searchMonitors({
      query: "test query",
    });

    expect(result.success).toBe(true);
  });

  test("Fail when limit is not a number", async () => {
    const result = await statusAPI.monitors.searchMonitors(
      {},
      "test" as unknown as number
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when page is not a number", async () => {
    const result = await statusAPI.monitors.searchMonitors(
      {},
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
    const result = await statusAPI.monitors.searchMonitors({}, -1);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when page is less than 1", async () => {
    const result = await statusAPI.monitors.searchMonitors({}, undefined, -1);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when query is too long", async () => {
    const result = await statusAPI.monitors.searchMonitors({
      query: "a".repeat(256),
    });

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when query is too short", async () => {
    const result = await statusAPI.monitors.searchMonitors({
      query: "a",
    });

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
  });

  test("Result is empty when page is too high", async () => {
    const result = await statusAPI.monitors.searchMonitors(
      {},
      undefined,
      1000000
    );

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.data.monitors).toHaveLength(0);
  });
});

describe("Retrieve specific Monitor", () => {
  test("Get a monitor by its ID", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const monitorResult = await statusAPI.monitors.get(monitor.id);

    expect(monitorResult.success).toBe(true);
  });

  test("Fail when ID is empty", async () => {
    const result = await statusAPI.monitors.get(null as unknown as string);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when ID does not exist", async () => {
    const result = await statusAPI.monitors.get("313233343536373839303132");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Fail when ID is too long", async () => {
    const result = await statusAPI.monitors.get("a".repeat(256));

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(
      [ERROR_CODE.BAD_REQUEST, ERROR_CODE.NOT_FOUND].includes(result.errorCode)
    ).toBe(true);
  });

  test("Fail when ID is too short", async () => {
    const result = await statusAPI.monitors.get("a");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});
