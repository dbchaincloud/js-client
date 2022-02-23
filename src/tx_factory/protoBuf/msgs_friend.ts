/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dbchain.msgs";

/**
 * // MsgAddFriend defines a CreateTable message
 * type MsgAddFriend struct {
 * 	Owner      sdk.AccAddress `json:"owner"`
 * 	OwnerName  string         `json:"owner_name"`
 * 	FriendAddr string         `json:"friend_addr"`
 * 	FriendName string         `json:"friend_name"`
 * }
 */
export interface MsgAddFriend {
  owner: string;
  ownerName: string;
  friendAddr: string;
  friendName: string;
}

/**
 * type MsgDropFriend struct {
 * 	Owner      sdk.AccAddress `json:"owner"`
 * 	FriendAddr string         `json:"friend_addr"`
 * }
 */
export interface MsgDropFriend {
  owner: string;
  friendAddr: string;
}

/**
 * // MsgRespondFriend defines a CreateTable message
 * type MsgRespondFriend struct {
 * 	Owner      sdk.AccAddress `json:"owner"`
 * 	FriendAddr string         `json:"friend_addr"`
 * 	Action     string         `json:"action"`
 * }
 */
export interface MsgRespondFriend {
  owner: string;
  friendAddr: string;
  action: string;
}

function createBaseMsgAddFriend(): MsgAddFriend {
  return { owner: "", ownerName: "", friendAddr: "", friendName: "" };
}

export const MsgAddFriend = {
  encode(
    message: MsgAddFriend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.ownerName !== "") {
      writer.uint32(18).string(message.ownerName);
    }
    if (message.friendAddr !== "") {
      writer.uint32(26).string(message.friendAddr);
    }
    if (message.friendName !== "") {
      writer.uint32(34).string(message.friendName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddFriend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddFriend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.ownerName = reader.string();
          break;
        case 3:
          message.friendAddr = reader.string();
          break;
        case 4:
          message.friendName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddFriend {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      ownerName: isSet(object.ownerName) ? String(object.ownerName) : "",
      friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
      friendName: isSet(object.friendName) ? String(object.friendName) : "",
    };
  },

  toJSON(message: MsgAddFriend): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.ownerName !== undefined && (obj.ownerName = message.ownerName);
    message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
    message.friendName !== undefined && (obj.friendName = message.friendName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddFriend>, I>>(
    object: I
  ): MsgAddFriend {
    const message = createBaseMsgAddFriend();
    message.owner = object.owner ?? "";
    message.ownerName = object.ownerName ?? "";
    message.friendAddr = object.friendAddr ?? "";
    message.friendName = object.friendName ?? "";
    return message;
  },
};

function createBaseMsgDropFriend(): MsgDropFriend {
  return { owner: "", friendAddr: "" };
}

export const MsgDropFriend = {
  encode(
    message: MsgDropFriend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.friendAddr !== "") {
      writer.uint32(18).string(message.friendAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDropFriend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDropFriend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.friendAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDropFriend {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
    };
  },

  toJSON(message: MsgDropFriend): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDropFriend>, I>>(
    object: I
  ): MsgDropFriend {
    const message = createBaseMsgDropFriend();
    message.owner = object.owner ?? "";
    message.friendAddr = object.friendAddr ?? "";
    return message;
  },
};

function createBaseMsgRespondFriend(): MsgRespondFriend {
  return { owner: "", friendAddr: "", action: "" };
}

export const MsgRespondFriend = {
  encode(
    message: MsgRespondFriend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.friendAddr !== "") {
      writer.uint32(18).string(message.friendAddr);
    }
    if (message.action !== "") {
      writer.uint32(26).string(message.action);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRespondFriend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRespondFriend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.friendAddr = reader.string();
          break;
        case 3:
          message.action = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRespondFriend {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
      action: isSet(object.action) ? String(object.action) : "",
    };
  },

  toJSON(message: MsgRespondFriend): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
    message.action !== undefined && (obj.action = message.action);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRespondFriend>, I>>(
    object: I
  ): MsgRespondFriend {
    const message = createBaseMsgRespondFriend();
    message.owner = object.owner ?? "";
    message.friendAddr = object.friendAddr ?? "";
    message.action = object.action ?? "";
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
