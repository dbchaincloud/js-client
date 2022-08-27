import * as amino_1 from "@cosmjs/amino";
import * as encoding_1 from "@cosmjs/encoding";
import * as math_1 from "@cosmjs/math";
import * as keys_1 from "cosmjs-types/cosmos/crypto/multisig/keys.js";
import * as keys_2 from "cosmjs-types/cosmos/crypto/secp256k1/keys.js";
import * as any_1 from "cosmjs-types/google/protobuf/any.js";

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
