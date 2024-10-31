export interface SurveyData {
    // User Information
    age: string; // 배열 대신 문자열
    incomeSource: string;
    housingType: string;
    indoorSpace: string;
    movingPossibility: string;
    petDiscussion: string;
    familyDiscussion: string;
    hasChildren: string;
    otherPets: string;
    otherDogs: string;
    neighborHasPets: string;
  
    // Lifestyle
    dogSpentTime: string;
    familyTime: string;
    noiseLevel: string;
    aloneTime: string;
    musicPreference: string;
    aloneTimeSolution: string;
    cleaningFrequency: string;
    walkingPark: string;
    walkingFrequency: string;
    cookingPreference: string;
  
    // Dog Preferences
    dogSize: string;
    monthlyExpenses: string;
    budgetForAdoption: string;
    monthlyExpense: string;
    obedienceLevel: string;
    strangerCaution: string;
    interactionFrequency: string;
    trainingSpeed: string;
    patienceLevel: string;
    firstTimeOwner: string;
    interactionImportance: string;
    allergyConcern: string;
    droolingConcern: string;
    sheddingTolerance: string;
    bathingFrequency: string;
    groomingFrequency: string;
    coatPreference: string;
    coatLength: string;
    barkingPreference: string;
    playfulnessPreference: string;
    trainingExperience: string;

      // 새 항목 추가
  priority1?: string;
  priority2?: string;
  priority3?: string;
  }