const {TG_BOT_TOKEN,TG_CHAT_ID, IS_CREATE_PULL_REQUEST, IS_MERGED_PULL_REQUEST, GITHUB_ACTOR} = process.env;

const isCreatePullRequest = Boolean(IS_CREATE_PULL_REQUEST)
const isMergedPullRequest = Boolean(IS_MERGED_PULL_REQUEST)

const listEvents = {
    MERGED_PR_TO_DEV_BRANCH:{
        bodyMessage:`
                    📣 Merged PR in dev branch от ${GITHUB_ACTOR} в проект [<a href="https://github.com/cossack-don/travel">CheckList</a>]
                    `
    },
    OPEN_PR:{
        bodyMessage:`
                     📣 New PR in dev branch от ${GITHUB_ACTOR} в проект [<a href="https://github.com/cossack-don/travel">CheckList</a>]
                    `
    }
}

const sendMessage = async (message) => {
    if(message === null) return

    const URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`
    const options = {
        method: "POST",
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            parse_mode: "html",
            text: message,
        }),
        headers: { "Content-Type": "application/json" },
    }

   const response = await fetch(URL, options)
   const responseParse = await response.json()
   console.log(responseParse)
};

// Push Message in telegram
isCreatePullRequest ? sendMessage(listEvents?.OPEN_PR?.bodyMessage): null
isMergedPullRequest ? sendMessage(listEvents?.MERGED_PR_TO_DEV_BRANCH?.bodyMessage): null
