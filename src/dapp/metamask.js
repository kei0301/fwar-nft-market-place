import MetaMaskOnboarding from '@metamask/onboarding';

export const isMetaMaskInstalled = () => {
  return MetaMaskOnboarding.isMetaMaskInstalled();
};
