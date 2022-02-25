/**
 * Bech32 prefix for Cosmos addresses.
 */
 export const ADDRESS_PREFIX = 'dbc';

 /**
  * BIP32 derivation path for Cosmos keys.
  */
 // @formatter:off
 export const DERIVATION_PATH = "m/44'/60'/0'/0/0";
 
 // @formatter:on
 
 /**
  * Defines a transaction broadcast mode where the client returns immediately.
  */
 export const BROADCAST_MODE_SYNC = 'sync';
 
 /**
  * Defines a transaction broadcast mode where the client waits for a `CheckTx` execution response only.
  */
 export const BROADCAST_MODE_ASYNC = 'async';
 
 /**
  * Defines a transaction broadcast mode where the client waits for the transaction to be committed in a block.
  */
 export const BROADCAST_MODE_BLOCK = 'block';
 