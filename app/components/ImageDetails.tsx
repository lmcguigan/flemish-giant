"use client";

import { ColorSelection } from "./ColorSelection";
import { AicArtworkResultMapped } from "@/lib/features/aic/aicApiSlice";

interface Props {
    magnifiedImage: AicArtworkResultMapped
}

export const ImageDetails = ({magnifiedImage}: Props) => {
    return (
        <div className="flex flex-row pb-5">
            <div className="flex flex-col">
                <div className="flex max-h-[400px]">
                    <img src={magnifiedImage.imageUrl} alt={magnifiedImage.title} style={{height: '100%', width: 'auto', objectFit: 'contain'}}/>
                </div>
                <h3 className="text-2xl whitespace-pre-wrap"><span className="font-bold">{magnifiedImage.title}</span>, {magnifiedImage.date_display}</h3>
                <h3 className="whitespace-pre-wrap">{`${magnifiedImage.artist_display}`}</h3>
            </div>
            <ColorSelection data={magnifiedImage}/>
        </div>
    )
};
