import Header from './Header';
import UserFooter from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <UserFooter />
    </div>
  );
};

export default Layout;
