# Task Town

Turn everyday tasks into a cozy town-building adventure.

Task Town is a productivity app that combines everyday quests with slow-life town building.

## Features

- Complete daily quests and earn XP
- Level up and unlock new buildings
- Grow your own cozy town
- Review completed quests in the Adventure Diary
- Premium subscription powered by RevenueCat
- Premium users can freely place exclusive buildings on empty plots
- Premium buildings include Cafe, Hot Spring, and Observatory

## Built With

- Expo
- React Native
- TypeScript
- Expo Router
- SQLite
- RevenueCat
- App Store Connect

## Getting Started

### Requirements

- Node.js
- Expo
- An iOS device or simulator
- A development build for native RevenueCat functionality

### Installation

Clone the repository and install dependencies:

```bash

npm install

Create a .env file in the project root:

EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=your_revenuecat_api_key

Never commit your .env file or API keys.

Start the Expo development server:

npx expo start --dev-client

Open the project with an installed iOS development build.

RevenueCat

Task Town uses RevenueCat to manage the Premium subscription and entitlement state.

The app uses the premium entitlement to unlock Premium features.

The RevenueCat API key must be provided through the environment variable:

EXPO_PUBLIC_REVENUECAT_IOS_API_KEY

License

This project is licensed under the MIT License.
