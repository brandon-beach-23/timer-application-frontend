export interface TimerSessionResponse {
    timerName: string;
    timerDuration: number;
    timerElapsedTime: number;
    timerState: string;
    hasCompleted: boolean;
    createdAt: Date;
    stoppedAt: Date; 
}
