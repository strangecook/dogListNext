import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { db, storage } from '../components/firebase';
import { Breed } from '../types/Breed';

// Firestore에서 breeds 데이터 가져오기
const fetchBreedsFromFirestore = async (): Promise<Breed[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data() as any; // any 타입 사용
      // Breed 타입으로 강제 캐스팅
      const breed: Breed = {
        id: parseInt(doc.id, 10), // id를 number 타입으로 변환
        adaptabilityLevel: data.adaptabilityLevel,
        affectionWithFamily: data.affectionWithFamily,
        barkingLevel: data.barkingLevel,
        breedGroup: data.breedGroup,
        coatLength: data.coatLength,
        coatType: data.coatType,
        description: data.description,
        droolingLevel: data.droolingLevel,
        energyLevel: data.energyLevel,
        englishName: data.englishName,
        exercise: data.exercise,
        goodWithOtherDogs: data.goodWithOtherDogs,
        goodWithYoungChildren: data.goodWithYoungChildren,
        grooming: data.grooming,
        groomingLevel: data.groomingLevel,
        guardProtectiveInstinct: data.guardProtectiveInstinct,
        health: data.health,
        height: data.height,
        koreanName: data.koreanName,
        lifeExpectancy: data.lifeExpectancy,
        needsMentalStimulation: data.needsMentalStimulation,
        nutrition: data.nutrition,
        opennessToStrangers: data.opennessToStrangers,
        origin: data.origin,
        playfulnessLevel: data.playfulnessLevel,
        popularity: data.popularity,
        sheddingLevel: data.sheddingLevel,
        size: data.size,
        temperament: data.temperament,
        theme: data.theme,
        trainabilityLevel: data.trainabilityLevel,
        training: data.training,
        weight: data.weight,
      };
      return breed;
    });
  } catch (error) {
    console.error('Error fetching breeds from Firestore:', error);
    return [];
  }
};

// breeds 데이터를 병합하고 한국 이름 순으로 정렬
const mergeBreedsData = (firestoreData: Breed[]): Record<string, Breed> => {
  const sortedData = firestoreData.sort((a, b) => {
    const nameA = a.koreanName || '';
    const nameB = b.koreanName || '';
    return nameA.localeCompare(nameB, 'ko');
  });

  const mergedData = sortedData.reduce((acc, breed) => {
    acc[breed.englishName.toLowerCase()] = breed;
    return acc;
  }, {} as Record<string, Breed>);

  return mergedData;
};

// Firebase Storage에서 이미지 가져오기
const fetchImagesFromStorage = async (breedName: string): Promise<string[]> => {
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
      return [];
    }
  } catch (error) {
    console.error(`Error fetching images from Storage for breed ${breedName}:`, error);
    return [];
  }
};

// breeds 데이터를 로컬 스토리지에 저장 (클라이언트 측에서만 실행)
const fetchAndStoreBreeds = async (): Promise<Record<string, Breed>> => {
  const firestoreData = await fetchBreedsFromFirestore();
  const mergedData = mergeBreedsData(firestoreData);
  if (typeof window !== 'undefined') {
    localStorage.setItem('breedsData', JSON.stringify(mergedData));
  }
  return mergedData;
};

// 로컬 스토리지에서 breeds 데이터 가져오기 (클라이언트 측에서만 실행)
const getBreedsData = (): Record<string, Breed> | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('breedsData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export { fetchAndStoreBreeds, getBreedsData, fetchImagesFromStorage, fetchBreedsFromFirestore, mergeBreedsData };
