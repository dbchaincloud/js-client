//const amino_1 = require("@cosmjs/amino");
import cosmjsAmino from "@cosmjs/amino";
const {amino_1} = cosmjsAmino;

import cosmjsEncoding from "@cosmjs/encoding";
const { encoding_1 } = cosmjsEncoding;

import cosmjsMath from "@cosmjs/math";
const { math_1 } = cosmjsMath;

import multisigKeys from "cosmjs-types/cosmos/crypto/multisig/keys.js";
const { keys_1 } = multisigKeys;

import secp256k1Keys from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
const { keys_2 } = secp256k1Keys;

import protobufAny from "cosmjs-types/google/protobuf/any.js";
const { any_1 } = protobufAny;

export function encodePubkey(pubkey) {
    if ((0, amino_1.isSecp256k1Pubkey)(pubkey)) {
        const pubkeyProto = keys_2.PubKey.fromPartial({
            key: (0, encoding_1.fromBase64)(pubkey.value),
        });
        return any_1.Any.fromPartial({
            typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
            value: Uint8Array.from(keys_2.PubKey.encode(pubkeyProto).finish()),
        });
    }
    else if ((0, amino_1.isMultisigThresholdPubkey)(pubkey)) {
        const pubkeyProto = keys_1.LegacyAminoPubKey.fromPartial({
            threshold: math_1.Uint53.fromString(pubkey.value.threshold).toNumber(),
            publicKeys: pubkey.value.pubkeys.map(encodePubkey),
        });
        return any_1.Any.fromPartial({
            typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
            value: Uint8Array.from(keys_1.LegacyAminoPubKey.encode(pubkeyProto).finish()),
        });
    }
    else {
        throw new Error(`Pubkey type ${pubkey.type} not recognized`);
    }
}
