// Ritual Chain Configuration (from docs.ritualfoundation.org)
export const RITUAL_CHAIN = {
  chainId: '0x7BB', // 1979 in hex
  chainName: 'Ritual',
  nativeCurrency: {
    name: 'Ritual',
    symbol: 'RITUAL',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ritualfoundation.org'],
  blockExplorerUrls: ['https://explorer.ritualfoundation.org'],
};

interface EthereumProvider {
  isMetaMask?: boolean;
  isBinance?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
  selectedAddress: string | null;
}

interface WindowWithEthereum extends Window {
  ethereum?: EthereumProvider & { providers?: EthereumProvider[] };
}

/**
 * Get the real MetaMask provider even when Binance Wallet overrides window.ethereum.
 * Binance Wallet sets window.ethereum but the real MetaMask is in the providers array.
 */
function getMetaMaskProvider(): EthereumProvider | null {
  const w = window as unknown as WindowWithEthereum;
  const ethereum = w.ethereum;

  if (!ethereum) return null;

  // If there's a providers array, find MetaMask specifically
  if (ethereum.providers && ethereum.providers.length > 0) {
    const metaMask = ethereum.providers.find((p) => p.isMetaMask);
    if (metaMask) return metaMask;
  }

  // No providers array — if the current one is MetaMask (and not Binance), use it
  if (ethereum.isMetaMask && !ethereum.isBinance) {
    return ethereum;
  }

  return null;
}

export function hasMetaMask(): boolean {
  return typeof window !== 'undefined' && getMetaMaskProvider() !== null;
}

export async function connectRitualWallet(): Promise<{ address: string; chainId: string }> {
  const provider = getMetaMaskProvider();
  if (!provider) {
    throw new Error(
      typeof window !== 'undefined' && (window as unknown as WindowWithEthereum).ethereum
        ? 'MetaMask not detected. You may have Binance Wallet overriding it. Try disabling Binance Wallet extension.'
        : 'MetaMask not installed'
    );
  }

  // Request accounts from the real MetaMask
  const accounts = (await provider.request({
    method: 'eth_requestAccounts',
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  const address = accounts[0];

  // Try to switch to Ritual chain, if fails then add it
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: RITUAL_CHAIN.chainId }],
    });
  } catch (switchError: unknown) {
    const err = switchError as { code?: number };
    // Chain not added yet — add it
    if (err.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [RITUAL_CHAIN],
      });
    } else {
      throw switchError;
    }
  }

  const chainId = (await provider.request({ method: 'eth_chainId' })) as string;
  return { address, chainId };
}

export async function getRitualBalance(address: string): Promise<string> {
  const provider = getMetaMaskProvider();
  if (!provider) return '0';

  const balance = (await provider.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
  })) as string;

  // Convert from hex wei to RITUAL
  const wei = parseInt(balance, 16);
  return (wei / 1e18).toFixed(4);
}

export const RITUAL_RECEIVER = '0x24568e2E1b555D1eb9b4F9b2c2f5cE8e9aC93038';

export async function sendRitual(amountInEther: string): Promise<{ txHash: string }> {
  const provider = getMetaMaskProvider();
  if (!provider) throw new Error('No wallet connected');

  const accounts = (await provider.request({ method: 'eth_accounts' })) as string[];
  if (!accounts || accounts.length === 0) throw new Error('No accounts');

  const txHash = (await provider.request({
    method: 'eth_sendTransaction',
    params: [{
      from: accounts[0],
      to: RITUAL_RECEIVER,
      value: '0x' + BigInt(Math.floor(parseFloat(amountInEther) * 1e18)).toString(16),
    }],
  })) as string;

  return { txHash };
}

export function onAccountsChanged(callback: (accounts: string[]) => void) {
  const provider = getMetaMaskProvider();
  provider?.on('accountsChanged', callback as (...args: unknown[]) => void);
  return () => provider?.removeListener('accountsChanged', callback as (...args: unknown[]) => void);
}

export function onChainChanged(callback: (chainId: string) => void) {
  const provider = getMetaMaskProvider();
  provider?.on('chainChanged', callback as (...args: unknown[]) => void);
  return () => provider?.removeListener('chainChanged', callback as (...args: unknown[]) => void);
}

export function isRitualChain(chainId: string): boolean {
  return chainId.toLowerCase() === RITUAL_CHAIN.chainId.toLowerCase();
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
