import {useState, useEffect} from "react";


const useProgress = (percent) => {
    const [progress, setProgress] = useState(0);

    const updateProgress = () => {
       setProgress(progress => progress + 1);
    }

    const resetProgress = () => {
        setProgress(progress => 0);
    }

    useEffect(() => {
        if (progress < percent) {
            setTimeout(updateProgress, 15);
        }
    },
    [progress, percent]);

    return [progress, resetProgress];
}

export default useProgress;