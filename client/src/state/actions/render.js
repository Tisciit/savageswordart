export const CHANGERENDER = "CHANGE_RENDER";

export const changerender = (render) => {
    return {
        type: CHANGERENDER,
        payload: render
    }
}