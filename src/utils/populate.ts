import { populateAchievements } from "./achievements";
import { populateChallenges } from "./challenge";
import { populateSections } from "./section";
import { populateUserAchievements } from "./userAchievements";

export async function populateDB() {
    await populateAchievements();
    await populateUserAchievements();
    await populateChallenges();
    await populateSections();
}