// components/ClientProvider.tsx
'use client'; // Mark this as a Client Component

import { Provider } from 'react-redux';
import { store } from '../store/store'; // Adjust the path as necessary

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
