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

// mint NFT
export async function mintNFT(mnemonic: string, from_path: string, to_address: string, contract_address: string): Promise<{hash: string, token_id: number}>{
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const from_wallet = getWalletFromMnemonic(mnemonic, from_path).connect(provider);
    const contractABI = ["function safeMint(address to) public"];
    const contract = new ethers.Contract(contract_address, contractABI, from_wallet);
    const free_data = await provider.getFeeData();
    const gasPrice = free_data.gasPrice;
    const nonce = await provider.getTransactionCount(from_wallet.address);
    const mintTx = await contract.safeMint(to_address, {
        gasPrice: gasPrice,
        gasLimit: 56000,
        nonce: nonce,
    });
    const receipt = await mintTx.wait();
    return {hash: receipt.hash, token_id: Number(BigInt(receipt.logs[0].topics[3]))};
}