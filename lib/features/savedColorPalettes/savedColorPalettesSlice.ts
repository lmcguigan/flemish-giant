import { createSlice } from '@reduxjs/toolkit'
import { ColorPaletteState } from '../colorPalette/colorPaletteSlice'

export interface SavedPalettesState {
    palettes: ColorPaletteState[]
}

export const savedPalettesSlice = createSlice({
    name: 'savedColorPalettes',
    initialState: {palettes: []} satisfies SavedPalettesState as SavedPalettesState,
    reducers: (create) => ({
        addPalette: create.reducer<ColorPaletteState>((state, action) => {
            state.palettes.push(action.payload)
        }),
        deletePalette: create.reducer<number>((state, action) => {
            state.palettes.splice(action.payload, 1)
        }),
    })
})

export const {addPalette, deletePalette } = savedPalettesSlice.actions;