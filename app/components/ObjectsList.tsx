"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageDetails } from "./ImageDetails";
import { AicArtworkResultMapped, useGetRandomArtWorkQuery } from "@/lib/features/aic/aicApiSlice";
import { Spinner } from "./Spinner";

const dateRanges = [{display: '17th c.', value: 1600}, {display: '18th c.', value: 1700}, {display: '19th c.', value: 1800}, {display: '20th c.', value: 1900}]

export const ObjectsList = () => {
    const [magnifiedImage, setMagnifiedImage] = useState<AicArtworkResultMapped | undefined>()
    const [dateRange, setDateRange] = useState<{display: string, value: number}>(dateRanges[Math.floor(Math.random() * dateRanges.length)])
    const {data, isError, isLoading, isSuccess} = useGetRandomArtWorkQuery(dateRange?.value)
    const pickThumb = (e: any) => {
        setMagnifiedImage(e);
    }
    useEffect(() => {
        console.log('data', data);
        if(data && data[0]){
            setMagnifiedImage(data[0]);
        }
    }, [data])
    if(isError){
        return (
            <div className="flex flex-1 flex-col md:pr-5 items-center justify-center min-w-[75vw] min-h-[60vh]">
                <h1 className="text-2xl">There was an error loading the artworks. Please try again later. </h1>
            </div>
        );
    }
    if (isLoading) {
        return (
          <div className="flex flex-1 flex-col md:pr-5 items-center justify-center min-w-[75vw] min-h-[60vh]">
            <h1 className="text-2xl mb-6">Loading artworks...</h1>
            <Spinner/>
          </div>
        );
    }
    
    if (isSuccess) {
        return (
            <div className="flex flex-col md:pr-5 min-w-[75vw]">
                {magnifiedImage && <ImageDetails magnifiedImage={magnifiedImage}/>}
                <div className="flex gap-2">
                {dateRanges.map((e, i) => {
                    return (
                        <button key={`date-range-btn-${i}`} className={`rounded-t-md ${dateRange?.display === e.display ? 'bg-stone-500 text-white' : 'bg-stone-700 text-rose-500'}`} onClick={() => setDateRange(e)}>{e.display}</button>
                    )
                })}
                </div>
                <div className="flex gap-4 justify-between flex-wrap border-stone-500 border-2 p-5" >
                    {data && data.map((e) => {
                        return (
                            <Image 
                                height={100}
                                width={100}
                                style={{cursor: 'pointer', objectFit: 'cover', height: 100, width: 100, borderWidth: 3, marginBottom: 10, borderStyle: 'solid', borderColor: magnifiedImage?.id === e.id ? '#8b5cf6' : 'white'}}
                                src={e.imageUrl}
                                alt={e.title}
                                onClick={() => pickThumb(e)}
                                key={`object-${e.id}`}
                                priority={true}
                                loading={"eager"}
                            />
                        )
                    })}
                </div>
            <span>Artwork data and images provided by the <a className="text-rose-500 underline" href="https://www.artic.edu/open-access/public-api">Art Institute of Chicago's Open Access Public API.</a></span>
            <span className="text-xs">This project is not affiliated with the Art Institute of Chicago.</span>
            </div>
        );
    }
    return null;
};
