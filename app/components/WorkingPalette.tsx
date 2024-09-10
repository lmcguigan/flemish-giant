"use client";

import { deleteColor, rename } from "@/lib/features/colorPalette/colorPaletteSlice";
import { RGBArray, useLazyGetPaletteQuery } from "@/lib/features/paletteGenerator/paletteGeneratorApiSlice";
import { addPalette } from "@/lib/features/savedColorPalettes/savedColorPalettesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {TrashIcon} from '@heroicons/react/24/solid'
import { useEffect } from "react";
import { Spinner } from "./Spinner";

export const WorkingPalette = () => {
    const dispatch = useAppDispatch()
    const paletteName = useAppSelector((state: RootState) => state.colorPalette.name)
    const colors = useAppSelector((state: RootState) => state.colorPalette.colors)
    const [trigger, result, last] = useLazyGetPaletteQuery()
    const getAdditionalColors = () => {
        // map colors to input format
        const mappedColors = [...colors].map((color) => color.rgb) as Array<RGBArray | "N">
        // add "N" for every unused space
        const remaining = 5 - colors.length
        const blankFields = Array(remaining).fill("N") as Array<"N">
        const input = mappedColors.concat(blankFields)
        trigger({model: 'default', input})
    }
    useEffect(() => {
        console.log('Result from calling the Colormind API', result)
    }, [result])
    useEffect(() => {
        console.log('Colors in Redux store', colors)
    }, [colors])
    const addColorPalette = () => {
        dispatch(addPalette({name: paletteName, colors}))
    }
        return (
            <div className="flex flex-col justify-between flex-none p-5 w-56 bg-stone-600">
                <div className="space-y-4">
                <h2 className="text-lg">Working Palette</h2>
                <div>
                    <span className="uppercase text-xs">Palette Name</span>
                    <input className="w-full text-black border-2 border-rose-500 rounded-md pl-2 py-1" value={paletteName} onChange={(e) => dispatch(rename(e.target.value))}></input>   
                </div>
                {result.isLoading ? <Spinner/> : 
                <>
                    {colors.map((color, index) => {
                        return (
                            <div key={`color-${index}`} className="flex flex-row justify-between items-center">
                                <div className="border-1 border-white shadow-md" style={{width: 30, height: 30, backgroundColor: color.hex}}></div>
                                <span>{color.hex}</span>
                                <button className="border-2 border-rose-500 rounded-full" onClick={() => deleteColor(index)}>
                                    <TrashIcon className="size-6"></TrashIcon>
                                </button>
                            </div>
                        )
                    })}
                </>
                }
                </div>
                <div className="flex flex-col space-y-4">
                    {(colors.length < 5 && colors.length > 0) && 
                    <>
                    <span>Generator powered by the <a href="http://colormind.io/api-access/" className="text-rose-500 underline">Colormind API</a></span>
                    <button className="border-2 border-rose-500 rounded-xl" onClick={getAdditionalColors}>Generate {5 - colors.length} more colors</button>
                    </>}
                    <button className="rounded-xl bg-rose-500" onClick={addColorPalette}>Save palette</button>
                </div>
            </div>
        );
};