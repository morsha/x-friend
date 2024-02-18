import { getWalletFromMnemonic } from './ethereum';
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