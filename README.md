# Garmingo Status JS-SDK

This is the official Garmingo Status JS-SDK. It allows you to easily integrate the Garmingo Status into your website or Node.js application.<br />
It fully supports the Garmingo Status API spec (described [here](https://docs.garmingo.com/status/api-introduction)) and provides a simple and easy-to-use interface to interact with the Garmingo Status.

Please note that this library is very opinionated and follows a strict **error-free**/**non-throwing** approach.<br />
This means that the library should **never** throw an error, but instead return an object with a `success` property set to either `true` or `false`.<br />
This allows you to easily check if an error occurred and handle it accordingly, without wrapping every call in a try-catch block.

## Structure

When planning/structuring this library we wanted it to be as simple and self-explanatory as possible.<br />
Therefore, we decided to split the library into three main parts:
1. monitors
2. incidents
3. events

Each part is responsible for a different aspect of the Garmingo Status and provides a set of methods to interact with it.<br />
These methods all follow a **CRUD-first** approach, meaning that they follow the **C**reate, **R**ead, **U**pdate, **D**elete pattern when possible and only provide additional methods if necessary, with those having self-explanatory names as well.

## Installation

To install the Garmingo Status JS-SDK, simply run the following command in your terminal:

```bash
npm install @garmingo/status-js
```

## Usage

To use the Garmingo Status JS-SDK, you first need to import it into your project:

```javascript
import { Status } from '@garmingo/status-js';
```

Then, you can create a new instance of the `Status` class and start interacting with the Garmingo Status:

```javascript
const status = new Status(process.env.STATUS_API_KEY);
```

To access the functions of the `monitors`, `incidents` or `events` part, simply call the respective method on the `status` object:

```javascript
const monitors = status.monitors.getAll(); // Get a list of all monitors
const monitor = status.monitors.get('monitor-id'); // Get a specific monitor
...

const incidents = status.incidents.getAll(); // Get a list of all incidents
const incident = status.incidents.get('incident-id'); // Get a specific incident
...

const event = status.events.create({
    // Event properties
    ...
}); // Create a new event
...
```

## Documentation

For a detailed documentation of the Garmingo Status JS-SDK, please refer to the [official documentation](https://docs.garmingo.com/status/api-sdks/js).<br />
For a more general overview of the Garmingo Status API, please refer to the [API introduction](https://docs.garmingo.com/status/api-introduction).

## TypeScript

This library is written in TypeScript and fully supports TypeScript out of the box.<br />

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Even though this library is maintained by Garmingo itself, we are always open to contributions from the community.<br />
If you have any suggestions, improvements or bug fixes, feel free to open a pull request or issue on GitHub.