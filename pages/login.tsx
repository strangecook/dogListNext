import Image from "next/image";
import { useRouter } from "next/router";
import dogLoginPicture from "../public/mainwebImage.webp";
import googleLogo from "../public/logo_google_icon.png"; // Google 로고 이미지 추가
import facebookLogo from "../public/facebook_icon.png"; // Facebook 로고 이미지 추가
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Head from 'next/head';
import { LoginCover, DogLoginImage, LoginBox, Form, Input, SignUpButton, ErrorMessage, GoogleLoginButton, FacebookLoginButton, ButtonWrapper } from "../components/Login/LoginCss";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { AuthProvider } from "firebase/auth";
import { DescriptionCover, Context, CircleImageContainer, TitleText } from "../components/Home/styles/DescriptionpageCss";
import dog1 from '../public/dogPic5@.webp';
import dog2 from '../public/dogPic14@.webp';
import dog3 from '../public/dogPic20@.webp';
import dog4 from '../public/dogPic23@.webp';
import dog5 from '../public/dogPic21@.webp';
import dog6 from '../public/dogPic16@.webp';


interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const moveToCreatePage = () => {
    router.push("/createAccount");
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.log(errorCode);
        setErrorMessage(`Error: ${errorCode}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateUniqueNickname = async (nickname: string): Promise<string> => {
    let uniqueNickname = nickname;
    let exists = true;
    let attempt = 0;

    while (exists && attempt < 5) {
      const nicknameDoc = await getDoc(doc(db, "usernames", uniqueNickname));
      if (nicknameDoc.exists()) {
        uniqueNickname = `${nickname}${Math.floor(Math.random() * 10000)}`;
      } else {
        exists = false;
        console.log(`Nickname "${uniqueNickname}" is available.`);
      }
      attempt++;
    }

    if (exists) {
      console.error("Failed to generate a unique nickname.");
      throw new Error("닉네임을 생성할 수 없습니다.");
    }

    return uniqueNickname;
  };

  const handleOAuthLogin = async (provider: AuthProvider) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore 권한 문제 해결 후 정상적으로 데이터 저장
      try {
        let displayName = user.displayName || `user_${user.uid.substring(0, 5)}`;
        console.log(`Initial nickname: "${displayName}"`);
        displayName = await generateUniqueNickname(displayName);

        await updateProfile(user, { displayName: displayName });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: displayName,
          email: user.email,
        });

        await setDoc(doc(db, "usernames", displayName), { uid: user.uid });
      } catch (firestoreError) {
        console.error("Firestore 데이터 저장 중 오류:", firestoreError);
      }

      // 로그인이 성공하면 홈 화면으로 이동
      console.log("Redirecting to home...");
      router.push("/");
      console.log("Redirection completed.");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.log("Firebase Error:", errorCode);
        setErrorMessage(`Error: ${errorCode}`);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleLogin = () => handleOAuthLogin(new GoogleAuthProvider());
  const handleFacebookLogin = () => handleOAuthLogin(new FacebookAuthProvider());

  const getFirstErrorMessage = () => {
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    return null;
  };

  return (
    <DescriptionCover>
      <Head>
        <title>로그인 - 강아지위키</title>
        <meta name="description" content="강아지위키에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요." />
        <meta name="keywords" content="로그인, 강아지위키, 강아지 정보" />

        {/* 이 페이지에 특화된 Open Graph Meta Tags */}
        <meta property="og:title" content="로그인 - 강아지위키" />
        <meta property="og:description" content="강아지위키에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/login" />
        <meta property="og:type" content="website" />

        {/* JSON-LD 구조화된 데이터: 이 페이지에 특화된 데이터 */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "로그인 - 강아지위키",
      "url": "https://www.doglist.info/login",
      "description": "강아지위키에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요."
    }
    `}
        </script>
        <link rel="canonical" href="https://www.doglist.info/login" />
      </Head>
      <Context>
        <CircleImageContainer>
          {/* 겹쳐 보이는 원형 이미지들 */}
          <Image src={dog1} alt="강아지 1" className="circle-image image1" />
          <Image src={dog2} alt="강아지 2" className="circle-image image2" />
          <Image src={dog3} alt="강아지 3" className="circle-image image3" />
          <Image src={dog4} alt="강아지 4" className="circle-image image4" />
          <Image src={dog5} alt="강아지 5" className="circle-image image5" />
          <Image src={dog6} alt="강아지 6" className="circle-image image6" />
          <div className="color-circle circle1"></div>
          <div className="color-circle circle2"></div>
          <div className="color-circle circle3"></div>
          <div className="color-circle circle4"></div>
        </CircleImageContainer>

        {/* 텍스트 */}
        <TitleText>
          <LoginBox>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "유효한 이메일 주소를 입력하세요"
                  }
                })}
                name="email"
                placeholder="이메일"
                type="email"
              />
              <Input
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                  minLength: {
                    value: 6,
                    message: "비밀번호는 6자리 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다"
                  }
                })}
                name="password"
                placeholder="비밀번호"
                type="password"
              />
              {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <Input
                type="submit"
                value={isLoading ? "계정 확인 중..." : "로그인"}
                disabled={isLoading}
              />
            </Form>
            <ButtonWrapper>
              <GoogleLoginButton onClick={handleGoogleLogin} disabled={isLoading}>
                <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
                {isLoading ? "로그인 중..." : "Google로 로그인"}
              </GoogleLoginButton>
              <FacebookLoginButton onClick={handleFacebookLogin} disabled={isLoading}>
                <Image src={facebookLogo} alt="Facebook Logo" width={24} height={24} />
                {isLoading ? "로그인 중..." : "Facebook으로 로그인"}
              </FacebookLoginButton>
            </ButtonWrapper>
            <SignUpButton onClick={moveToCreatePage}>회원가입</SignUpButton>
          </LoginBox>
        </TitleText>
      </Context>
    </DescriptionCover>
  );
}


{/* <LoginBox>
<Form onSubmit={handleSubmit(onSubmit)}>
  <Input
    {...register("email", {
      required: "이메일을 입력하세요",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "유효한 이메일 주소를 입력하세요"
      }
    })}
    name="email"
    placeholder="이메일"
    type="email"
  />
  <Input
    {...register("password", {
      required: "비밀번호를 입력하세요",
      minLength: {
        value: 6,
        message: "비밀번호는 6자리 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다"
      }
    })}
    name="password"
    placeholder="비밀번호"
    type="password"
  />
  {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
  {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  <Input
    type="submit"
    value={isLoading ? "계정 확인 중..." : "로그인"}
    disabled={isLoading}
  />
</Form>
<ButtonWrapper>
  <GoogleLoginButton onClick={handleGoogleLogin} disabled={isLoading}>
    <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
    {isLoading ? "로그인 중..." : "Google로 로그인"}
  </GoogleLoginButton>
  <FacebookLoginButton onClick={handleFacebookLogin} disabled={isLoading}>
    <Image src={facebookLogo} alt="Facebook Logo" width={24} height={24} />
    {isLoading ? "로그인 중..." : "Facebook으로 로그인"}
  </FacebookLoginButton>
</ButtonWrapper>
<SignUpButton onClick={moveToCreatePage}>회원가입</SignUpButton>
</LoginBox> */}