/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dbchain.msgs";

/**
 * type MsgAddFunction struct {
 * 	Owner        sdk.AccAddress `json:"owner"`
 * 	AppCode      string         `json:"app_code"`
 * 	FunctionName string         `json:"function_name"`
 * 	Description  string         `json:"description"`
 * 	Body         string         `json:"body"`
 * }
 */
export interface MsgAddFunction {
  owner: string;
  appCode: string;
  functionName: string;
  description: string;
  body: string;
}

/**
 * type MsgCallFunction struct {
 * 	Owner        sdk.AccAddress `json:"owner"`
 * 	AppCode      string         `json:"app_code"`
 * 	FunctionName string         `json:"function_name"`
 * 	Argument     string         `json:"argument"`
 * }
 */
export interface MsgCallFunction {
  owner: string;
  appCode: string;
  functionName: string;
  argument: string;
}

export interface MsgDropFunction {
  owner: string;
  appCode: string;
  functionName: string;
}

function createBaseMsgAddFunction(): MsgAddFunction {
  return {
    owner: "",
    appCode: "",
    functionName: "",
    description: "",
    body: "",
  };
}

export const MsgAddFunction = {
  encode(
    message: MsgAddFunction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.functionName !== "") {
      writer.uint32(26).string(message.functionName);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.body !== "") {
      writer.uint32(42).string(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddFunction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddFunction();
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
          message.functionName = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.body = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddFunction {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      functionName: isSet(object.functionName)
        ? String(object.functionName)
        : "",
      description: isSet(object.description) ? String(object.description) : "",
      body: isSet(object.body) ? String(object.body) : "",
    };
  },

  toJSON(message: MsgAddFunction): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.functionName !== undefined &&
      (obj.functionName = message.functionName);
    message.description !== undefined &&
      (obj.description = message.description);
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddFunction>, I>>(
    object: I
  ): MsgAddFunction {
    const message = createBaseMsgAddFunction();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.functionName = object.functionName ?? "";
    message.description = object.description ?? "";
    message.body = object.body ?? "";
    return message;
  },
};

function createBaseMsgCallFunction(): MsgCallFunction {
  return { owner: "", appCode: "", functionName: "", argument: "" };
}

export const MsgCallFunction = {
  encode(
    message: MsgCallFunction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.functionName !== "") {
      writer.uint32(26).string(message.functionName);
    }
    if (message.argument !== "") {
      writer.uint32(34).string(message.argument);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCallFunction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCallFunction();
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
          message.functionName = reader.string();
          break;
        case 4:
          message.argument = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCallFunction {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      functionName: isSet(object.functionName)
        ? String(object.functionName)
        : "",
      argument: isSet(object.argument) ? String(object.argument) : "",
    };
  },

  toJSON(message: MsgCallFunction): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.functionName !== undefined &&
      (obj.functionName = message.functionName);
    message.argument !== undefined && (obj.argument = message.argument);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCallFunction>, I>>(
    object: I
  ): MsgCallFunction {
    const message = createBaseMsgCallFunction();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.functionName = object.functionName ?? "";
    message.argument = object.argument ?? "";
    return message;
  },
};

function createBaseMsgDropFunction(): MsgDropFunction {
  return { owner: "", appCode: "", functionName: "" };
}

export const MsgDropFunction = {
  encode(
    message: MsgDropFunction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.appCode !== "") {
      writer.uint32(18).string(message.appCode);
    }
    if (message.functionName !== "") {
      writer.uint32(26).string(message.functionName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDropFunction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDropFunction();
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
          message.functionName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDropFunction {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      appCode: isSet(object.appCode) ? String(object.appCode) : "",
      functionName: isSet(object.functionName)
        ? String(object.functionName)
        : "",
    };
  },

  toJSON(message: MsgDropFunction): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.appCode !== undefined && (obj.appCode = message.appCode);
    message.functionName !== undefined &&
      (obj.functionName = message.functionName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDropFunction>, I>>(
    object: I
  ): MsgDropFunction {
    const message = createBaseMsgDropFunction();
    message.owner = object.owner ?? "";
    message.appCode = object.appCode ?? "";
    message.functionName = object.functionName ?? "";
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
