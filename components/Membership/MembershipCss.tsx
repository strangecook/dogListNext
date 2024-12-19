import styled from 'styled-components';

export const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SurveyIntro = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const Title = styled.h1`
  color: #2C3E50;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: #7F8C8D;
  margin-bottom: 30px;
  font-size: 1.2em;
`;

export const StartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #2C3E50;
`;

export const ModalDescription = styled.p`
  color: #7F8C8D;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
  },
};
