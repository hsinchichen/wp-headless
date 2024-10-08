import Image from 'next/image';
import Navgation from './Navgation';

import logo from '@/../public/next.svg';
import styles from './header.module.css';

function Header() {
  return (
    <header className={`py-5 shadow-md ${styles.header}`}>
      <div className="flex items-center gap-2 justify-between container m-auto">
        <Image src={logo} alt="" width={150} />
        <Navgation />
      </div>
    </header>
  );
}

export default Header;
