import { createSlice } from '@reduxjs/toolkit';

export const zoom = createSlice({
    name: 'zoom',
    initialState: {
        zoom: {},
    },
    reducers: {
        getZoom(state, action) {
            state.zoom = action.payload;
        },
        deleteZoom(state, action) {
            state.zoom = {};
        },
        updateZoom(state, action) {
            const newZoomMembers = action.payload.members;

            // Kết hợp members cũ với members mới và loại bỏ trùng lặp
            const updatedMembers = Array.from(new Set([...state.members, ...newZoomMembers]));

            // Trả về state mới với members được cập nhật
            return {
                ...state,
                members: updatedMembers,
            };
        },
    },
});
