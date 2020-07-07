const { getReactionMessage } = require('../../modules/utils.js');
const { setToRole } = require('../../modules/UserHelpers.js');
module.exports = async (client, messageReaction, user) => {
    if (user.bot) return;
    const reactionMessage = await getReactionMessage(
        client,
        messageReaction.message.id
    );

    if (!reactionMessage) return;

    if (reactionMessage.reactions)
        return await roleAssignment(
            client,
            reactionMessage,
            messageReaction,
            user
        );
};

const roleAssignment = async (
    client,
    reactionMessage,
    messageReaction,
    user
) => {
    const roleId = reactionMessage.reactions.get(messageReaction.emoji.name);
    if (!roleId) return;

    const member = await client.guilds.cache
        .get(client.guildId)
        .members.fetch(user.id);

    return setToRole(member, roleId, null, false);
};