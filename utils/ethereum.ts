import {ethers, HDNodeWallet, Mnemonic, Wallet} from 'ethers';

// get wallet from mnemonic
export function getWalletFromMnemonic(mnemonic: string, derivationPath: string): HDNodeWallet {
    if (derivationPath === "") {
        derivationPath = "m/44'/60'/0'/0/0";
    }
    const wallet_phrase = Mnemonic.fromPhrase(mnemonic);
    return  HDNodeWallet.fromMnemonic(wallet_phrase, derivationPath);
}

// sign transaction with mnemonic
export async function signTransactionWithMnemonic(mnemonic: string, derivationPath: string, transaction: ethers.TransactionRequest): Promise<string> {
    const wallet = getWalletFromMnemonic(mnemonic, derivationPath);
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const walletConnected = wallet.connect(provider);

    // sign transaction
    const signedTransaction = await walletConnected.signTransaction(transaction);
    return signedTransaction;
}

// send transaction to the network
export async function sendTransaction(signedTransaction: string): Promise<string> {
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const response = await provider.broadcastTransaction(signedTransaction);
    return response.hash;
}