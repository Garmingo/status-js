/*
 *   Copyright (c) 2024 Garmingo UG (haftungsbeschraenkt)
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */

export enum ERROR_CODES {
  // 400er Codes
  /**
   * Bad Request (400)
   * The server cannot or will not process the request due to an apparent client error.
   *
   * @example
   * Malformed JSON, missing parameters, etc.
   */
  BAD_REQUEST = 400,

  /**
   * Unauthorized (401)
   * The request has not been applied because it lacks valid authentication credentials for the target resource.
   *
   * @example
   * Invalid API Key, expired token, etc.
   */
  UNAUTHORIZED = 401,

  /**
   * Forbidden (403)
   * The server understood the request but refuses to authorize it.
   *
   * @example
   * Insufficient permissions, etc.
   */
  FORBIDDEN = 403,

  /**
   * Not Found (404)
   * The server cannot find the requested resource.
   *
   * @example
   * Monitor not found, etc.
   */
  NOT_FOUND = 404,

  /**
   * Method Not Allowed (405)
   * The request method is known by the server but has been disabled and cannot be used.
   *
   * @example
   * Using a POST request instead of a GET request, etc.
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * Not Acceptable (406)
   * The server can only generate a response that is not accepted by the client.
   *
   * @example
   * Invalid Accept header, etc.
   */
  NOT_ACCEPTABLE = 406,

  /**
   * Proxy Authentication Required (407)
   * The client must first authenticate itself with the proxy.
   *
   * @example
   * Invalid Proxy credentials, etc.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,

  /**
   * Request Timeout (408)
   * The server timed out waiting for the request.
   *
   * @example
   * Slow network connection, etc.
   */
  REQUEST_TIMEOUT = 408,

  /**
   * Conflict (409)
   * The request could not be processed because of conflict in the request.
   *
   * @example
   * Trying to create a Monitor with the same name, etc.
   */
  CONFLICT = 409,

  /**
   * Gone (410)
   * The requested resource is no longer available and will not be available again.
   *
   * @example
   * Monitor has been deleted, etc.
   */
  GONE = 410,

  /**
   * Length Required (411)
   * The request did not specify the length of its content, which is required by the requested resource.
   *
   * @example
   * Missing Content-Length header, etc.
   */
  LENGTH_REQUIRED = 411,

  /**
   * Precondition Failed (412)
   * The server does not meet one of the preconditions that the requester put on the request.
   *
   * @example
   * If-Match header does not match, etc.
   */
  PRECONDITION_FAILED = 412,

  /**
   * Payload Too Large (413)
   * The request is larger than the server is willing or able to process.
   *
   * @example
   * Request body is too large, etc.
   */
  PAYLOAD_TOO_LARGE = 413,

  /**
   * URI Too Long (414)
   * The URI provided was too long for the server to process.
   *
   * @example
   * Request URL is too long, etc.
   */
  URI_TOO_LONG = 414,

  /**
   * Unsupported Media Type (415)
   * The request entity has a media type which the server or resource does not support.
   *
   * @example
   * Unsupported Content-Type header, etc.
   */
  UNSUPPORTED_MEDIA_TYPE = 415,

  /**
   * Range Not Satisfiable (416)
   * The client has asked for a portion of the file, but the server cannot supply that portion.
   *
   * @example
   * Invalid Range header, etc.
   */
  RANGE_NOT_SATISFIABLE = 416,

  /**
   * Expectation Failed (417)
   * The server cannot meet the requirements of the Expect request-header field.
   *
   * @example
   * Invalid Expect header, etc.
   */
  EXPECTATION_FAILED = 417,

  /**
   * I'm a teapot (418)
   * I'm a teapot (RFC 2324)
   *
   * @example
   * I'm a teapot, etc.
   */
  IM_A_TEAPOT = 418,

  /**
   * Misdirected Request (421)
   * The request was directed at a server that is not able to produce a response.
   *
   * @example
   * Invalid domain, etc.
   */
  MISDIRECTED_REQUEST = 421,

  /**
   * Unprocessable Entity (422)
   * The request was well-formed but was unable to be followed due to semantic errors.
   *
   * @example
   * Invalid JSON, etc.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * Locked (423)
   * The resource that is being accessed is locked.
   *
   * @example
   * Monitor is locked, etc.
   */
  LOCKED = 423,

  /**
   * Failed Dependency (424)
   * The request failed due to failure of a previous request.
   *
   * @example
   * Failed to create a Monitor, etc.
   */
  FAILED_DEPENDENCY = 424,

  /**
   * Too Early (425)
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   *
   * @example
   * Request is too early, etc.
   */
  TOO_EARLY = 425,

  /**
   * Upgrade Required (426)
   * The client should switch to a different protocol.
   *
   * @example
   * Upgrade to HTTPS, etc.
   */
  UPGRADE_REQUIRED = 426,

  /**
   * Precondition Required (428)
   * The origin server requires the request to be conditional.
   *
   * @example
   * Missing If-Match header, etc.
   */
  PRECONDITION_REQUIRED = 428,

  /**
   * Too Many Requests (429)
   * The user has sent too many requests in a given amount of time.
   *
   * @example
   * Rate limiting, etc.
   */
  TOO_MANY_REQUESTS = 429,

  /**
   * Request Header Fields Too Large (431)
   * The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.
   *
   * @example
   * Request headers are too large, etc.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

  /**
   * Unavailable For Legal Reasons (451)
   * A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.
   *
   * @example
   * Censorship, etc.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // 500er Codes
  /**
   * Internal Server Error (500)
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
   *
   * @example
   * Unexpected error, etc.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * Not Implemented (501)
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   *
   * @example
   * Not implemented, etc.
   */
  NOT_IMPLEMENTED = 501,

  /**
   * Bad Gateway (502)
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   *
   * @example
   * Invalid response from upstream server, etc.
   */
  BAD_GATEWAY = 502,

  /**
   * Service Unavailable (503)
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   *
   * @example
   * Server is overloaded, etc.
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * Gateway Timeout (504)
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   *
   * @example
   * Upstream server timed out, etc.
   */
  GATEWAY_TIMEOUT = 504,

  /**
   * HTTP Version Not Supported (505)
   * The server does not support the HTTP protocol version used in the request.
   *
   * @example
   * Unsupported HTTP version, etc.
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,

  /**
   * Variant Also Negotiates (506)
   * Transparent content negotiation for the request results in a circular reference.
   *
   * @example
   * Circular reference, etc.
   */
  VARIANT_ALSO_NEGOTIATES = 506,

  /**
   * Insufficient Storage (507)
   * The server is unable to store the representation needed to complete the request.
   *
   * @example
   * Out of storage, etc.
   */
  INSUFFICIENT_STORAGE = 507,

  /**
   * Loop Detected (508)
   * The server detected an infinite loop while processing the request.
   *
   * @example
   * Infinite loop, etc.
   */
  LOOP_DETECTED = 508,

  /**
   * Not Extended (510)
   * Further extensions to the request are required for the server to fulfill it.
   *
   * @example
   * Missing extension, etc.
   */
  NOT_EXTENDED = 510,

  /**
   * Network Authentication Required (511)
   * The client needs to authenticate to gain network access.
   *
   * @example
   * Invalid network credentials, etc.
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}
