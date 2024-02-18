import {getWalletFromMnemonic, sendTransaction, signTransactionWithMnemonic} from './ethereum';
import {ethers} from "ethers";
require('dotenv').config();

test('getWalletFromMnemonic', () => {
    const mnemonic = process.env.MNEMONIC;
    console.log(mnemonic)
    // @ts-ignore
    const wallet = getWalletFromMnemonic(mnemonic);
    console.log(wallet.address);
    expect(wallet.address).toBe('0xC5b8aecD7fc1D1F083f1fb081427F4D9Ef3bd7cF');
});

test('getWalletFromMnemonic with path', () => {
    const mnemonic = process.env.MNEMONIC;
    console.log(mnemonic)
    const path = "m/44'/60'/0'/0/1";
    // @ts-ignore
    const wallet = getWalletFromMnemonic(mnemonic, path);
    console.log(wallet.address);
    expect(wallet.address).toBe('0x06635b3EA25FC9734069f98a035F854382677666');
});

// test transaction signing
test('signTransactionWithMnemonic', async () => {
    const mnemonic = process.env.MNEMONIC;
    const from_path = "m/44'/60'/0'/0/0";
    const to_path = "m/44'/60'/0'/0/1";
    // @ts-ignore
    const wallet = getWalletFromMnemonic(mnemonic, to_path);
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    const gasPrice = await provider.getGasPrice();
    const transaction = {
        to: wallet.address,
        value: ethers.utils.parseEther('0.0001'),
        chainId: chainId,
        gasLimit: 21000,
        gasPrice: gasPrice,
    };
    // @ts-ignore
    const response = await signTransactionWithMnemonic(mnemonic, from_path, transaction);
    const tx_hash = await sendTransaction(response);
    console.log(tx_hash);
}, 10000);