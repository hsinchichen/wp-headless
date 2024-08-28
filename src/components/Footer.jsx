import styles from './footer.module.css';

function Footer() {
  return (
    <div
      className={`flex justify-center items-center bg-black text-white py-3 ${styles.footer}`}
    >
      <h1>Footer</h1>
    </div>
  );
}

export default Footer;
