
const {TG_BOT_TOKEN,TG_CHAT_ID, IS_CREATE_PULL_REQUEST, IS_MERGED_PULL_REQUEST, GITHUB_ACTOR} = process.env;

const isCreatePullRequest = Boolean(IS_CREATE_PULL_REQUEST)
const isMergedPullRequest = Boolean(IS_MERGED_PULL_REQUEST)

console.log('message TEST',TG_BOT_TOKEN,TG_CHAT_ID, typeof IS_CREATE_PULL_REQUEST, typeof IS_MERGED_PULL_REQUEST, GITHUB_ACTOR);
const g = process
console.log('all-list-process-logs',g)

const sendMessage = async (message) => {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            parse_mode: "html",
            text: message,
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((v) => v.json())
        .then(console.log, console.log);
};


sendMessage(
    `📣 New MR: [<a href="https://github.com/cossack-don/travel">test-link</a>] isStatus-test, от 'name-test'. <a href="#">[open]</a>`
);
// const onNewMergeRequest = async () => {
//
//     await sendMessage(
//         `📣 New MR: [<a href="#">test msg link</a>]` );
//
//     //Пример сообщения PR merged success in dev branch - author-nickName - url Repo
//
// };

// const [, , event] = process.argv;
//
// const eventHandlersMap = {
//     newMr: onNewMergeRequest,
// };
// console.log(event,'event')
// (async () => await eventHandlersMap[event]())();