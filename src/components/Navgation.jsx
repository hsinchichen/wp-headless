import Link from 'next/link';

function Navgation() {
  return (
    <nav>
      <ul className="flex gap-6 text-lg ">
        <li>
          <Link href="/">首頁</Link>
        </li>
        <li>
          <Link href="/blog">文章</Link>
        </li>
        <li>
          <Link href="/blog/category1">分類一</Link>
        </li>
        <li>
          <Link href="/about">關於我們</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navgation;
