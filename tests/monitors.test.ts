/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { MonitorStatus, StatusAPI } from "../src";
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

    if (!monitorResult.success) {
      return;
    }

    expect(monitorResult.data).toBeDefined();
    expect(monitorResult.data.id).toBe(monitor.id);
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

describe("Retrieve Monitor Events", () => {
  test("Get all events for a monitor", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const eventsResult = await statusAPI.monitors.getEvents(monitor.id);

    expect(eventsResult.success).toBe(true);
  });

  test("Fail when ID is empty", async () => {
    const result = await statusAPI.monitors.getEvents(
      null as unknown as string
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when ID does not exist", async () => {
    const result = await statusAPI.monitors.getEvents(
      "313233343536373839303132"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Fail when ID is too long", async () => {
    const result = await statusAPI.monitors.getEvents("a".repeat(256));

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(
      [ERROR_CODE.BAD_REQUEST, ERROR_CODE.NOT_FOUND].includes(result.errorCode)
    ).toBe(true);
  });

  test("Fail when ID is too short", async () => {
    const result = await statusAPI.monitors.getEvents("a");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});

describe("Retrieve Monitor Uptime", () => {
  test("Get uptime for a monitor", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const uptimeResult = await statusAPI.monitors.getUptime(monitor.id, "24h");

    expect(uptimeResult.success).toBe(true);

    if (!uptimeResult.success) {
      return;
    }

    expect(uptimeResult.data).toBeDefined();
    // Be a number
    expect(uptimeResult.data).toEqual(expect.any(Number));
  });

  test("Fail when ID is empty", async () => {
    const result = await statusAPI.monitors.getUptime(
      null as unknown as string,
      "24h"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when ID does not exist", async () => {
    const result = await statusAPI.monitors.getUptime(
      "313233343536373839303132",
      "24h"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Fail when ID is too long", async () => {
    const result = await statusAPI.monitors.getUptime("a".repeat(256), "24h");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(
      [ERROR_CODE.BAD_REQUEST, ERROR_CODE.NOT_FOUND].includes(result.errorCode)
    ).toBe(true);
  });

  test("Fail when ID is too short", async () => {
    const result = await statusAPI.monitors.getUptime("a", "24h");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when timespan is invalid", async () => {
    const result = await statusAPI.monitors.getUptime(
      "a".repeat(24),
      "invalid" as any
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});

describe("Retrieve Monitor Response Time", () => {
  test("Get response time for a monitor", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const responseTimeResult = await statusAPI.monitors.getResponseTime(
      monitor.id,
      "24h"
    );

    expect(responseTimeResult.success).toBe(true);

    if (!responseTimeResult.success) {
      return;
    }

    expect(responseTimeResult.data).toBeDefined();
    expect(responseTimeResult.data.min).toBeDefined();
    expect(responseTimeResult.data.max).toBeDefined();
    expect(responseTimeResult.data.avg).toBeDefined();
    // Be a number
    expect(responseTimeResult.data.min).toEqual(expect.any(Number));
    expect(responseTimeResult.data.max).toEqual(expect.any(Number));
    expect(responseTimeResult.data.avg).toEqual(expect.any(Number));
  });

  test("Fail when ID is empty", async () => {
    const result = await statusAPI.monitors.getResponseTime(
      null as unknown as string,
      "24h"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when ID does not exist", async () => {
    const result = await statusAPI.monitors.getResponseTime(
      "313233343536373839303132",
      "24h"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });

  test("Fail when ID is too long", async () => {
    const result = await statusAPI.monitors.getResponseTime(
      "a".repeat(256),
      "24h"
    );

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(
      [ERROR_CODE.BAD_REQUEST, ERROR_CODE.NOT_FOUND].includes(result.errorCode)
    ).toBe(true);
  });

  test("Fail when ID is too short", async () => {
    const result = await statusAPI.monitors.getResponseTime("a", "24h");

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }
    expect(result.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});

describe("Monitor CRUD Lifecycle", () => {
  test("Create, Update, and Delete a Monitor", async () => {
    const createResult = await statusAPI.monitors.create({
      displayName: "Test Monitor",
      region: "eu-central",
      retries: 3,
      type: "http",
      settings: {
        url: "https://example.com",
        method: "GET",
        headers: {
          "User-Agent": "StatusAPI",
        },
      },
    });

    expect(createResult.success).toBe(true);

    if (!createResult.success) {
      return;
    }

    const monitor = createResult.data;

    expect(monitor).toBeDefined();
    expect(monitor.id).toBeDefined();

    const updateResult = await statusAPI.monitors.update(monitor.id, {
      displayName: "Updated Monitor",
    });

    expect(updateResult.success).toBe(true);

    if (!updateResult.success) {
      return;
    }

    const deleteResult = await statusAPI.monitors.delete(monitor.id);

    expect(deleteResult.success).toBe(true);

    const getMonitorResult = await statusAPI.monitors.get(monitor.id);

    expect(getMonitorResult.success).toBe(false);
  });

  test("Fail when creating a Monitor with invalid data", async () => {
    const createResult = await statusAPI.monitors.create({
      name: "Test Monitor",
      url: "example.com",
      interval: 60,
    } as any);

    expect(createResult.success).toBe(false);

    if (createResult.success) {
      return;
    }

    expect(createResult.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when updating a Monitor with invalid data", async () => {
    const getMonitorResult = await statusAPI.monitors.getAll();

    if (!getMonitorResult.success) {
      expect(getMonitorResult.success).toBe(true);
      return;
    }

    const monitor = getMonitorResult.data.monitors[0];

    const updateResult = await statusAPI.monitors.update(monitor.id, {
      enabled: "Updated Monitor",
    } as any);

    expect(updateResult.success).toBe(false);

    if (updateResult.success) {
      return;
    }

    expect(updateResult.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when deleting a Monitor that does not exist", async () => {
    const deleteResult = await statusAPI.monitors.delete(
      "313233343536373839303132"
    );

    expect(deleteResult.success).toBe(false);

    if (deleteResult.success) {
      return;
    }
    expect(deleteResult.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });
});

describe("Set Monitor Status", () => {
  test("Set a Monitor to online", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const setStatusResult = await statusAPI.monitors.setStatus(
      monitor.id,
      MonitorStatus.ONLINE
    );

    expect(setStatusResult.success).toBe(true);
  });

  test("Set a Monitor to offline", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const setStatusResult = await statusAPI.monitors.setStatus(
      monitor.id,
      MonitorStatus.OFFLINE
    );

    expect(setStatusResult.success).toBe(true);
  });

  test("Fail when setting a Monitor to an invalid status", async () => {
    const result = await statusAPI.monitors.getAll();

    if (!result.success) {
      expect(result.success).toBe(true);
      return;
    }

    const monitor = result.data.monitors[0];

    const setStatusResult = await statusAPI.monitors.setStatus(
      monitor.id,
      "invalid" as any
    );

    expect(setStatusResult.success).toBe(false);

    if (setStatusResult.success) {
      return;
    }
    expect(setStatusResult.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });

  test("Fail when setting a Monitor to an invalid ID", async () => {
    const setStatusResult = await statusAPI.monitors.setStatus(
      "123",
      MonitorStatus.ONLINE
    );

    expect(setStatusResult.success).toBe(false);

    if (setStatusResult.success) {
      return;
    }
    expect(setStatusResult.errorCode).toBe(ERROR_CODE.BAD_REQUEST);
  });
});
