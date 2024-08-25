import styled from 'styled-components';

export const MembershipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Subtitle = styled.h2`
  color: #34495E;
  margin-bottom: 20px;
`;

export const SectionContainer = styled.div`
  margin: 80px auto 20px auto;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
`;

export const BadgeTitle = styled.h2`
  color: #2C3E50;
  margin-bottom: 10px;
`;

export const BadgeDescription = styled.p`
  color: #7F8C8D;
  margin-bottom: 20px;
  text-align: center;
`;

export const BadgePrice = styled.p`
  font-size: 1.5em;
  color: #4caf50;
  margin-bottom: 20px;
`;

export const BadgeButton = styled.button`
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

export const DonationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
`;

export const DonationTitle = styled.h2`
  color: #2C3E50;
  margin-bottom: 10px;
`;

export const DonationDescription = styled.p`
  color: #7F8C8D;
  margin-bottom: 20px;
  text-align: center;
`;

export const DonationAmounts = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DonationAmount = styled.div<{ selected?: boolean }>`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 1px solid #4caf50;
  }

  ${({ selected }) =>
    selected &&
    `
    border: 2px solid #4caf50;
  `}
`;

export const DonationButton = styled.button`
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

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-top: 20px;
  text-align: left;
`;

export const BenefitItem = styled.div`
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #2C3E50;

  &::before {
    content: "✔️";
    margin-right: 10px;
    color: #4caf50;
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

export const ModalButton = styled.button`
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
