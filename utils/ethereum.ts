import { ethers } from 'ethers';

// get wallet from mnemonic
export function getWalletFromMnemonic(mnemonic: string, derivationPath: string): ethers.Wallet {
    if (!derivationPath) {
        return ethers.Wallet.fromMnemonic(mnemonic);
    }
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const childNode = hdNode.derivePath(derivationPath);

    let w = new ethers.Wallet(childNode.privateKey);
    w = new ethers.Wallet(childNode.privateKey);
    return w;
}

// sign transaction with mnemonic
export async function signTransactionWithMnemonic(mnemonic: string, derivationPath: string, transaction: ethers.providers.TransactionRequest): Promise<string> {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, derivationPath);
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const walletConnected = wallet.connect(provider);

    // sign transaction
    const signedTransaction = await walletConnected.signTransaction(transaction);
    return signedTransaction;
}

// send transaction to the network
export async function sendTransaction(signedTransaction: string): Promise<string> {
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const response = await provider.sendTransaction(signedTransaction);
    return response.hash;
}