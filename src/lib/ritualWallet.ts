// Ritual Chain Configuration
export const RITUAL_CHAIN = {
  chainId: '0x393', // 919 in hex
  chainName: 'Ritual Mainnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ritual.net'],
  blockExplorerUrls: ['https://explorer.ritual.net'],
};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
      selectedAddress: string | null;
    };
  }
}

export function hasMetaMask(): boolean {
  return typeof window !== 'undefined' && !!window.ethereum?.isMetaMask;
}

export async function connectRitualWallet(): Promise<{ address: string; chainId: string }> {
  const ethereum = window.ethereum;
  if (!ethereum) {
    throw new Error('MetaMask not installed');
  }

  // Request accounts
  const accounts = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  const address = accounts[0];

  // Try to switch to Ritual chain, if fails then add it
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: RITUAL_CHAIN.chainId }],
    });
  } catch (switchError: unknown) {
    const err = switchError as { code?: number };
    // Chain not added yet, add it
    if (err.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [RITUAL_CHAIN],
      });
    } else {
      throw switchError;
    }
  }

  const chainId = (await ethereum.request({ method: 'eth_chainId' })) as string;

  return { address, chainId };
}

export async function getRitualBalance(address: string): Promise<string> {
  const ethereum = window.ethereum;
  if (!ethereum) return '0';

  const balance = (await ethereum.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
  })) as string;

  // Convert from hex wei to ETH
  const wei = parseInt(balance, 16);
  return (wei / 1e18).toFixed(4);
}

export async function signMessage(message: string): Promise<string> {
  const ethereum = window.ethereum;
  if (!ethereum) throw new Error('No wallet');

  const accounts = (await ethereum.request({ method: 'eth_accounts' })) as string[];
  if (!accounts || accounts.length === 0) throw new Error('No accounts');

  return (await ethereum.request({
    method: 'personal_sign',
    params: [message, accounts[0]],
  })) as string;
}

export function onAccountsChanged(callback: (accounts: string[]) => void) {
  window.ethereum?.on('accountsChanged', callback as (...args: unknown[]) => void);
  return () => window.ethereum?.removeListener('accountsChanged', callback as (...args: unknown[]) => void);
}

export function onChainChanged(callback: (chainId: string) => void) {
  window.ethereum?.on('chainChanged', callback as (...args: unknown[]) => void);
  return () => window.ethereum?.removeListener('chainChanged', callback as (...args: unknown[]) => void);
}

export function isRitualChain(chainId: string): boolean {
  return chainId.toLowerCase() === RITUAL_CHAIN.chainId.toLowerCase();
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
