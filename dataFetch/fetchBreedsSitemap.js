const { collection, getDocs, QueryDocumentSnapshot } = require('firebase/firestore');
const { ref, getDownloadURL, listAll } = require('firebase/storage');
const { db, storage } = require('../components/firebaseBuild');

// Firestore에서 breeds 데이터 가져오기
const fetchBreedsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const breed = {
        id: parseInt(doc.id, 10),
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
const mergeBreedsData = (firestoreData) => {
  const sortedData = firestoreData.sort((a, b) => {
    const nameA = a.koreanName || '';
    const nameB = b.koreanName || '';
    return nameA.localeCompare(nameB, 'ko');
  });

  const mergedData = sortedData.reduce((acc, breed) => {
    acc[breed.englishName.toLowerCase()] = breed;
    return acc;
  }, {});

  return mergedData;
};

// Firebase Storage에서 이미지 가져오기
const fetchImagesFromStorage = async (breedName) => {
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
const fetchAndStoreBreeds = async () => {
  const firestoreData = await fetchBreedsFromFirestore();
  const mergedData = mergeBreedsData(firestoreData);
  if (typeof window !== 'undefined') {
    localStorage.setItem('breedsData', JSON.stringify(mergedData));
  }
  return mergedData;
};

// 로컬 스토리지에서 breeds 데이터 가져오기 (클라이언트 측에서만 실행)
const getBreedsData = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('breedsData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

module.exports = {
  fetchAndStoreBreeds,
  getBreedsData,
  fetchImagesFromStorage,
  fetchBreedsFromFirestore,
  mergeBreedsData
};
