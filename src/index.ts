/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

import monitors from "./monitor";

export class StatusAPI {
  private readonly apiKey: string;

  constructor(apiKey: Readonly<string>) {
    this.apiKey = apiKey;
  }

  /**
   * All CRUD Functions that can be performed on Monitors.
   */
  public monitors = monitors;
}

export {
  Monitor,
  MonitorCreate,
  MonitorUpdate,
  Proxy,
  StatusRegion,
} from "./monitor";
