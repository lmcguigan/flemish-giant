import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type RGBArray = [number, number, number]

export interface PaletteRequestBody {
    model: string
    input: Array<RGBArray | "N">
}
export interface PaletteResult {
    result: RGBArray[]
}