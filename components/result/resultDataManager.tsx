// dataManager.ts
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../components/firebase';
import { SurveyData } from '../../components/survey/SurveyDataType';
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';
import { recommendDogsBasedOnUserInput } from '../../components/survey/recommendDogBasedOnUserInput';
import { getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';

const db = getFirestore();
const auth = getAuth();

export const fetchImagesFromStorage = async (breedName: string): Promise<string[] | null> => {
  try {
    const formattedBreedName = breedName.replace(/ /g, '_');
    const folderRef = ref(storage, `dog/${formattedBreedName}`);
    const fileList = await listAll(folderRef);

    if (fileList.items.length > 0) {
      const imageUrls = await Promise.all(
        fileList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );
      return imageUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching images:`, error);
    return null;
  }
};

export const mapDogDataToUserScores = (dogData: any): DogOwnerEvaluation => {

    console.log("dogData", dogData)
  const fieldMapping: Record<string, string> = {
    adaptability: 'adaptabilityLevel',
    affectionTowardsFamily: 'affectionWithFamily',
    barkingLevel: 'barkingLevel',
    droolingLevel: 'droolingLevel',
    energyLevel: 'energyLevel',
    groomingNeed: 'groomingLevel',
    guardInstinct: 'guardProtectiveInstinct',
    goodWithOtherPets: 'goodWithOtherDogs',
    mentalStimulationNeed: 'needsMentalStimulation',
    opennessToStrangers: 'opennessToStrangers',
    playfulnessLevel: 'playfulnessLevel',
    sheddingLevel: 'sheddingLevel',
    suitableForChildren: 'goodWithYoungChildren',
    trainability: 'trainabilityLevel',
  };

  return {
    ownerRate: 0,
    coatType: dogData.coatType || '',
    coatLength: dogData.coatLength || '',
    smallDogScore: 0,
    mediumDogScore: 0,
    largeDogScore: 0,
    extraLargeDogScore: 0,
    adaptability: dogData[fieldMapping.adaptability] || 0,
    affectionTowardsFamily: dogData[fieldMapping.affectionTowardsFamily] || 0,
    barkingLevel: dogData[fieldMapping.barkingLevel] || 0,
    droolingLevel: dogData[fieldMapping.droolingLevel] || 0,
    energyLevel: dogData[fieldMapping.energyLevel] || 0,
    groomingNeed: dogData[fieldMapping.groomingNeed] || 0,
    guardInstinct: dogData[fieldMapping.guardInstinct] || 0,
    goodWithOtherPets: dogData[fieldMapping.goodWithOtherPets] || 0,
    mentalStimulationNeed: dogData[fieldMapping.mentalStimulationNeed] || 0,
    opennessToStrangers: dogData[fieldMapping.opennessToStrangers] || 0,
    playfulnessLevel: dogData[fieldMapping.playfulnessLevel] || 0,
    sheddingLevel: dogData[fieldMapping.sheddingLevel] || 0,
    suitableForChildren: dogData[fieldMapping.suitableForChildren] || 0,
    trainability: dogData[fieldMapping.trainability] || 0,
  };
};

export const fetchSurveyData = async (userId: string, surveyId: string) => {
  const surveyRef = doc(db, 'users', userId, 'surveys', surveyId);
  const surveyDoc = await getDoc(surveyRef);
  if (surveyDoc.exists()) {
    return surveyDoc.data() as SurveyData;
  } else {
    throw new Error('Survey data not found');
  }
};

export const authenticateUser = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const fetchRecommendedDogs = async (surveyData: SurveyData) => {
  const recommendedDogNames = await recommendDogsBasedOnUserInput(surveyData);
  const breedsData = getBreedsData();
  if (breedsData) {
    return recommendedDogNames
      .map((name) => breedsData[name.englishName.toLowerCase()])
      .filter(Boolean);
  }
  throw new Error('Dog breed data not found');
};
