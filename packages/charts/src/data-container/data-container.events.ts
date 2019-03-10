import { ScaleFunctions } from '../utils';

export enum DataContainerEventType {
  DATA_CHANGE,
  GET_SCALES,
}

export interface DataContainerEvent<T extends DataContainerEventType, P = void> {
  type: T;
  payload: P;
}

export type DataContainerEventListener<T extends DataContainerEventType, P = any> =
  (action: DataContainerEvent<T, P>) => P;

export type DataChangeEvent = DataContainerEvent<DataContainerEventType.DATA_CHANGE>;
export type GetScalesEvent = DataContainerEvent<DataContainerEventType.GET_SCALES, ScaleFunctions>;

export type DataContainerEvents =
  | DataChangeEvent
  | GetScalesEvent
  ;
