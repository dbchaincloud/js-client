/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dbchain.msgs";

/**
 * MsgCreateApplication defines a CreateApplication message
 * type MsgCreateApplication struct {
 * 	Owner              sdk.AccAddress `json:"owner"`
 * 	Name               string         `json:"name"`
 * 	Description        string         `json:"description"`
 * 	PermissionRequired bool           `json:"permission_required"`
 * }
 */
export interface MsgCreateApplication {
  owner: string;
  name: string;
  description: string;
  permissionRequired: boolean;
}

export interface MsgDropApplication {
  owner: string;
  appCode: string;
}

export interface MsgRecoverApplication {
  owner: string;
  appCode: string;
}

export interface MsgModifyDatabaseUser {
  owner: string;
  appCode: string;
  action: string;
  user: string;
}

/**
 * type MsgCreateSysDatabase struct {
 * 	Owner sdk.AccAddress `json:"owner"`
 * }
 */
export interface MsgCreateSysDatabase {
  owner: string;
}

export interface MsgSetSchemaStatus {
  owner: string;
  appCode: string;
  status: string;
}

export interface MsgSetDatabasePermission {
  owner: string;
  appCode: string;
  permissionRequired: string;
}

/**
 * type MsgSetAppUserFileVolumeLimit struct {
 * 	Owner   sdk.AccAddress `json:"owner"`
 * 	AppCode string         `json:"app_code"`
 * 	Size  string         `json:"size"` //uint of size is byte. when size was set 0 or negative, it means no limit
 * }
 */
export interface MsgSetAppUserFileVolumeLimit {
  owner: string;
  appCode: string;
  size: string;
}

export interface MsgSetDatabaseDataStatus {
  owner: string;
  appCode: string;
  status: string;
}

function createBaseMsgCreateApplication(): MsgCreateApplication {
  return { owner: "", name: "", description: "", permissionRequired: false };
}

export const MsgCreateApplication = {    
  encode(
    message: MsgCreateApplication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.permissionRequired === true) {
      writer.uint32(32).bool(message.permissionRequired);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateApplication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateApplication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.permissionRequired = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateApplication {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      permissionRequired: isSet(object.permissionRequired)
        ? Boolean(object.permissionRequired)
        : false,
    };
  },

  toJSON(message: MsgCreateApplication): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.permissionRequired !== undefined &&
      (obj.permissionRequired = message.permissionRequired);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateApplication>, I>>(
    object: I
  ): MsgCreateApplication {
    const message = createBaseMsgCreateApplication();
    message.owner = object.owner ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.permissionRequired = object.permissionRequired ?? false;
    return message;
  },
};

function createBaseMsgDropApplication(): MsgDropApplication {
  return { owner: "", appCode: "" };
}

export const MsgDropApplication = {
  encode(
    message: MsgDropApplication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDropApplication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDropApplication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDropApplication {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
    };
  },

  toJSON(message: MsgDropApplication): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDropApplication>, I>>(
    object: I
  ): MsgDropApplication {
    const message = createBaseMsgDropApplication();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    return message;
  },
};

function createBaseMsgRecoverApplication(): MsgRecoverApplication {
  return { owner: "", appCode: "" };
}

