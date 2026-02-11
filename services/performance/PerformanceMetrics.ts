import { useEffect, useRef } from 'react';


// Green,\x1b[32m
// Red,\x1b[31m
// Yellow,\x1b[33m
// Blue,\x1b[34m
// Cyan,\x1b[36m
// Bold,\x1b[1m
// Reset,\x1b[0m
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

/**
 * Logs and returns how many times a component has rendered.
 */
export const useRenderCount = (componentName: string) => {
    const renderCount = useRef<number>(0);
    // Note: No dependency array means this runs on EVERY render
    useEffect(() => {
        renderCount.current += 1;
        console.debug(`${BLUE}${componentName} ${GREEN}rendered ${RED}${renderCount.current} ${GREEN}times`);
    });
};

/**
 * Deep-diffs props between renders to catch unnecessary updates.
 * Usage: useWhyDidYouUpdate('MyComponent', props);
 */
export const useWhyDidYouUpdate = <T extends Record<string, any>>(
    name: string,
    props: T
): void => {
    // Use T to ensure previousProps matches the current props shape
    const previousProps = useRef<T | undefined>(undefined);

    useEffect(() => {
        if (previousProps.current) {
            // Get all keys from both previous and current props
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            console.log(allKeys);
            const changedProps: Record<string, { from: any; to: any }> = {};

            allKeys.forEach((key) => {
                if (previousProps.current![key] !== props[key]) {
                    changedProps[key] = {
                        from: previousProps.current![key],
                        to: props[key],
                    };
                }
            });

            if (Object.keys(changedProps).length > 0) {
                console.log(
                    `${RED}${BOLD}[why-did-${BLUE}${name}${RED}-update]${RESET}`,
                    JSON.stringify(changedProps, null, 2)
                );
            }
        }

        // Update previousProps with current props for the next render
        previousProps.current = props;
    });
};