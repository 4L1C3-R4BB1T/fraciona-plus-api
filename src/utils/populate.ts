import { populateAchievements } from "./achievements";
import { populateUserAchievements } from "./userAchievements";

export function populateDB() {
    populateAchievements();
    populateUserAchievements();
}