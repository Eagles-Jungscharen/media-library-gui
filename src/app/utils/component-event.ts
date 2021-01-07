export enum ComponentEventType {
  DELETED,
  CANCELD,
  CONFIRMED,
}
export interface ComponentEvent<T> {
  element: T;
  eventType: ComponentEventType;
}
