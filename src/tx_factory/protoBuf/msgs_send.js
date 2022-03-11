/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "./coin";
export const protobufPackage = "bank.v1beta1";
function createBaseMsgSend() {
    return { fromAddress: "", toAddress: "", amount: [] };
}
export const MsgSend = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fromAddress !== "") {
            writer.uint32(10).string(message.fromAddress);
        }
        if (message.toAddress !== "") {
            writer.uint32(18).string(message.toAddress);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fromAddress = reader.string();
                    break;
                case 2:
                    message.toAddress = reader.string();
                    break;
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
            fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
            toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
            amount: Array.isArray(object === null || object === void 0 ? void 0 : object.amount)
                ? object.amount.map((e) => Coin.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.fromAddress !== undefined &&
            (obj.fromAddress = message.fromAddress);
        message.toAddress !== undefined && (obj.toAddress = message.toAddress);
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgSend();
        message.fromAddress = (_a = object.fromAddress) !== null && _a !== void 0 ? _a : "";
        message.toAddress = (_b = object.toAddress) !== null && _b !== void 0 ? _b : "";
        message.amount = ((_c = object.amount) === null || _c === void 0 ? void 0 : _c.map((e) => Coin.fromPartial(e))) || [];
        return message;
    },
};
function createBaseMsgSendResponse() {
    return {};
}
export const MsgSendResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSendResponse();
        return message;
    },
};
function createBaseMsgMultiSend() {
    return {};
}
export const MsgMultiSend = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgMultiSend();
        return message;
    },
};
function createBaseMsgMultiSendResponse() {
    return {};
}
export const MsgMultiSendResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSendResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgMultiSendResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Send = this.Send.bind(this);
        this.MultiSend = this.MultiSend.bind(this);
    }
    Send(request) {
        const data = MsgSend.encode(request).finish();
        const promise = this.rpc.request("bank.v1beta1.Msg", "Send", data);
        return promise.then((data) => MsgSendResponse.decode(new _m0.Reader(data)));
    }
    MultiSend(request) {
        const data = MsgMultiSend.encode(request).finish();
        const promise = this.rpc.request("bank.v1beta1.Msg", "MultiSend", data);
        return promise.then((data) => MsgMultiSendResponse.decode(new _m0.Reader(data)));
    }
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
