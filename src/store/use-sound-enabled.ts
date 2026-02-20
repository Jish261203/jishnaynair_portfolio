
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SoundState = {
    isSoundEnabled: boolean;
    toggleSoundEnabled: () => void;
};


export const useIsSoundEnabled = create<SoundState>()(
    persist(
        (set, get) => ({
            isSoundEnabled: true,
            toggleSoundEnabled: () => set({ isSoundEnabled: !get().isSoundEnabled }),
        }),
        {
            name: 'sound-enabled'
        }
    )
);