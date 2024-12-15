import styled from 'styled-components';

export const NavBar = styled.div`
  width: 100%;
  z-index: 10;  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background-color: white;
  box-sizing: border-box;
  height: 64px;

  .naviDivLeft, .naviDivCenter, .naviDivRight {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .naviDivCenter {
    justify-content: center;
  }

  .naviDivRight {
    justify-content: flex-end;
    margin-right: 40px;
  }

  .navTitle {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .navTitle:hover {
    color: #FFD000;
  }

  .navLink {
    color: black;
    margin: 0 15px;
    text-decoration: none;
    font-size: 14px;
    position: relative;
  }

  .navLink:hover, .navLink.active {
    color: #FFD000;
  }

  .naviLoginButton, .naviLoginButtonHovered {
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .naviLoginButton {
    background-color: #FFD000;
    color: black;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .naviLoginButtonHovered {
    background-color: black;
    color: #FFD000;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .mainImageSpan, .mainHoverImageSpan {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .MainImage {
    width: 20px;
    height: 20px;
    margin: 8px;
    transition: filter 0.2s ease;
  }

  .mainHoverImageSpan .MainImage {
    filter: invert(75%) sepia(86%) saturate(504%) hue-rotate(1deg) brightness(103%) contrast(101%);
  }

  .userMenuContainer {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .menu-trigger {
    display: inline-block;
  }

  @media (max-width: 768px) {
    .naviDivCenter, .naviDivRight {
      display: none;
    }

    .navTitle {
      font-size: 28px;
    }

    .navLink {
      font-size: 16px;
    }

    .naviLoginButton, .naviLoginButtonHovered {
      padding: 8px 16px;
      font-size: 14px;
    }

    .mainImageSpan, .mainHoverImageSpan {
      width: 50px;
      height: 50px;
    }

    .MainImage {
      width: 30px;
      height: 30px;
    }
  }
`;

export const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ProfileButtonHover = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
  color: black;
  width: 180px;
  justify-content: flex-start;
  overflow: hidden;
`;

export const UserName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

export const MenuTrigger = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 10px); /* 2x2 그리드 */
  grid-template-rows: repeat(2, 10px);
  gap: 2px; /* 버튼 간 간격 */
  cursor: pointer;
  width: 25px;
  height: 25px;

  .menu-square {
    width: 10px;
    height: 10px;
    background-color: #333; /* 기본 색상 */
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #FFD000; /* 호버 시 노란색으로 변경 */
    }
  }
  .menu-square-d{
    background-color: #FFD000; /* 기본 색상 */
    transition: background-color 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    .menu-square {
      width: 15px;
      height: 15px;
    }

    gap: 3px; /* 모바일에서는 간격 축소 */
  }
`;



export const MenuSpan = styled.span`
  display: inline-block;
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 0;
  transition: all 0.4s;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background-color: #272527;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1001;
  padding-top: 60px;
  display: flex;
  flex-direction: column;

  &.open {
    right: 0;
  }
`;

export const MobileMenuItem = styled.div`
  padding: 10px 20px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #FFD000;
    color: black;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
