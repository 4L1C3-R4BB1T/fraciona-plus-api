import { populateAchievements } from "./achievements";
import { populateUserAchievements } from "./userAchievements";

export async function populateDB() {
    await populateAchievements();
    // await populateUserAchievements();
}