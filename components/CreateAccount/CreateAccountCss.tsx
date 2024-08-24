import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 뷰포트 바깥으로 나가는 이미지나 요소를 숨기기 위해 추가 */
`;

export const BackgroundImage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FormBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1; /* LoginBox가 DogLoginImage 위에 위치하도록 설정 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50;
  }

  &[type="submit"] {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #B8E0B9;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

export const LoginButton = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  margin-top: auto; /* 회원가입 버튼을 아래로 내리기 위해 auto로 조정합니다 */

  &:hover {
    color: #B8E0B9;
  }
`;
