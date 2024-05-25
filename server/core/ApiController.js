import {RestController} from '#guoba.framework'

export default class ApiController extends RestController {
  constructor(prefix, ...args) {
    prefix = prefix ? prefix : ''
    // noinspection JSCheckFunctionSignatures
    super(`/api${prefix}`, ...args)
  }
}