export const MsgRecoverApplication = {
  encode(
    message: MsgRecoverApplication,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRecoverApplication {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecoverApplication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.appCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecoverApplication {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
    };
  },

  toJSON(message: MsgRecoverApplication): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRecoverApplication>, I>>(
    object: I
  ): MsgRecoverApplication {
    const message = createBaseMsgRecoverApplication();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    return message;
  },
};

function createBaseMsgModifyDatabaseUser(): MsgModifyDatabaseUser {
  return { owner: "", appCode: "", action: "", user: "" };
}

export const MsgModifyDatabaseUser = {
  encode(
    message: MsgModifyDatabaseUser,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.action !== "") {
      writer.uint32(26).string(message.action);
    }
    if (message.user !== "") {
      writer.uint32(34).string(message.user);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgModifyDatabaseUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgModifyDatabaseUser();
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
          message.action = reader.string();
          break;
        case 4:
          message.user = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgModifyDatabaseUser {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      action: isSet(object.action) ? String(object.action) : "",
      user: isSet(object.user) ? String(object.user) : "",
    };
  },

  toJSON(message: MsgModifyDatabaseUser): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.action !== undefined && (obj.action = message.action);
    message.user !== undefined && (obj.user = message.user);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgModifyDatabaseUser>, I>>(
    object: I
  ): MsgModifyDatabaseUser {
    const message = createBaseMsgModifyDatabaseUser();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.action = object.action ?? "";
    message.user = object.user ?? "";
    return message;
  },
};

function createBaseMsgCreateSysDatabase(): MsgCreateSysDatabase {
  return { owner: "" };
}

export const MsgCreateSysDatabase = {
  encode(
    message: MsgCreateSysDatabase,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateSysDatabase {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSysDatabase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSysDatabase {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: MsgCreateSysDatabase): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSysDatabase>, I>>(
    object: I
  ): MsgCreateSysDatabase {
    const message = createBaseMsgCreateSysDatabase();
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseMsgSetSchemaStatus(): MsgSetSchemaStatus {
  return { owner: "", appCode: "", status: "" };
}

export const MsgSetSchemaStatus = {
  encode(
    message: MsgSetSchemaStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.status !== "") {
      writer.uint32(26).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSchemaStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSchemaStatus();
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
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetSchemaStatus {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: MsgSetSchemaStatus): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetSchemaStatus>, I>>(
    object: I
  ): MsgSetSchemaStatus {
    const message = createBaseMsgSetSchemaStatus();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseMsgSetDatabasePermission(): MsgSetDatabasePermission {
  return { owner: "", appCode: "", permissionRequired: "" };
}

export const MsgSetDatabasePermission = {
  encode(
    message: MsgSetDatabasePermission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.permissionRequired !== "") {
      writer.uint32(26).string(message.permissionRequired);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetDatabasePermission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDatabasePermission();
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
          message.permissionRequired = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetDatabasePermission {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      permissionRequired: isSet(object.permissionRequired)
        ? String(object.permissionRequired)
        : "",
    };
  },

  toJSON(message: MsgSetDatabasePermission): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.permissionRequired !== undefined &&
      (obj.permissionRequired = message.permissionRequired);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetDatabasePermission>, I>>(
    object: I
  ): MsgSetDatabasePermission {
    const message = createBaseMsgSetDatabasePermission();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.permissionRequired = object.permissionRequired ?? "";
    return message;
  },
};

function createBaseMsgSetAppUserFileVolumeLimit(): MsgSetAppUserFileVolumeLimit {
  return { owner: "", appCode: "", size: "" };
}

export const MsgSetAppUserFileVolumeLimit = {
  encode(
    message: MsgSetAppUserFileVolumeLimit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.size !== "") {
      writer.uint32(26).string(message.size);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetAppUserFileVolumeLimit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAppUserFileVolumeLimit();
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
          message.size = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetAppUserFileVolumeLimit {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      size: isSet(object.size) ? String(object.size) : "",
    };
  },

  toJSON(message: MsgSetAppUserFileVolumeLimit): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.size !== undefined && (obj.size = message.size);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetAppUserFileVolumeLimit>, I>>(
    object: I
  ): MsgSetAppUserFileVolumeLimit {
    const message = createBaseMsgSetAppUserFileVolumeLimit();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.size = object.size ?? "";
    return message;
  },
};

function createBaseMsgSetDatabaseDataStatus(): MsgSetDatabaseDataStatus {
  return { owner: "", appCode: "", status: "" };
}

export const MsgSetDatabaseDataStatus = {
  encode(
    message: MsgSetDatabaseDataStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.status !== "") {
      writer.uint32(26).string(message.status);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetDatabaseDataStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDatabaseDataStatus();
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
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetDatabaseDataStatus {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: MsgSetDatabaseDataStatus): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetDatabaseDataStatus>, I>>(
    object: I
  ): MsgSetDatabaseDataStatus {
    const message = createBaseMsgSetDatabaseDataStatus();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

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
