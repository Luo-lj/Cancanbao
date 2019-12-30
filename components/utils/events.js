/* eslint-disable */
(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define('EventBus', [], factory)
  } else if (typeof exports === 'object') {
    exports['EventBus'] = factory()
  } else {
    root['EventBus'] = factory()
  }
})(this, function () {

  // 统计所有 event 数量，方便添加 id
  let count = 0

  function getGuid(type) {
    const _guid = `${type}${count}`
    count++
    return _guid
  }

  function getRouteId() {
    const routes = getCurrentPages();
    let id = '';
    if (routes && routes.length > 0 && routes[routes.length - 1] && routes[routes.length - 1]['__wxWebviewId__']) {
      id = routes[routes.length - 1]['__wxWebviewId__'];
    }
    return id
  }

  let EventBusClass = {}
  EventBusClass = function () {
    this.listeners = {}
  }
  EventBusClass.prototype = {
    addEventListener(type, callback, scope, isPage) {
      // 给对应事件分配一个 id
      callback._guid = getGuid(type)
      let args = []
      const numOfArgs = arguments.length
      for (let i = 0; i < numOfArgs; i++) {
        args.push(arguments[i])
      }
      args = args.length > 3 ? args.splice(3, args.length - 1) : []
      let routeId = '';
      if (isPage) {
        routeId = getRouteId();
      }
      if (typeof this.listeners[type] !== 'undefined') {
        this.listeners[type].push({
          scope,
          callback,
          args,
          routeId
        })
      } else {
        this.listeners[type] = [{
          scope,
          callback,
          args,
          routeId
        }]
      }
    },
    removeEventListener(type, callback, scope) {
      if (typeof this.listeners[type] !== 'undefined') {
        const numOfCallbacks = this.listeners[type].length
        const newArray = []
        this.listeners[type] = newArray
      }
    },

    // 移除单个事件
    removeSingleEventListener(type, callback, scope) {
      const currentType = this.listeners[type]
      if (currentType && scope) {
        const findIndex = currentType.findIndex(item => {
          return item.scope === scope
        })
        findIndex !== -1 && this.listeners[type].splice(findIndex, 1);
        return;
      }
      if (currentType) {
        const findIndex = currentType.findIndex(item => {
          return item.callback._guid === callback._guid
        })
        findIndex !== -1 && this.listeners[type].splice(findIndex, 1)
      }
    },

    hasEventListener(type, callback, scope) {
      if (typeof this.listeners[type] !== 'undefined') {
        const numOfCallbacks = this.listeners[type].length
        if (callback === undefined && scope === undefined) {
          return numOfCallbacks > 0
        }
        for (let i = 0; i < numOfCallbacks; i++) {
          const listener = this.listeners[type][i]
          if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
            return true
          }
        }
      }
      return false
    },
    dispatch(type, target, isPage) {
      const event = {
        type,
        target
      }
      let args = []
      const numOfArgs = arguments.length
      for (var i = 0; i < numOfArgs; i++) {
        args.push(arguments[i])
      }
      args = args.length > 2 ? args.splice(2, args.length - 1) : []
      args = [event].concat(args)


      if (typeof this.listeners[type] !== 'undefined') {
        const listeners = this.listeners[type].slice()
        const numOfCallbacks = listeners.length
        for (var i = 0; i < numOfCallbacks; i++) {
          const listener = listeners[i]
          if (listener && listener.callback) {
            const concatArgs = args.concat(listener.args);
            if (isPage) {
              if (listener.routeId === getRouteId()) {
                listener.callback.apply(listener.scope, concatArgs)
              }
            } else {
              listener.callback.apply(listener.scope, concatArgs)
            }
          }
        }
      }
    },
    getEvents() {
      let str = ''
      for (const type in this.listeners) {
        const numOfCallbacks = this.listeners[type].length
        for (let i = 0; i < numOfCallbacks; i++) {
          const listener = this.listeners[type][i]
          str += listener.scope && listener.scope.className ? listener.scope.className : 'anonymous'
          str += ' listen for \'' + type + '\'\n'
        }
      }
      return str
    }
  }
  const EventBus = new EventBusClass()
  return EventBus
})