import { useEffect, useRef } from 'react';

const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

/**
 * Logs and returns how many times a component has rendered.
 */
export const useRenderCount = (componentName: string): number => {
    const renderCount = useRef<number>(0);

    // Note: No dependency array means this runs on EVERY render
    useEffect(() => {
        renderCount.current += 1;
        console.debug(`${componentName} rendered ${renderCount.current} times`);
    });

    return renderCount.current;
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