
export async function getTransactionRegister(network, txid) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await fetch(`${network}/extended/v1/tx/${txid}`, options)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.log("not 200 response", response)
    }
}
