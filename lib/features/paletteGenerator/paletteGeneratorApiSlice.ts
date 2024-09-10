import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type RGBArray = [number, number, number]

export interface PaletteRequestBody {
    model: string
    input: Array<RGBArray | "N">
}
export interface PaletteResult {
    result: RGBArray[]
}

export const paletteGeneratorApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://colormind.io/"}),
    reducerPath: "paletteGeneratorApi",
    tagTypes: ["paletteGenerator"],
    endpoints: (build) => ({
        getPalette: build.query<PaletteResult, PaletteRequestBody>({
            query: (body: PaletteRequestBody) => ({
                url: 'api/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                body: JSON.stringify(body)
            })
        }),
        getModelsList: build.query({
            query: () => ({
                url: 'list/'
            })
        })
    })
})

export const { useLazyGetPaletteQuery } = paletteGeneratorApiSlice;