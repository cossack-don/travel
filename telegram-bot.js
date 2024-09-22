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


const onNewMergeRequest = async () => {
    await sendMessage(
        `📣 New MR: [<a href="#">test msg link</a>]`
    );
};

const [, , event] = process.argv;

const eventHandlersMap = {
    newMr: onNewMergeRequest,
};

(async () => await eventHandlersMap[event]())();