import { populateAchievements } from "./achievements";
import { populateChallenges } from "./challenge";
import { populateSections } from "./section";

export async function populateDB() {
    await populateAchievements();
    await populateChallenges();
    await populateSections();
}