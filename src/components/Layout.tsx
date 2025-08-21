import { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <MobileMenu />
    </div>
  );
};

export default Layout;