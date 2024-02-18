import {getWalletFromMnemonic, sendTransaction, signTransactionWithMnemonic} from './ethereum';
import {ethers} from "ethers";
import('dotenv').then(dotenv => dotenv.config());

test('getWalletFromMnemonic', ()=> {
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
    const from_wallet = getWalletFromMnemonic(mnemonic, from_path);
    // @ts-ignore
    const to_wallet = getWalletFromMnemonic(mnemonic, to_path);
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const network = await provider.getNetwork();
    const nonce = await provider.getTransactionCount(from_wallet.address);
    console.log(network);
    const chainId = network.chainId;
    console.log(chainId);
    const gasPrice = await provider.getGasPrice();
    const transaction = {
        to: to_wallet.address,
        value: ethers.utils.parseEther('0.0001'),
        chainId: chainId,
        gasLimit: 21000,
        gasPrice: gasPrice,
        nonce: nonce + 1,
    };
    // @ts-ignore
    const response = await signTransactionWithMnemonic(mnemonic, from_path, transaction);
    const tx_hash = await sendTransaction(response);
    console.log(tx_hash);
}, 20000);

test("mint POAP token", async () => {
    const mnemonic = process.env.MNEMONIC;
    const from_path = "m/44'/60'/0'/0/0";
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    // @ts-ignore
    const from_wallet = getWalletFromMnemonic(mnemonic, from_path).connect(provider);
    const contractABI = ["function safeMint(address to) public"];
    const contractAddress = process.env.XPOAP_ADDRESS;
    const gasPrice = await provider.getGasPrice();
    const nonce = await provider.getTransactionCount(from_wallet.address);
    // @ts-ignore
    const contract = new ethers.Contract(contractAddress, contractABI, from_wallet);
    const targetAddress = '0x06635b3EA25FC9734069f98a035F854382677666';
    const txResponse = await contract.safeMint(targetAddress, {
        gasPrice: gasPrice,
        nonce: nonce,
    });

    const receipt = await txResponse.wait();
    console.log(receipt.transactionHash);
}, 50000);