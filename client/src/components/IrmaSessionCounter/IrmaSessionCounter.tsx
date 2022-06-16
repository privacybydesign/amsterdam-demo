import { insertInPlaceholders } from '@services/content-helpers';
import { useContent } from '@services/ContentProvider';
import React, { useEffect, useCallback, useState, useRef } from 'react';

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
    minutes: number;
    QRIsShowing: boolean;
}

const IrmaSessionCounter: React.FC<IProps> = ({ className, minutes = 5, QRIsShowing }) => {
    const content = useContent();
    const [timeLeftLabel, setTimeLeftLabel] = useState<string>('');
    const intervalRef = useRef<any>();

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const onIntervalUpdate = useCallback(
        startTime => {
            const timeElapsed = Date.now() - startTime;
            const durationInMs = minutes * 60 * 1000;
            const timeLeftInSec = Math.round((durationInMs - timeElapsed) / 1000);

            let newLabel = '';
            if (timeLeftInSec > 60 && timeLeftInSec <= 120) {
                newLabel = insertInPlaceholders(
                    content.qrcode.counter,
                    `${Math.ceil(timeLeftInSec / 60)} ${content.qrcode.minutePlural}`
                );
            } else if (timeLeftInSec === 60) {
                newLabel = insertInPlaceholders(content.qrcode.counter, `1 ${content.qrcode.minute}`);
            } else if (timeLeftInSec < 60 && timeLeftInSec > 1) {
                newLabel = insertInPlaceholders(
                    content.qrcode.counter,
                    `${timeLeftInSec} ${content.qrcode.secondPlural}`
                );
            } else if (timeLeftInSec === 1) {
                newLabel = insertInPlaceholders(content.qrcode.counter, `1 ${content.qrcode.second}`);
            } else if (timeLeftInSec === 0) {
                // Stop updating if there is no time left.
                stopInterval();
            }
            setTimeLeftLabel(newLabel);
        },
        [minutes, stopInterval]
    );

    // Initialize the start of the interval when the counter is mounted
    useEffect(() => {
        if (QRIsShowing === true) {
            const startDate = Date.now();
            onIntervalUpdate(startDate);
            const interval = setInterval(onIntervalUpdate, 1000, startDate) as any;
            intervalRef.current = interval;
        }
    }, [QRIsShowing, onIntervalUpdate]);

    // Stop interval when modal closes
    useEffect(() => {
        return () => {
            stopInterval();
        };
    }, [stopInterval]);

    return <span className={className}>{timeLeftLabel}</span>;
};

export default IrmaSessionCounter;
