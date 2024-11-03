import { populateAchievements } from "./achievements";
import { populateChallenges } from "./challenge";

export async function populateDB() {
    await populateAchievements();
    await populateChallenges();
}