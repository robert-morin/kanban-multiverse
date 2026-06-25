import { useState } from 'react'

// Todo column Ids?
export function useTestHook() {
    const [value, setValue] = useState(0);

    const increment = () => {
        setValue(prev => prev + 1);
    };

    return [value, increment] as const;
}
