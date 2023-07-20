# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Requirements

- Homebrew (makes life easier)
- Node 18.6.1
- WatchMan
- Xcode + command line tools
- Ruby 2.6.0 (included with OS X)
- Bundler (included with OS X)
- CocoaPods (ideally install via homebrew to avoid having to use `sudo` with built in ruby)

## Step 1: Create .env file

You will need to create a `.env` file in the root directory containing your [weatherapi.com](<[weatherapi.com](https://www.weatherapi.com/)>) API key:

```
WEATHERAPI_API_KEY=XXXXXX
```

## Step 2: Install dependencies

Install the NPM modules:

```bash
npm install
```

Install ruby modules:

```bash
bundle install
```

Install pod modules:

```bash
npm run pod-install
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android (not currently tested)

```bash
npm run android
```

### For iOS

```bash
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
