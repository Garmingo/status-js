/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import { StatusAPI } from "../src";

test("Get a list of monitors", async () => {
  const statusAPI = new StatusAPI(process.env.API_KEY!);

  const result = await statusAPI.monitors.getAll();

  expect(result.success).toBe(true);
});
