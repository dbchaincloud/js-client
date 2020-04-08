import createHash from 'create-hash';

/**
 * Hash bytes using SHA256.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function sha256 (bytes) {
    return createHash('sha256').update(bytes).digest();
}

/**
 * Hash bytes using RIPEMD160.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function ripemd160 (bytes) {
    return createHash('ripemd160').update(bytes).digest();
}
