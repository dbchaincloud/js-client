/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "dbchain.msgs";
function createBaseMsgInsertRow() {
    return { owner: "", appCode: "", tableName: "", fields: new Uint8Array() };
}
export const MsgInsertRow = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            fields: isSet(object.fields)
                ? bytesFromBase64(object.fields)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.fields !== undefined &&
            (obj.fields = base64FromBytes(message.fields !== undefined ? message.fields : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgInsertRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.fields = (_d = object.fields) !== null && _d !== void 0 ? _d : new Uint8Array();
        return message;
    },
};
function createBaseMsgUpdateRow() {
    return {
        owner: "",
        appCode: "",
        tableName: "",
        id: 0,
        fields: new Uint8Array(),
    };
}
export const MsgUpdateRow = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
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
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.fields !== undefined &&
            (obj.fields = base64FromBytes(message.fields !== undefined ? message.fields : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseMsgUpdateRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        message.fields = (_e = object.fields) !== null && _e !== void 0 ? _e : new Uint8Array();
        return message;
    },
};
function createBaseMsgDeleteRow() {
    return { owner: "", appCode: "", tableName: "", id: 0 };
}
export const MsgDeleteRow = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            id: isSet(object.id) ? Number(object.id) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgDeleteRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
function createBaseMsgFreezeRow() {
    return { owner: "", appCode: "", tableName: "", id: 0 };
}
export const MsgFreezeRow = {
    encode(message, writer = _m0.Writer.create()) {
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
    decode(input, length) {
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
    fromJSON(object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            id: isSet(object.id) ? Number(object.id) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgFreezeRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
