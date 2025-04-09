export const createUsername = (username: string) => {
    const usernameArr = username.split(" ");
    return usernameArr.join("-").toLocaleLowerCase();
}