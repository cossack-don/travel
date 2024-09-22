const test = process.env;
const {TG_BOT_TOKEN,TG_CHAT_ID} = process.env;

console.log('message TEST', test?.TG_BOT_TOKEN,test?.TG_CHAT_ID);

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

const exit = (message) => {
    console.log(message);
    process.exit(1);
};

const useArgv = (keys) => {
    const [, , , ...args] = process.argv;
    return Object.fromEntries(
        keys.map((k, i) => {
            args[i] || exit(`${k} is null, check args`);
            return [k, args[i]];
        })
    );
};

const onNewMergeRequest = async () => {
    const args = useArgv([
        "author",
        "mergeRequestLink",
        "title",
        "repoName",
        "repoUrl",
    ]);

    const author = args.author.replaceAll("<", "").replaceAll(">", "");
    const title = args.title.replace(
        /([A-Z]+)\-[0-9]+/gm,
        (b) => `<a href="https://jira.mtt.ru:8443/browse/${b}">${b}</a>`
    );

    console.log(args,'ARGS')
    // await sendMessage(
    //     `📣 New MR: [<a href="${args.repoUrl}">${args.repoName}</a>] ${title}, от ${author}. <a href="${args.mergeRequestLink}">[open]</a>`
    // );
};

const [, , event] = process.argv;

const eventHandlersMap = {
    newMr: onNewMergeRequest,
};

(async () => await eventHandlersMap[event]())();

// sendMessage(
//     `📣 New MR: [<a href="#">test msg link</a>]`
// );
// const onNewMergeRequest = async () => {
//     await sendMessage(
//         `📣 New MR: [<a href="#">test msg link</a>]`
//     );
// };
//
// const [, , event] = process.argv;
//
// const eventHandlersMap = {
//     newMr: onNewMergeRequest,
// };
// console.log(event,'event')
// (async () => await eventHandlersMap[event]())();