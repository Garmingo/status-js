/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import { StatusAPI } from "../src";
import { ERROR_CODE } from "../src/error";

const statusAPI = new StatusAPI(process.env.API_KEY as string);

describe("Get specific Event", () => {
  test("Get Event by ID", async () => {
    const EVENT_ID = "670969d8a7221ba8f0ad8f0f";
    const eventResponse = await statusAPI.events.get(EVENT_ID);

    expect(eventResponse.success).toBe(true);

    if (!eventResponse.success) {
      return;
    }

    const event = eventResponse.data;

    expect(event).toBeDefined();

    expect(event.id).toBe(EVENT_ID);
  });

  test("Get Event by Invalid ID", async () => {
    const EVENT_ID = "33333338a7221ba8f0ad8f0f";
    const eventResponse = await statusAPI.events.get(EVENT_ID);

    expect(eventResponse.success).toBe(false);

    if (eventResponse.success) {
      return;
    }

    expect(eventResponse.errorCode).toBe(ERROR_CODE.NOT_FOUND);
  });
});
