import {useEffect, useState, useCallback} from "react";


const useProgress = () => {
    const [percent, setPercent] = useState(0);
    const [progress,  setProgress] = useState(0);

    const updateProgress = () => {
        setProgress(progress => progress + 1);
    }

    const resetProgress = () => {
        setProgress(progress => 0);
    }

    const setTicks = useCallback((done, total) => {
        setPercent(Math.round(done / total * 100));
    }, []);

    useEffect(() => {
            if (progress < percent) {
                setTimeout(updateProgress, 15);
            }
        },
        [progress, percent]);

    return [progress, percent, {setTicks, resetProgress}];
}

export default useProgress;