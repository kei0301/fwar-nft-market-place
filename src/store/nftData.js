import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    NFT_Images: [],
    NewFlag: true
};

const nftReducer = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        SetNfts: (state, action) => {
            state.NFT_Images = [];
            for (let index = 0; index < action.payload.length; index++) {
                const element = action.payload[index];
                state.NFT_Images.push(element);
            }
        },
        FlagT: (state) => {
            state.NewFlag = true;
        },
        FlagF: (state) => {
            state.NewFlag = false;
        }
    }
});

const { reducer, actions } = nftReducer;

export const { SetNfts, FlagT, FlagF, UpDate } = actions;

export default reducer;
