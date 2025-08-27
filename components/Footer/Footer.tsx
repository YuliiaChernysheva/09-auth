import Link from "next/link";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yuliia Chernysheva</p>
          <p>
            Contact us:
            <Link href="mailto:yuliia@notehub.app">yuliia@notehub.app</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
