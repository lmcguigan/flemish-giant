"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { deletePalette } from "@/lib/features/savedColorPalettes/savedColorPalettesSlice";

export default function SavedPage() {
  const dispatch = useAppDispatch()
  const palettes = useAppSelector((state: RootState) => state.savedColorPalettes.palettes)
  useEffect(() => {
    console.log(palettes);
  }, [palettes]);
  const deleteColorPalette = (index: number) => {
    dispatch(deletePalette(index));
  }
    return (
        <div className="flex flex-col">
          <h1>My Saved Palettes</h1>
          <div className="flex flex-row flex-wrap">
          {palettes.map((palette, i) => {
            return (
            <div key={`palette-${i}`} className="flex flex-col justify-between flex-none p-5 w-56 bg-stone-600 space-y-4">
              <span>{palette.name}</span>
              {palette.colors.map((color, ci) => {
                return (
                <div key={`palette-${i}-color-${ci}`} className="flex flex-row justify-between items-center">
                  <div className="border-1 border-white shadow-md" style={{width: 30, height: 30, backgroundColor: color.hex}}></div>
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
  