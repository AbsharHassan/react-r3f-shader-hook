export {}

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

// Let React know that we'll be testing effectful components
global.IS_REACT_ACT_ENVIRONMENT = true
