import store from '@/store'

/**
 * 缓存中的已选中应用
 *
 * @author Young-Pastor
 */
export function sysApplication () {
  return store.getters.applocation
}
