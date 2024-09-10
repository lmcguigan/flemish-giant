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

export const aicApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "https://api.artic.edu/api/v1/artworks/search"}),
    reducerPath: "aicApi",
    tagTypes: ["aicArtwork"],
    endpoints: (build) => ({
        getRandomArtWork: build.query<AicArtworkResultMapped[], number>({
            query: (date_start) => ({
                url: `?params=${encodeURIComponent(JSON.stringify({
                    "resources": "artworks",
                    "fields": [
                        "id",
                        "image_id",
                        "title",
                        "date_display",
                        "artist_display",
                        "color",
                        "colorfulness",
                        "subject_titles",
                        "date_start",
                    ], 
                    "boost": "false",
                    "limit": 6,
                    "query": {
                        "function_score": {
                            "query": {
                                "bool": {
                                    "filter": [ 
                                            { "term":  { "is_public_domain": true }},
                                            { "term":  { "artwork_type_id": 1 }},
                                            { "term":  { "is_zoomable": true }},
                                            { "range": { "date_start": {"gte": date_start, "lte": date_start + 100}}},
                                            { "range": { "colorfulness": { "gte": 10 }}}
                                        ]
                                },
                            },
                            "random_score": { "seed": Math.floor(Date.now()/1000) },
                            "boost_mode": "replace"
                        },
                    },
                }))}`,
                headers: {'AIC-User-Agent' : 'art-colors-test-app (lucy.mcguigan@gmail.com)'}
            }),
            transformResponse: (response: AicSearchReturn) => {
                return (response.data.map(res => {
                    return {
                        ...res,
                        colorHex: res.color ? `#${convert.hsl.hex([res.color.h, res.color.s, res.color.l])}` : undefined,
                        imageUrl: `${response.config.iiif_url}/${res.image_id}/full/843,/0/default.jpg`
                    }
                }))
            }
        }),
    })
})

export const { useGetRandomArtWorkQuery } = aicApiSlice;