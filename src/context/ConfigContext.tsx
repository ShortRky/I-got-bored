import { createContext, useContext, useState, ReactNode } from 'react'

export interface Config {
  names: {
    yourName: string
    partnerName: string
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  messages: Array<{
    section: string
    text: string
  }>
  photos: Array<{
    url: string
    caption: string
  }>
  music: {
    url: string
    autoPlay: boolean
    title: string
  }
  timing: {
    scrollSpeed: number
    particleCount: number
    animationDuration: number
  }
}

interface ConfigContextType {
  config: Config
  updateConfig: (updates: Partial<Config>) => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ 
  children, 
  defaultConfig 
}: { 
  children: ReactNode
  defaultConfig: Config 
}) {
  const [config, setConfig] = useState<Config>(defaultConfig)

  const updateConfig = (updates: Partial<Config>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
