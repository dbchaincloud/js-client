"use strict";
exports.__esModule = true;
exports.MsgRespondFriend = exports.MsgDropFriend = exports.MsgAddFriend = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "dbchain.msgs";
function createBaseMsgAddFriend() {
    return { owner: "", ownerName: "", friendAddr: "", friendName: "" };
}
exports.MsgAddFriend = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgAddFriend();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            ownerName: isSet(object.ownerName) ? String(object.ownerName) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
            friendName: isSet(object.friendName) ? String(object.friendName) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.ownerName !== undefined && (obj.ownerName = message.ownerName);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        message.friendName !== undefined && (obj.friendName = message.friendName);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d;
        var message = createBaseMsgAddFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.ownerName = (_b = object.ownerName) !== null && _b !== void 0 ? _b : "";
        message.friendAddr = (_c = object.friendAddr) !== null && _c !== void 0 ? _c : "";
        message.friendName = (_d = object.friendName) !== null && _d !== void 0 ? _d : "";
        return message;
    }
};
function createBaseMsgDropFriend() {
    return { owner: "", friendAddr: "" };
}
exports.MsgDropFriend = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.friendAddr !== "") {
            writer.uint32(18).string(message.friendAddr);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgDropFriend();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseMsgDropFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.friendAddr = (_b = object.friendAddr) !== null && _b !== void 0 ? _b : "";
        return message;
    }
};
function createBaseMsgRespondFriend() {
    return { owner: "", friendAddr: "", action: "" };
}
exports.MsgRespondFriend = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1["default"].Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1["default"].Reader ? input : new minimal_1["default"].Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgRespondFriend();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        return {
            owner: isSet(object.owner) ? String(object.owner) : "",
            friendAddr: isSet(object.friendAddr) ? String(object.friendAddr) : "",
            action: isSet(object.action) ? String(object.action) : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.friendAddr !== undefined && (obj.friendAddr = message.friendAddr);
        message.action !== undefined && (obj.action = message.action);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseMsgRespondFriend();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.friendAddr = (_b = object.friendAddr) !== null && _b !== void 0 ? _b : "";
        message.action = (_c = object.action) !== null && _c !== void 0 ? _c : "";
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
