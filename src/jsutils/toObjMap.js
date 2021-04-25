import type {
  ObjMap,
  ObjMapLike,
  ReadOnlyObjMap,
  ReadOnlyObjMapLike,
} from './ObjMap';

/* eslint-disable no-redeclare */
declare function toObjMap<T>(obj: ObjMapLike<T>): ObjMap<T>;
declare function toObjMap<T>(obj: ReadOnlyObjMapLike<T>): ReadOnlyObjMap<T>;

export function toObjMap(obj) {
  /* eslint-enable no-redeclare */
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }

  const map = Object.create(null);
  for (const [key, value] of Object.entries(obj)) {
    map[key] = value;
  }
  return map;
}
