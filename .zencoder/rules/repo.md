---
description: Repository Information Overview
alwaysApply: true
---

# Fruite-Roulette Repository Information

## Repository Summary
Fruite-Roulette is a gaming application with a mobile app frontend and a Spring Boot backend. The project consists of a React Native mobile application and a Java Spring Boot backend service.

## Repository Structure
- **app/**: React Native mobile application using Expo
- **prostar/**: Spring Boot backend service
- **src/**, **components/**, **styles/**, **theme/**: Additional frontend resources

## Projects

### Mobile App (React Native)
**Configuration File**: app/package.json

#### Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.8.3
**Framework**: React Native 0.79.5, Expo 53.0.20
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- React 19.0.0
- React Native 0.79.5
- Expo Router 5.1.4
- Redux Toolkit & React Redux
- Axios 1.6.7
- React Navigation
- Expo modules (av, blur, haptics, etc.)
- Zustand 4.5.2
- Styled Components 6.1.11

**Development Dependencies**:
- TypeScript 5.8.3
- ESLint 9.25.0
- Babel 7.25.2

#### Build & Installation
```bash
cd app
npm install
npm start
```

#### Main Files
**Entry Point**: app/App.tsx
**Navigation**: app/navigation/AppNavigator.tsx
**Screens**: app/screens/*.tsx
**State Management**: app/store/*.ts

### Backend Service (Spring Boot)
**Configuration File**: prostar/pom.xml

#### Language & Runtime
**Language**: Java
**Version**: Java 24
**Framework**: Spring Boot 3.5.4
**Build System**: Maven

#### Dependencies
**Main Dependencies**:
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- JWT (jsonwebtoken) 0.9.1
- MySQL Connector
- H2 Database (for development)

#### Build & Installation
```bash
cd prostar
./mvnw clean install
./mvnw spring-boot:run
```

#### Main Files
**Entry Point**: prostar/src/main/java/com/fruiteroulette/prostar/ProstarApplication.java
**Controllers**: prostar/src/main/java/com/fruiteroulette/prostar/controller/*.java
**Models**: prostar/src/main/java/com/fruiteroulette/prostar/model/*.java
**Services**: prostar/src/main/java/com/fruiteroulette/prostar/service/*.java
**Configuration**: prostar/src/main/resources/application.properties