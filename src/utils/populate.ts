import { populateAchievements } from "./achievements";
import { populateChallenges } from "./challenge";
import { populateUserAchievements } from "./userAchievements";

export async function populateDB() {
    await populateAchievements();
    await populateUserAchievements();
    await populateChallenges();
}