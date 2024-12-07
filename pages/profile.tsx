import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { auth, storage, db } from '../components/firebase';
import { onAuthStateChanged, updateProfile, reauthenticateWithCredential, EmailAuthProvider, User } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { query, where, getDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import Head from 'next/head';
import Image from 'next/image';
import pawImage from '../public/dog-paw.png';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 80%;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ProfileInput = styled.input`
  width: 80%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const ProfileButton = styled.button`
  width: 80%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const NameInputContainer = styled.div`
  display: flex;
  width: 80%;
`;

const NameInput = styled(ProfileInput)`
  flex: 1;
  margin-right: 10px;
`;

const CheckButton = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const SurveyListContainer = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 80px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SurveyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const SurveyButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [surveys, setSurveys] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkDisplayNameExists = async (name: string, userId: string): Promise<boolean> => {
    try {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', name),
        where('uid', '!=', userId) // 현재 사용자의 uid는 제외
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('이름 중복 확인 오류:', error);
      return false;
    }
  };

  const handleCheckName = async () => {
    if (!displayName.trim() || !user) {
      setIsNameValid(false);
      return;
    }


    const nameExists = await checkDisplayNameExists(displayName, user.uid);
    setIsNameValid(!nameExists);
  };

  const updateDisplayName = async () => {
    if (user && isNameValid) {
      try {
        await updateProfile(user, { displayName });
        await setDoc(doc(db, 'users', user.uid), { displayName }, { merge: true });
        setModalMessage('이름이 업데이트되었습니다.');
        setModalIsOpen(true);
      } catch (error) {
        console.error('이름 업데이트 실패:', error);
        setModalMessage('이름 업데이트 중 오류가 발생했습니다.');
        setModalIsOpen(true);
      }
    } else {
      setModalMessage('중복 확인 후 다시 시도하세요.');
      setModalIsOpen(true);
    }
  };

  const updateProfilePhoto = async () => {
    if (user && file) {
      try {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, file);
        const updatedPhotoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: updatedPhotoURL });
        await setDoc(doc(db, 'users', user.uid), { photoURL: updatedPhotoURL }, { merge: true });
        setPhotoURL(updatedPhotoURL);
        setModalMessage('프로필 사진이 업데이트되었습니다.');
        setModalIsOpen(true);
      } catch (error) {
        console.error('프로필 사진 업데이트 실패:', error);
        setModalMessage('프로필 사진 업데이트 중 오류가 발생했습니다.');
        setModalIsOpen(true);
      }
    }
  };

  const updatePassword = async () => {
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
        await reauthenticateWithCredential(user, credential);
        await (user as any).updatePassword(newPassword);
        setModalMessage('비밀번호가 업데이트되었습니다.');
        setModalIsOpen(true);
      } catch (error) {
        console.error('비밀번호 업데이트 실패:', error);
        setModalMessage('비밀번호 업데이트 중 오류가 발생했습니다.');
        setModalIsOpen(true);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert('1MB 이하의 파일만 업로드할 수 있습니다.');
    }
  };

  useEffect(() => {
    const fetchUserSurveys = async (uid: string) => {
      setIsLoading(true);
      try {
        // 'users/{userId}/surveys' 하위 컬렉션 참조
        const userSurveysRef = collection(doc(db, 'users', uid), 'surveys');
        const querySnapshot = await getDocs(userSurveysRef);

        if (!querySnapshot.empty) {
          const userSurveys = querySnapshot.docs.map((doc) => ({
            id: doc.id, // 문서 ID
            ...doc.data(), // 기타 데이터
          }));
          setSurveys(userSurveys); // surveys 상태에 저장
        } else {
          console.error('사용자의 설문조사가 없습니다.');
        }
      } catch (error) {
        console.error('설문조사 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
        fetchUserSurveys(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);



  const handleViewResult = (event: React.MouseEvent<HTMLButtonElement>, surveyNumber: string) => {
    event.preventDefault();
    router.push(`/result/${surveyNumber}`);
  };
  

  if (!user) {
    return <ProfileContainer>로그인이 필요합니다.</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <Head>
        <title>프로필 - 강아지위키</title>
      </Head>
      <ProfileImage src={photoURL || pawImage.src} alt="Profile" width={150} height={150} />
      <ProfileForm>
        <Label>이름</Label>
        <NameInputContainer>
          <NameInput
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="이름"
          />
          <CheckButton type="button" onClick={handleCheckName}>중복 확인</CheckButton>
        </NameInputContainer>
        {isNameValid === false && <p style={{ color: 'red' }}>이미 사용 중인 이름입니다.</p>}
        {isNameValid === true && <p style={{ color: 'green' }}>사용 가능한 이름입니다.</p>}
        <ProfileButton type="button" onClick={updateDisplayName}>이름 업데이트</ProfileButton>


        <Label>프로필 사진</Label>
        <FileInput type="file" accept="image/*" onChange={handleFileChange} />
        <ProfileButton type="button" onClick={updateProfilePhoto}>프로필 사진 업데이트</ProfileButton>

        <Label>현재 비밀번호</Label>
        <ProfileInput
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호"
        />
        <Label>새 비밀번호</Label>
        <ProfileInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
        />
        <ProfileButton type="button" onClick={updatePassword}>비밀번호 업데이트</ProfileButton>
        <SurveyListContainer>
          <h2>설문조사 목록</h2>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : surveys.length > 0 ? (
            <ul>
              {surveys.map((survey) => (
                <SurveyItem key={survey.id}>
                  <span>설문조사 번호: {survey.id}</span>
                  <SurveyButton onClick={(e) => handleViewResult(e, survey.id)}>
                    결과 보기
                  </SurveyButton>

                </SurveyItem>
              ))}
            </ul>
          ) : (
            <p>저장된 설문조사가 없습니다.</p>
          )}
        </SurveyListContainer>

      </ProfileForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Profile Update Modal"
      >
        <ModalContent>
          <h2>알림</h2>
          <div>{modalMessage}</div>
          <ModalButton onClick={closeModal}>닫기</ModalButton>
        </ModalContent>
      </Modal>
    </ProfileContainer>
  );
};

export default Profile;
