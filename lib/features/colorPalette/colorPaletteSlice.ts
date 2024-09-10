import { createSlice } from '@reduxjs/toolkit'
import { paletteGeneratorApiSlice } from '../paletteGenerator/paletteGeneratorApiSlice'
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
        builder.addMatcher(paletteGeneratorApiSlice.endpoints.getPalette.matchFulfilled,
            (state, {payload}) => {
                const colorsMapped: PaletteColor[] = payload.result.map((colorArray) => ({hex: `#${convert.rgb.hex(colorArray)}`, rgb: colorArray}))
                console.log('getPalette match fulfilled', state, payload, colorsMapped)
                state.colors = colorsMapped
            }
        )
    },
})

export const {addColor, deleteColor, rename} = colorPaletteSlice.actions;