

const initState = {

}

export const profileReducer = (state = initState, action:ProfileActionType): typeof initState => {
    switch (action.type) {
        case '': {
            return {
                ...state,

            }
        }
        default: return state
    }
}
type ProfileActionType ={
    type: ''

}
export const profileAC = ( ): ProfileActionType => ({ type: ''})