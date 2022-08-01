/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal.js";
export const protobufPackage = "dbchain.msgs";
function createBaseMsgAddFunction() {
    return {
        owner: "",
        appCode: "",
        functionName: "",
        description: "",
        body: "",
    };
}
export const MsgAddFunction = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
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
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        message.description !== undefined &&
            (obj.description = message.description);
        message.body !== undefined && (obj.body = message.body);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseMsgAddFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
        message.description = (_d = object.description) !== null && _d !== void 0 ? _d : "";
        message.body = (_e = object.body) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
function createBaseMsgCallFunction() {
    return { owner: "", appCode: "", functionName: "", argument: "" };
}
export const MsgCallFunction = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            functionName: isSet(object.functionName)
                ? String(object.functionName)
                : "",
            argument: isSet(object.argument) ? String(object.argument) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        message.argument !== undefined && (obj.argument = message.argument);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgCallFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
        message.argument = (_d = object.argument) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseMsgDropFunction() {
    return { owner: "", appCode: "", functionName: "" };
}
export const MsgDropFunction = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            functionName: isSet(object.functionName)
                ? String(object.functionName)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgDropFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
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
