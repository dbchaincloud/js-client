"use strict";
exports.__esModule = true;
exports.MsgDropFunction = exports.MsgCallFunction = exports.MsgAddFunction = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "dbchain.msgs";
function createBaseMsgAddFunction() {
    return {
        owner: "",
        appCode: "",
        functionName: "",
        description: "",
        body: ""
    };
}
exports.MsgAddFunction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddFunction();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            functionName: isSet(object.functionName)
                ? String(object.functionName)
                : "",
            description: isSet(object.description) ? String(object.description) : "",
            body: isSet(object.body) ? String(object.body) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        message.description !== undefined &&
            (obj.description = message.description);
        message.body !== undefined && (obj.body = message.body);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e;
        var message = createBaseMsgAddFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
        message.description = (_d = object.description) !== null && _d !== void 0 ? _d : "";
        message.body = (_e = object.body) !== null && _e !== void 0 ? _e : "";
        return message;
    }
};
function createBaseMsgCallFunction() {
    return { owner: "", appCode: "", functionName: "", argument: "" };
}
exports.MsgCallFunction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCallFunction();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            appCode: isSet(object.appCode) ? String(object.appCode) : "",
            functionName: isSet(object.functionName)
                ? String(object.functionName)
                : "",
            argument: isSet(object.argument) ? String(object.argument) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        message.argument !== undefined && (obj.argument = message.argument);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseMsgCallFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
        message.argument = (_d = object.argument) !== null && _d !== void 0 ? _d : "";
        return message;
    }
};
function createBaseMsgDropFunction() {
    return { owner: "", appCode: "", functionName: "" };
}
exports.MsgDropFunction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgDropFunction();
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
                    message.functionName = reader.string();
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
            functionName: isSet(object.functionName)
                ? String(object.functionName)
                : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.appCode !== undefined && (obj.appCode = message.appCode);
        message.functionName !== undefined &&
            (obj.functionName = message.functionName);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseMsgDropFunction();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.appCode = (_b = object.appCode) !== null && _b !== void 0 ? _b : "";
        message.functionName = (_c = object.functionName) !== null && _c !== void 0 ? _c : "";
        return message;
    }
};
if (minimal_1["default"].util.Long !== long_1["default"]) {
    minimal_1["default"].util.Long = long_1["default"];
    minimal_1["default"].configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
