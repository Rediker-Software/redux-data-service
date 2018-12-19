/** Used in an action's meta, such that an epic will call the given callbacks when an API request resolves */
export interface IPostActionHandlers {
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
}
