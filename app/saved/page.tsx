"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { deletePalette } from "@/lib/features/savedColorPalettes/savedColorPalettesSlice";

export default function SavedPage() {
  const dispatch = useAppDispatch()
  const palettes = useAppSelector((state: RootState) => state.savedColorPalettes.palettes)
  useEffect(() => {
    console.log('Palettes in the Redux store', palettes);
  }, [palettes]);
  const deleteColorPalette = (index: number) => {
    dispatch(deletePalette(index));
  }
    return (
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Saved Palettes</h1>
          <hr className="my-5"></hr>
          <div className="flex flex-row flex-wrap gap-5">
          {palettes.map((palette, i) => {
            return (
            <div key={`palette-${i}`} className="flex flex-col justify-between flex-none p-5 w-56 bg-stone-600 space-y-4">
              <p className="text-xl">{palette.name}</p>
              {palette.colors.map((color, ci) => {
                return (
                <div key={`palette-${i}-color-${ci}`} className="flex flex-row justify-between items-center">
                  <div className="border border-white shadow-md" style={{width: 30, height: 30, backgroundColor: color.hex}}></div>
                  <span>{color.hex}</span>
                </div>)
              })}
              <button className="rounded-xl bg-rose-500" onClick={() => deleteColorPalette(i)}>Delete palette</button>
            </div>)
          })}
          </div>
        </div>
    );
  }
  