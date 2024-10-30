import achievementsModel from "../infra/models/achievements.model";
import userAchievementsModel from '../infra/models/user_achievements.model';

export async function populateUserAchievements() {
    try {
        const count = await userAchievementsModel.countDocuments({});
        if (count === 0) {
            const achievement = await achievementsModel.findOne({ title: "Grande Amigo" });
            if (achievement) {
                await userAchievementsModel.create({
                    userId: "xVcG3vhNs1azaNxgvkflxM7lHW32",
                    achievementId: achievement._id
                });
                console.log("Dados populados com sucesso!");
            } else {
                console.log("Achievement não encontrado.");
            }
        } else {
            console.log("A collection user_achievements já possui dados.");
        }
    } catch (err) {
        console.error("Erro ao popular a collection:", err);
    }
}