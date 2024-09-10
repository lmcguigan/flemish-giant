"use client";

import { AicArtworkResultMapped } from "@/lib/features/aic/aicApiSlice";
import { addColor } from "@/lib/features/colorPalette/colorPaletteSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useState } from "react";
import {EyeDropperIcon} from '@heroicons/react/24/solid'
import useEyeDropper from "use-eye-dropper";
import convert from 'color-convert'
import { RootState } from "@/lib/store";

interface Props {
    data: AicArtworkResultMapped
}

export const ColorSelection = ({ data }: Props) => {
    const dispatch = useAppDispatch()
    const [pickedColor, setPickedColor] = useState<string | undefined>(undefined)
    const currentPaletteColors = useAppSelector((state: RootState) => state.colorPalette.colors)
    const [pickerOpen, setPickerOpen] = useState<boolean>(false)
    const { open } = useEyeDropper()
    const pickColor = useCallback(() => {
        const openPicker = async () => {
          setPickerOpen(true)
          try {
            const color = await open()
            setPickedColor(color.sRGBHex)
            setPickerOpen(false)
          } catch (e: any) {
            if (!e.canceled) {
                setPickerOpen(false)
            }
          }
        }
        openPicker()
      }, [open])
    const addDominantColorToPalette = (colorHex: string) => {
        const rgb = convert.hex.rgb(colorHex.replace('#', ''))
        dispatch(addColor({hex: colorHex, rgb}))
    }
    const addSelectedColorToPalette = () => {
        if(pickedColor){
            const rgb = convert.hex.rgb(pickedColor.replace('#', ''))
            dispatch(addColor({hex: pickedColor, rgb}))
        }
    }
    const isButtonDisabled = (colorHex: string): boolean => {
        if(currentPaletteColors.find((e) => e.hex === colorHex) !== undefined){
            return true
        }
        return false
    }
    return (
        <div className="flex flex-col pl-5">
            <div className="border-2 border-stone-600 flex w-72 h-full flex-col p-5 justify-between">
                    <div>
                        <h4 className="text-lg">Pick colors from this artwork</h4>   
                        <hr className="mt-2 mb-5"></hr>
                        <p>Dominant Object Color</p>
                        <p className="text-xs mb-3">{"(provided by AIC API data)"}</p>
                        {data.colorHex && <div className="flex flex-row justify-between items-center">
                            <div className="size-16 border border-white" style={{backgroundColor: data.colorHex}} />
                            <button className={`border-2 rounded-xl ${isButtonDisabled(data.colorHex) ? 'border-stone-700 text-stone-700' : 'border-stone-600 text-white'}`} disabled={isButtonDisabled(data.colorHex)} onClick={() => addDominantColorToPalette(data.colorHex!)}>Add to palette</button>
                        </div>}
                    </div>
                    {pickedColor && 
                    <div>
                        <p className="mb-3">Selected color preview</p>
                        <div className="flex flex-row justify-between items-center">
                            <div className="size-16 border border-white" style={{backgroundColor: pickedColor}}></div>
                            <button className={`border-2 rounded-xl ${isButtonDisabled(pickedColor) ? 'border-stone-700 text-stone-700' : 'border-stone-600 text-white'}`} disabled={isButtonDisabled(pickedColor)} onClick={addSelectedColorToPalette}>Add to palette</button>
                        </div>
                    </div>}
                    {<button className={`flex justify-evenly border-2 rounded-xl ${pickerOpen ? 'border-stone-700 text-stone-700' : 'border-stone-600 text-white'}`} disabled={pickerOpen} onClick={pickColor}>
                        <EyeDropperIcon className="size-6"></EyeDropperIcon>Eyedropper</button>}
            </div>
        </div>
    )
};
