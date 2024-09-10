import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import convert from 'color-convert'

export interface AicArtworkResult {
    date_display: string
    id: number
    image_id: string
    title: string
    artist_display: string
    color: {
        h: number
        s: number
        l: number
        percentage: number
        population: number
    }
    colorfulness: number
}
export interface AicArtworkResultMapped extends AicArtworkResult{
    imageUrl: string
    colorHex: string | undefined
}
interface AicSearchReturn {
    data: AicArtworkResult[],
    config: {
        iiif_url: string
        website_url: string
    }
}
