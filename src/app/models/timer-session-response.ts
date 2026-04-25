export interface TimerSessionResponse {
    timerName: string;
    duration: number;
    elapsedTime: number;
    timerState: string;
    hasCompleted: boolean;
    createdAt: Date;
    stoppedAt: Date; 
}
