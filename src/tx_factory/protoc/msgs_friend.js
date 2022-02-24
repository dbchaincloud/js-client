/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "dbchain.msgs";
function createBaseMsgAddFriend() {
    return { owner: "", ownerName: "", friendAddr: "", friendName: "" };
}
export const MsgAddFriend = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            ownerName: isSet(object.ownerName) ? String(object.ownerName) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
            friendName: isSet(object.friendName) ? String(object.friendName) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.ownerName !== undefined && (obj.ownerName = message.ownerName);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        message.friendName !== undefined && (obj.friendName = message.friendName);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgAddFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.ownerName = (_b = object.ownerName) !== null && _b !== void 0 ? _b : "";
        message.friendAddr = (_c = object.friendAddr) !== null && _c !== void 0 ? _c : "";
        message.friendName = (_d = object.friendName) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseMsgDropFriend() {
    return { owner: "", friendAddr: "" };
}
export const MsgDropFriend = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.friendAddr !== "") {
            writer.uint32(18).string(message.friendAddr);
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgDropFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.friendAddr = (_b = object.friendAddr) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgRespondFriend() {
    return { owner: "", friendAddr: "", action: "" };
}
export const MsgRespondFriend = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
            action: isSet(object.action) ? String(object.action) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        message.action !== undefined && (obj.action = message.action);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgRespondFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.friendAddr = (_b = object.friendAddr) !== null && _b !== void 0 ? _b : "";
        message.action = (_c = object.action) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
