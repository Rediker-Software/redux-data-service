export function loggerMiddleware() {
  return (next) => (action) => {
    console.log(action); // tslint:disable-line
    return next(action);
  };
}
