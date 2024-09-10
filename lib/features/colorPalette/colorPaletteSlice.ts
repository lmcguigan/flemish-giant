import { createSlice } from '@reduxjs/toolkit'
import convert from 'color-convert'
import { savedPalettesSlice } from '../savedColorPalettes/savedColorPalettesSlice'

export interface PaletteColor {
    hex: string
    rgb: [number, number, number]
}

export interface ColorPaletteState {
    name: string
    colors: PaletteColor[]
}

const initialState = {name: 'My Color Palette', colors: []}

export const colorPaletteSlice = createSlice({
    name: 'colorPalette',
    initialState: initialState satisfies ColorPaletteState as ColorPaletteState,
    reducers: (create) => ({
        addColor: create.reducer<PaletteColor>((state, action) => {
            state.colors.push(action.payload)
        }),
        deleteColor: create.reducer<number>((state, action) => {
            state.colors.splice(action.payload, 1)
        }),
        rename: create.reducer<string>((state, action) => {
            state.name = action.payload
        })
    }),
    extraReducers: (builder) => {
        builder.addCase(savedPalettesSlice.actions.addPalette, 
            (state, {payload}) => {
                state.name = initialState.name
                state.colors = initialState.colors
            })
    },
})

export const {addColor, deleteColor, rename} = colorPaletteSlice.actions;