import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Stubs', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li key={href} className='nav-item'>
        <Link href={href}>
          <a className='nav-link link-light'>{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>DroStub</a>
        </Link>
        <div className='d-flex justify-content-end'>
          <ul className='nav d-flex align-items-center'>{links}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
