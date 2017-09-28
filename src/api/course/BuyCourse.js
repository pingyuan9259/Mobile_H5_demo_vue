import Request from '../../utils/request'
import GetPublicKey from '../GetPublicKey'
import GetSignatureKey from '../GetSignatureKey'
import RSA from '../../utils/RSA'
import DES from '../../utils/DES'

export default async function (data) {
  try {
    // 创建订单前，先从服务器拿到验证key
    let publicKeyResult = await GetPublicKey()
    let keys = await GetSignatureKey()

    let info = data
    info = JSON.stringify(info)

    // 进行rsa加密
    let params = RSA.encrypt(publicKeyResult.public_key, info)

    // 进行des加密
    let signature = DES.encrypt(params[1], keys.key2)
    signature = signature.toString()

    let result = await Request.post({
      url: 'v3/wallet/subscribe',
      data: {
        param: params[0],
        signature: signature,
        wallet_key: keys.key1
      }})

    if (result.code && result.code === 1) {
      return Promise.resolve(result.result)
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
