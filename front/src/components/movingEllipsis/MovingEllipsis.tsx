import { useEffect, useState } from "react";

type Props = {
    delayTimeMs?: number;
    minEllipsisCount?: number;
    maxEllipsisCount?: number;
    ellipsisChar?: string;
};

const DEFAULT_MAX_ELLIPSIS_COUNT = 3;
const DEFAULT_MIN_ELLIPSIS_COUNT = 0;
const DEFAULT_ELLIPSIS_DELAY_MS = 300;
const DEFAULT_ELLIPSIS_CHARACTER = ".";

function MovingEllipsis({
    delayTimeMs = DEFAULT_ELLIPSIS_DELAY_MS,
    minEllipsisCount = DEFAULT_MIN_ELLIPSIS_COUNT,
    maxEllipsisCount = DEFAULT_MAX_ELLIPSIS_COUNT,
    ellipsisChar = DEFAULT_ELLIPSIS_CHARACTER,
}: Props) {
    const [ellipisCount, setEllipsisCount] = useState<number>(minEllipsisCount);
    useEffect(() => {
        const timerId = setInterval(() => {
            if (ellipisCount >= maxEllipsisCount) {
                setEllipsisCount(minEllipsisCount);
            } else {
                setEllipsisCount((prevCount) => prevCount + 1);
            }
        }, delayTimeMs);
        return () => clearInterval(timerId);
    });
    const ellipsis = ellipsisChar.repeat(ellipisCount);
    return <>{ellipsis}</>;
}

export default MovingEllipsis;
