import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 차트 설정
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const db = getFirestore();
const auth = getAuth();

const SurveyResult = () => {
  const [surveyData, setSurveyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // 사용자 상태 추가
  const router = useRouter();
  const { surveyId } = router.query;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 사용자 상태를 설정
      } else {
        router.push('/login'); // 인증되지 않으면 로그인 페이지로 이동
      }
    });

    return () => unsubscribe(); // 정리(cleanup) 함수 추가
  }, [router]);

  useEffect(() => {
    if (!user || !surveyId) return; // 사용자 또는 설문 ID가 없으면 대기

    const fetchSurveyData = async () => {
      try {
        const surveyRef = doc(db, 'users', user.uid, 'surveys', surveyId as string);
        const surveyDoc = await getDoc(surveyRef);

        if (surveyDoc.exists()) {
          setSurveyData(surveyDoc.data());
        } else {
          console.error('해당 설문조사 결과를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('설문조사 데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [user, surveyId]);

  if (loading) return <p>로딩 중...</p>;
  if (!surveyData) return <p>설문 결과를 찾을 수 없습니다.</p>;

  console.log("userScores", surveyData)

  // 차트 데이터 설정
  const userScores = {
    ownerRate: surveyData.ownerRate || 0,
    smallDogScore: surveyData.smallDogScore || 0,
    mediumDogScore: surveyData.mediumDogScore || 0,
    largeDogScore: surveyData.largeDogScore || 0,
    extraLargeDogScore: surveyData.extraLargeDogScore || 0,
    adaptability: surveyData.adaptability || 0,
    affectionTowardsFamily: surveyData.affectionTowardsFamily || 0,
    barkingLevel: surveyData.barkingLevel || 0,
    droolingLevel: surveyData.droolingLevel || 0,
    energyLevel: surveyData.energyLevel || 0,
    groomingNeed: surveyData.groomingNeed || 0,
    guardInstinct: surveyData.guardInstinct || 0,
    goodWithOtherPets: surveyData.goodWithOtherPets || 0,
    mentalStimulationNeed: surveyData.mentalStimulationNeed || 0,
    opennessToStrangers: surveyData.opennessToStrangers || 0,
    playfulnessLevel: surveyData.playfulnessLevel || 0,
    suitableForChildren: surveyData.suitableForChildren || 0,
    sheddingLevel: surveyData.sheddingLevel || 0,
    trainability: surveyData.trainability || 0,
  };

  // 차트 데이터 구성
  const chartData = {
    labels: [
      'Owner Rate',
      'Small Dog Score',
      'Medium Dog Score',
      'Large Dog Score',
      'Extra Large Dog Score',
      'Adaptability',
      'Affection Towards Family',
      'Barking Level',
      'Drooling Level',
      'Energy Level',
      'Grooming Need',
      'Guard Instinct',
      'Good with Other Pets',
      'Mental Stimulation Need',
      'Openness to Strangers',
      'Playfulness Level',
      'Suitable for Children',
      'Shedding Level',
      'Trainability',
    ],
    datasets: [
      {
        label: 'Score',
        data: Object.values(userScores),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>설문조사 결과</h1>
      <p>설문 ID: {surveyId}</p>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: '강아지 선호도 점수',
            },
          },
        }}
      />
    </div>
  );
};

export default SurveyResult;
