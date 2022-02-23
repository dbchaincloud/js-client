/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dbchain.msgs";

/**
 * // MsgCreatePoll defines a CreatePoll message
 * type MsgInsertRow struct {
 * 	Owner     sdk.AccAddress `json:"owner"`
 * 	AppCode   string         `json:"app_code"`
 * 	TableName string         `json:"table_name"`
 * 	Fields    RowFieldsJson  `json:"fields"`
 * }
 */
export interface MsgInsertRow {
  owner: string;
  appCode: string;
  tableName: string;
  fields: Uint8Array;
}

/**
 * type MsgUpdateRow struct {
 * 	Owner     sdk.AccAddress `json:"owner"`
 * 	AppCode   string         `json:"app_code"`
 * 	TableName string         `json:"table_name"`
 * 	Id        uint           `json:"id"`
 * 	Fields    RowFieldsJson  `json:"fields"`
 * }
 */
export interface MsgUpdateRow {
  owner: string;
  appCode: string;
  tableName: string;
  id: number;
  fields: Uint8Array;
}

/**
 * type MsgDeleteRow struct {
 * 	Owner     sdk.AccAddress `json:"owner"`
 * 	AppCode   string         `json:"app_code"`
 * 	TableName string         `json:"table_name"`
 * 	Id        uint           `json:"id"`
 * }
 */
export interface MsgDeleteRow {
  owner: string;
  appCode: string;
  tableName: string;
  id: number;
}

/**
 * type MsgFreezeRow struct {
 * 	Owner     sdk.AccAddress `json:"owner"`
 * 	AppCode   string         `json:"app_code"`
 * 	TableName string         `json:"table_name"`
 * 	Id        uint           `json:"id"`
 * }
 */
export interface MsgFreezeRow {
  owner: string;
  appCode: string;
  tableName: string;
  id: number;
}

function createBaseMsgInsertRow(): MsgInsertRow {
  return { owner: "", appCode: "", tableName: "", fields: new Uint8Array() };
}

export const MsgInsertRow = {
  encode(
    message: MsgInsertRow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.tableName !== "") {
      writer.uint32(26).string(message.tableName);
    }
    if (message.fields.length !== 0) {
      writer.uint32(34).bytes(message.fields);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInsertRow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInsertRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        case 3:
          message.tableName = reader.string();
          break;
        case 4:
          message.fields = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInsertRow {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      tableName: isSet(object.tableName) ? String(object.tableName) : "",
      fields: isSet(object.fields)
        ? bytesFromBase64(object.fields)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgInsertRow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.tableName !== undefined && (obj.tableName = message.tableName);
    message.fields !== undefined &&
      (obj.fields = base64FromBytes(
        message.fields !== undefined ? message.fields : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInsertRow>, I>>(
    object: I
  ): MsgInsertRow {
    const message = createBaseMsgInsertRow();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.tableName = object.tableName ?? "";
    message.fields = object.fields ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgUpdateRow(): MsgUpdateRow {
  return {
    owner: "",
    appCode: "",
    tableName: "",
    id: 0,
    fields: new Uint8Array(),
  };
}

export const MsgUpdateRow = {
  encode(
    message: MsgUpdateRow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.tableName !== "") {
      writer.uint32(26).string(message.tableName);
    }
    if (message.id !== 0) {
      writer.uint32(32).uint32(message.id);
    }
    if (message.fields.length !== 0) {
      writer.uint32(42).bytes(message.fields);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        case 3:
          message.tableName = reader.string();
          break;
        case 4:
          message.id = reader.uint32();
          break;
        case 5:
          message.fields = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRow {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      tableName: isSet(object.tableName) ? String(object.tableName) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      fields: isSet(object.fields)
        ? bytesFromBase64(object.fields)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgUpdateRow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.tableName !== undefined && (obj.tableName = message.tableName);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.fields !== undefined &&
      (obj.fields = base64FromBytes(
        message.fields !== undefined ? message.fields : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRow>, I>>(
    object: I
  ): MsgUpdateRow {
    const message = createBaseMsgUpdateRow();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.tableName = object.tableName ?? "";
    message.id = object.id ?? 0;
    message.fields = object.fields ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgDeleteRow(): MsgDeleteRow {
  return { owner: "", appCode: "", tableName: "", id: 0 };
}

export const MsgDeleteRow = {
  encode(
    message: MsgDeleteRow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.tableName !== "") {
      writer.uint32(26).string(message.tableName);
    }
    if (message.id !== 0) {
      writer.uint32(32).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteRow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        case 3:
          message.tableName = reader.string();
          break;
        case 4:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteRow {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      tableName: isSet(object.tableName) ? String(object.tableName) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeleteRow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.tableName !== undefined && (obj.tableName = message.tableName);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteRow>, I>>(
    object: I
  ): MsgDeleteRow {
    const message = createBaseMsgDeleteRow();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.tableName = object.tableName ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgFreezeRow(): MsgFreezeRow {
  return { owner: "", appCode: "", tableName: "", id: 0 };
}

export const MsgFreezeRow = {
  encode(
    message: MsgFreezeRow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.tableName !== "") {
      writer.uint32(26).string(message.tableName);
    }
    if (message.id !== 0) {
      writer.uint32(32).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFreezeRow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFreezeRow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        case 3:
          message.tableName = reader.string();
          break;
        case 4:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFreezeRow {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      tableName: isSet(object.tableName) ? String(object.tableName) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgFreezeRow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.tableName !== undefined && (obj.tableName = message.tableName);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFreezeRow>, I>>(
    object: I
  ): MsgFreezeRow {
    const message = createBaseMsgFreezeRow();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.tableName = object.tableName ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
