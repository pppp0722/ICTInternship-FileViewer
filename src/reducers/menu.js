export const HOME = "MENU/HOME";
export const CHROMAKEY = "MENU/CHROMAKEY";
export const OVERLAY = "MENU/OVERLAY";
export const ANIMATION = "MENU/ANIMATION";
export const MEME = "MENU/MEME";
export const TRANSITION_MOTION = "MENU/TRANSITION_MOTION";
export const BGM = "MENU/BGM";
export const SHOCKWAVE_INKMAT = "MENU/SHOCKWAVE_INKMAT";
export const MR = "MENU/MR";

export const toHome = menu => ({type: HOME, menu});


const initialState = {
    menu: 'home',
};

const menu = (state = initialState, action) => {
    switch (action.type){
        case HOME:
            return{
                ...state,
                menu: 'home'
            };

        case CHROMAKEY:
            return{
                ...state,
                menu: 'chromakey'
        };

        case OVERLAY:
            return{
                ...state,
                menu: 'overlay'
            };

        case ANIMATION:
            return{
                ...state,
                menu: 'animation'
            };

        case MEME:
            return{
                ...state,
                menu: 'meme'
            };

        case TRANSITION_MOTION:
            return{
                ...state,
                menu: 'transition_motion'
            };

        case BGM:
            return{
                ...state,
                menu: 'bgm'
            };

        case SHOCKWAVE_INKMAT:
            return{
                ...state,
                menu: 'shockwave_inkmat'
            };

        case MR:
            return{
                ...state,
                menu: 'mr'
            };
        
        default:
            return state;
    }
}

export default menu;