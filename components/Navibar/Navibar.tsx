import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavBar, UserProfileImage, ProfileButtonHover, UserName, MenuTrigger, MenuSpan, Overlay, MobileMenu, MobileMenuItem } from './NavibarCss';
import pawImage from '../../public/dog-paw.png';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const LoginNavi: React.FC = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
  };

  const goToLoginPage = () => {
    router.push('/login');
  };

  const goToProfilePage = () => {
    router.push('/profile');
  };

  const goToMembershipPage = () => {
    router.push('/membership');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <NavBar>
      <div className='naviDivLeft'>
        <Link href="/" passHref>
          <span
            className={isLogoHovered ? 'mainHoverImageSpan' : 'mainImageSpan'}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <img className='MainImage' src={pawImage.src} alt="Paw Icon" />
          </span>
        </Link>
        <Link href="/" className="navTitle">Dog List</Link>
      </div>
      <div className='naviDivCenter'>
        <Link href="/" className={`navLink ${router.pathname === '/' ? 'active' : ''}`}>홈</Link>
        <Link href="/usage" className={`navLink ${router.pathname === '/usage' ? 'active' : ''}`}>사용 설명</Link>
        <Link href="/contact" className={`navLink ${router.pathname === '/contact' ? 'active' : ''}`}>개발자 문의</Link>
      </div>
      <div className='naviDivRight'>
        {currentUser ? (
          <ProfileButtonHover onClick={goToProfilePage}>
            <UserProfileImage src={currentUser.photoURL || pawImage.src} alt="Profile" />
            <UserName>{currentUser.displayName || 'User'}</UserName>
          </ProfileButtonHover>
        ) : (
          <span
            onClick={goToLoginPage}
            className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            로그인페이지
          </span>
        )}
      </div>
      <MenuTrigger className={mobileMenuOpen ? 'active-1' : ''} onClick={toggleMobileMenu}>
        <MenuSpan />
        <MenuSpan />
        <MenuSpan />
      </MenuTrigger>
      {mobileMenuOpen && <Overlay onClick={toggleMobileMenu} />}
      <MobileMenu className={mobileMenuOpen ? 'open' : ''}>
        <MobileMenuItem onClick={() => router.push('/')}>홈</MobileMenuItem>
        <MobileMenuItem onClick={() => router.push('/usage')}>사용 설명</MobileMenuItem>
        <MobileMenuItem onClick={() => router.push('/contact')}>개발자 문의</MobileMenuItem>
        {currentUser && (
          <>
            <MobileMenuItem onClick={goToProfilePage}>내 프로필</MobileMenuItem>
            <MobileMenuItem onClick={goToMembershipPage}>멤버쉽 가입</MobileMenuItem>
            <MobileMenuItem onClick={handleLogout}>로그아웃</MobileMenuItem>
          </>
        )}
        {!currentUser && (
          <MobileMenuItem onClick={goToLoginPage}>로그인페이지</MobileMenuItem>
        )}
      </MobileMenu>
    </NavBar>
  );
}

export default LoginNavi;
