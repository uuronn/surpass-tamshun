'use client'
import Home from '@/components/home/Home'
import Training from '@/components/training/Training'
import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

export type Scene = 'home' | 'battle' | 'training'

const SceneContext = createContext<{
  scene: Scene
  setScene:(scene: Scene) => void
}>({
  scene: 'home',
  setScene: () => {},
})

export function useSceneContext() {
  return useContext(SceneContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<Scene>('home')
  return <SceneContext.Provider value={{ scene, setScene }}></SceneContext.Provider>
}
