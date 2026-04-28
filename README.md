# Timer Application - Front End

## Overview

The Angular frontend allows a user to create a new timer, control the current timer, and displays previous timer sessions. The timer's display is also present on the UI.

## Problem & Motivation

There are a lot timer applications out there but this project allowed me the opportunity to learn websockets, system design, and testing strategies. This project was a tool I could make myself and use as productivity tool for future projects.
## Key Features
-  Track time and alert the user when the duration of the timer has elapsed.
- Persisted timer sessions to track consistency.
- Websocket communication to allow for efficient communication between the frontend and backend.

## Tech Stack
**Backend:**
- Spring Boot
- Java

**Frontend:**
- Angular
 
**Database:**
- H2 (File Based)

## Architecture & Design Decisions

The Angular front end a Spring Boot backend establish a connection upon loading via websockets, The frontend is responsible for sending user input to start the timer and control various states (Pause, Resume, Stop) as well as display the elapsed time and previous timer sessions. The back end performs the actions, keeps track of the ticks, and broadcasts updates to the frontend. Websockets were used to keep the frontend from polling the backend constantly.

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven

### Frontend Setup
```bash
cd timer-application-frontend
npm install
ng serve
```

The application will be available at http://localhost:4200
## What I Learned

- How and Why websockets should be used 
- Ingesting data from the backend via websockets and exposing it through an observable

### Future Improvements

- Reset UI upon stopping the timer session
- Selection of notification sound

### Repository Links

- Backend Repository
	https://github.com/brandon-beach-23/timer-application
- Frontend Repository
    https://github.com/brandon-beach-23/timer-application-frontend
