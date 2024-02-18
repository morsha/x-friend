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
export async function signTransactionWithMnemonic(mnemonic: string, derivationPath: string, transaction: ethers.providers.TransactionRequest, providerUrl: string): Promise<string> {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, derivationPath);
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const walletConnected = wallet.connect(provider);

    // sign transaction
    const signedTransaction = await walletConnected.signTransaction(transaction);
    return signedTransaction;
}
