export function MsgAddFriend(
  senderAddress,
  {
    myName,
    friendAddr,
    friendName
  }
) {
  return {
    type: "dbchain/AddFriend",
    value: {
      owner_name: myName,
      friend_addr: friendAddr,
      friend_name: friendName,
      owner: senderAddress
    }
  }
}

export function MsgRespondFriend(
  senderAddress,
  {
    friendAddr,
    action
  }
) {
  return {
    type: "dbchain/RespondFriend",
    value: {
      friend_addr: friendAddr,
      action: action,
      owner: senderAddress
    }
  }
}

export function MsgInsertRow(
  senderAddress,
  {
    app_code,
    table_name,
    fields
  }
) {
  return {
    type: `dbchain/InsertRow`,
    value: {
      app_code: app_code,
      table_name: table_name,
      fields: fields,
      owner: senderAddress
    }
  }
}

export function MsgSend(
  senderAddress,
  {
    toAddress,
    amounts // [{ denom, amount}]
  }
) {
  return {
    type: `cosmos-sdk/MsgSend`,
    value: {
      from_address: senderAddress,
      to_address: toAddress,
      amount: amounts.map(Coin)
    }
  }
}

function Coin({ amount, denom }) {
  return {
    amount: String(amount),
    denom
  }
}

