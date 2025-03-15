import { useEffect, useState } from "react";

type Props = {
    delayTimeMs?: number;
    length?: number;
    includeZero?: boolean;
};

function MovingEllipsis({
    delayTimeMs = 300,
    length = 3,
    includeZero = true,
}: Props) {
    const [ellipisCount, setEllipsisCount] = useState<number>(
        includeZero ? 0 : 1
    );
    useEffect(() => {
        const timerId = setInterval(() => {
            if (ellipisCount >= length) {
                setEllipsisCount(includeZero ? 0 : 1);
            } else {
                setEllipsisCount((prevCount) => prevCount + 1);
            }
        }, delayTimeMs);
        return () => clearInterval(timerId);
    });
    const ellipsis = ".".repeat(ellipisCount);
    return <>{ellipsis}</>;
}

export default MovingEllipsis;
