import * as types from '../store/mutation-types.js'

export default function handleError (err, commit) {
  if (commit) {
    commit(types.ERROR_MSG, err.message)
  }
}
