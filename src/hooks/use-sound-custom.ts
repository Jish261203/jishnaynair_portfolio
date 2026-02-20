import useSound from "use-sound";
import { useIsSoundEnabled } from "@/store/use-sound-enabled";


export type SpriteMap = {
    [key: string]: [number, number];
};


export type HookOptions<T = any> = T & {
    id?: string;
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: SpriteMap;
    onload?: () => void;
};



export function useSoundCustom<T = any>(
    src: string | string[],
    {
        id,
        volume = 1,
        playbackRate = 1,
        interrupt = false,
        onload,
        ...delegated
    }: HookOptions<T> = {} as HookOptions
) {
    const { isSoundEnabled } = useIsSoundEnabled();

    return useSound(src, {
        id,
        volume,
        playbackRate,
        interrupt,
        onload,
        soundEnabled: isSoundEnabled,
        ...delegated
    });
};
