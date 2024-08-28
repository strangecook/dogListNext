import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dogLoginPicture from "../public/mainwebImage.webp";
import { useForm } from "react-hook-form";
import { Wrapper, BackgroundImage, FormBox, Form, Input, ErrorMessage, LoginButton } from "../components/CreateAccount/CreateAccountCss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { useRouter } from 'next/router';
import { FirebaseError } from "firebase/app";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function CreateAccount() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (isLoading || data.email === "" || data.password === "" || data.password.length < 5) return;

    try {
      console.log("Checking if nickname exists...");
      const q = query(collection(db, "users"), where("nickname", "==", data.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Nickname already exists");
        setErrorMessage("닉네임이 이미 존재합니다.");
        setIsLoading(false);
        return;
      }

      console.log("Creating user...");
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(credential.user, {
        displayName: data.name
      });

      console.log("Saving user data to Firestore...");
      await setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        nickname: data.name,
        email: data.email
      });

      console.log("User created successfully, navigating to home...");
      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.error(`Firebase Error: ${errorCode}`);
        setErrorMessage(`Error: ${errorCode}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFirstErrorMessage = () => {
    if (errors.name) return errors.name.message as string;
    if (errors.email) return errors.email.message as string;
    if (errors.password) return errors.password.message as string;
    if (errors.confirmPassword) return errors.confirmPassword.message as string;
    return null;
  };

  const moveToLogin = () => {
    router.push("/login");
  };

  return (
    <Wrapper>
      <Head>
        <title>계정 생성 - Dog List</title>
        <meta name="description" content="Dog List에서 새로운 계정을 생성하세요. 쉽고 빠른 계정 생성으로 다양한 강아지 품종에 대한 정보를 제공받을 수 있습니다." />
        <meta name="keywords" content="계정 생성, Dog List, 회원가입, 강아지 정보" />
        <meta property="og:title" content="계정 생성 - Dog List" />
        <meta property="og:description" content="Dog List에서 새로운 계정을 생성하세요. 쉽고 빠른 계정 생성으로 다양한 강아지 품종에 대한 정보를 제공받을 수 있습니다." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/createAccount" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doglist.info/createAccount" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "계정 생성 - Dog List",
            "url": "https://www.doglist.info/createAccount",
            "description": "Dog List에서 새로운 계정을 생성하세요. 쉽고 빠른 계정 생성으로 다양한 강아지 품종에 대한 정보를 제공받을 수 있습니다."
          }
          `}
        </script>
      </Head>
      <BackgroundImage>
        <Image src={dogLoginPicture} alt="dog" layout="fill" objectFit="cover" />
      <FormBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", { required: "이름을 입력하세요" })}
            name="name"
            placeholder="닉네임"
            type="text"
          />
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
                message: "비밀번호는 최소 6자 이상이어야 합니다"
              }
            })}
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          <Input
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력하세요",
              validate: (value) => value === getValues("password") || "비밀번호가 일치하지 않습니다"
            })}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
          />
          {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Input
            type="submit"
            value={isLoading ? "계정 생성 중..." : "계정 생성하기"}
            disabled={isLoading}
          />
        </Form>
        <LoginButton onClick={moveToLogin}>로그인</LoginButton>
      </FormBox>
      </BackgroundImage>
    </Wrapper>
  );
}
