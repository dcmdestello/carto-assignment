import { createContext, useContext, useState } from "react";

const DnDContext = createContext(["" as string, (_: string) => {}] as const);

type DnDProviderProps = {
  children: React.ReactNode;
};

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [type, setType] = useState<string>("");

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  return useContext(DnDContext);
};
