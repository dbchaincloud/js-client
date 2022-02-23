"use strict";
exports.__esModule = true;
exports.MsgFreezeRow = exports.MsgDeleteRow = exports.MsgUpdateRow = exports.MsgInsertRow = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "dbchain.msgs";
function createBaseMsgInsertRow() {
    return { owner: "", appCode: "", tableName: "", fields: new Uint8Array() };
}
exports.MsgInsertRow = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgInsertRow();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            fields: isSet(object.fields)
                ? bytesFromBase64(object.fields)
                : new Uint8Array()
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.fields !== undefined &&
            (obj.fields = base64FromBytes(message.fields !== undefined ? message.fields : new Uint8Array()));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseMsgInsertRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.fields = (_d = object.fields) !== null && _d !== void 0 ? _d : new Uint8Array();
        return message;
    }
};
function createBaseMsgUpdateRow() {
    return {
        owner: "",
        appCode: "",
        tableName: "",
        id: 0,
        fields: new Uint8Array()
    };
}
exports.MsgUpdateRow = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgUpdateRow();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            id: isSet(object.id) ? Number(object.id) : 0,
            fields: isSet(object.fields)
                ? bytesFromBase64(object.fields)
                : new Uint8Array()
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.fields !== undefined &&
            (obj.fields = base64FromBytes(message.fields !== undefined ? message.fields : new Uint8Array()));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e;
        var message = createBaseMsgUpdateRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        message.fields = (_e = object.fields) !== null && _e !== void 0 ? _e : new Uint8Array();
        return message;
    }
};
function createBaseMsgDeleteRow() {
    return { owner: "", appCode: "", tableName: "", id: 0 };
}
exports.MsgDeleteRow = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgDeleteRow();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            id: isSet(object.id) ? Number(object.id) : 0
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseMsgDeleteRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        return message;
    }
};
function createBaseMsgFreezeRow() {
    return { owner: "", appCode: "", tableName: "", id: 0 };
}
exports.MsgFreezeRow = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgFreezeRow();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            tableName: isSet(object.tableName) ? String(object.tableName) : "",
            id: isSet(object.id) ? Number(object.id) : 0
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.tableName !== undefined && (obj.tableName = message.tableName);
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseMsgFreezeRow();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.tableName = (_c = object.tableName) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : 0;
        return message;
    }
};
var globalThis = (function () {
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
var atob = globalThis.atob ||
    (function (b64) { return globalThis.Buffer.from(b64, "base64").toString("binary"); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
var btoa = globalThis.btoa ||
    (function (bin) { return globalThis.Buffer.from(bin, "binary").toString("base64"); });
function base64FromBytes(arr) {
    var bin = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var byte = arr_1[_i];
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (minimal_1["default"].util.Long !== long_1["default"]) {
    minimal_1["default"].util.Long = long_1["default"];
    minimal_1["default"].configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
