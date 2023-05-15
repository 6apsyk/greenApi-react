const baseUrl = "https://api.green-api.com";

export const greenApi = {
    login: async (id, token) => {
        try {
            const url = `${baseUrl}/waInstance${id}/getStateInstance/${token}`;
            const response = await fetch(url, {
                method: "GET",
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error.message);
        }
    },

    // onHistory: async () => {
    //     const url = `https://api.green-api.com/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`;
    //     const {data} = await axios({
    //         url,
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: {
    //             chatId: `${contactId}@c.us`,
    //             count: 10,
    //         },
    //     });
    //     console.log("History", data);

    //     const url2 = `https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`;
    //     const response = await axios({
    //         url: url2,
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: {
    //             chatId: `${contactId}@c.us`,
    //         },
    //     });
    //     console.log("INFO", response);
    // };
};
