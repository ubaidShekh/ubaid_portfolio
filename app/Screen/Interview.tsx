import React, { useState, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Linking,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {Stack} from 'expo-router';

const { width } = Dimensions.get('window');

// ---------- DATA: TOP 100 QUESTIONS FOR JUNIOR REACT NATIVE DEV ----------
const questionsData = [
  { id: '1', question: 'What is React Native and how does it differ from React?', answer: 'React Native is a framework for building native mobile apps using React. Unlike React (web), React Native renders with native components (View, Text) instead of HTML/CSS.', explanation: 'Uses a bridge to communicate between JS thread and native UI thread. React uses DOM elements.', resourceLink: 'https://reactnative.dev/docs/getting-started' },
  { id: '2', question: 'Explain the difference between React Native CLI and Expo.', answer: 'CLI gives full control over native code, Expo offers managed workflow with tools & services, faster development but limited custom native modules.', explanation: 'Expo abstracts native code; ejecting gives CLI-like control.', resourceLink: 'https://docs.expo.dev/introduction/' },
  { id: '3', question: 'What is the "Bridge" in React Native?', answer: 'The bridge is the mechanism that serializes JSON messages and asynchronously communicates between JavaScript and native threads.', explanation: 'Allows non-blocking UI, but can cause performance bottlenecks with heavy data.', resourceLink: 'https://reactnative.dev/docs/architecture-glue' },
  { id: '4', question: 'Explain React Native New Architecture (Fabric & TurboModules).', answer: 'Fabric is the new rendering system, TurboModules allow synchronous native module access, removing bridge limitations.', explanation: 'Improves performance, better interoperability with modern React features.', resourceLink: 'https://reactnative.dev/docs/new-architecture-intro' },
  { id: '5', question: 'What are the core components in React Native?', answer: 'View, Text, ScrollView, FlatList, Image, TextInput, TouchableOpacity, Button, ActivityIndicator.', explanation: 'Equivalent to div/p/img but native under the hood.', resourceLink: 'https://reactnative.dev/docs/components-and-apis' },
  { id: '6', question: 'What is the difference between Flexbox in RN vs CSS?', answer: 'React Native uses a subset of CSS flexbox; default flexDirection is "column" (web default row), no support for grid/position:sticky fully.', explanation: 'Align items, justify content work similarly but defaults differ.', resourceLink: 'https://reactnative.dev/docs/flexbox' },
  { id: '7', question: 'How do you handle navigation in React Native?', answer: 'Using React Navigation library (Stack, Tab, Drawer). Deep linking, custom transitions.', explanation: 'React Navigation is community standard, supports native stack.', resourceLink: 'https://reactnavigation.org/' },
  { id: '8', question: 'What is the purpose of FlatList? When to use it?', answer: 'FlatList renders large lists efficiently by rendering only items visible on screen (virtualized).', explanation: 'Use for long scrollable data, avoid ScrollView for large lists.', resourceLink: 'https://reactnative.dev/docs/flatlist' },
  { id: '9', question: 'Explain how to optimize list performance.', answer: 'Use FlatList props: removeClippedSubviews, maxToRenderPerBatch, windowSize, getItemLayout, and useMemo for data.', explanation: 'Avoid inline functions in renderItem, use useCallback.', resourceLink: 'https://reactnative.dev/docs/optimizing-flatlist-configuration' },
  { id: '10', question: 'What is the useState hook? Give an example.', answer: 'useState adds local state to functional components. const [count, setCount] = useState(0).', explanation: 'Triggers re-render when state changes.', resourceLink: 'https://react.dev/reference/react/useState' },
  { id: '11', question: 'What is useEffect and common use cases?', answer: 'useEffect handles side effects: API calls, subscriptions, event listeners, cleanup.', explanation: 'Dependency array controls when effect runs.', resourceLink: 'https://react.dev/reference/react/useEffect' },
  { id: '12', question: 'How do you manage global state in React Native?', answer: 'Options: Redux Toolkit, Zustand, Context API, MobX. Zustand and Redux are popular for scale.', explanation: 'Zustand simpler boilerplate, good for mid-size apps.', resourceLink: 'https://zustand-demo.pmnd.rs/' },
  { id: '13', question: 'What is Redux Toolkit? How is it better than vanilla Redux?', answer: 'RTK simplifies store setup, includes thunk, immer, devtools. Reduces boilerplate drastically.', explanation: 'Recommended approach for Redux in modern RN apps.', resourceLink: 'https://redux-toolkit.js.org/' },
  { id: '14', question: 'Explain the Context API and its limitations.', answer: 'Context passes data through component tree without props drilling. Limitations: re-renders all consumers on value change, not optimized for frequent updates.', explanation: 'Great for themes/auth, not for high-frequency state.', resourceLink: 'https://react.dev/learn/passing-data-deeply-with-context' },
  { id: '15', question: 'How to handle API calls and async storage?', answer: 'Use fetch or axios for REST APIs, AsyncStorage or MMKV for local key-value persistence.', explanation: 'AsyncStorage is simple, MMKV performs better.', resourceLink: 'https://reactnative.dev/docs/asyncstorage' },
  { id: '16', question: 'What are custom hooks? Provide an example.', answer: 'Custom hooks are reusable functions that encapsulate stateful logic. Example: useFetch(url) returning data/loading.', explanation: 'Share logic across components cleanly.', resourceLink: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
  { id: '17', question: 'How does React Native handle styling?', answer: 'StyleSheet.create() for optimized styles, similar to CSS but camelCase properties.', explanation: 'Styles are immutable and sent to native once.', resourceLink: 'https://reactnative.dev/docs/style' },
  { id: '18', question: 'What is the difference between ScrollView and FlatList?', answer: 'ScrollView renders all children at once (bad for large lists). FlatList uses lazy rendering/virtualization.', explanation: 'Use ScrollView only for small content.', resourceLink: 'https://reactnative.dev/docs/using-a-listview' },
  { id: '19', question: 'What are TouchableOpacity, TouchableHighlight?', answer: 'TouchableOpacity provides opacity feedback on press, TouchableHighlight gives background color overlay.', explanation: 'Used for buttons/tappable elements.', resourceLink: 'https://reactnative.dev/docs/touchableopacity' },
  { id: '20', question: 'How to implement navigation between screens with params?', answer: 'navigation.navigate("Profile", { userId: 123 }); then route.params.userId.', explanation: 'Works with React Navigation.', resourceLink: 'https://reactnavigation.org/docs/params' },
  { id: '21', question: 'What is the use of SafeAreaView?', answer: 'Ensures content renders within notched status bars, dynamic islands, safe area boundaries on iOS/Android.', explanation: 'Prevents content from being cut by rounded corners.', resourceLink: 'https://reactnative.dev/docs/safeareaview' },
  { id: '22', question: 'Explain how to integrate Firebase in React Native.', answer: 'Use @react-native-firebase/app, auth, firestore, messaging. Also Expo Firebase modules.', explanation: 'Supports analytics, FCM push, realtime DB.', resourceLink: 'https://rnfirebase.io/' },
  { id: '23', question: 'What are push notifications? How to implement FCM?', answer: 'Firebase Cloud Messaging sends notifications. Use react-native-firebase/messaging or Expo Notifications.', explanation: 'Requires device token registration and backend.', resourceLink: 'https://rnfirebase.io/messaging/usage' },
  { id: '24', question: 'How to handle deep linking?', answer: 'Configure linking config in React Navigation and native intents: app links (Android) / universal links (iOS).', explanation: 'Navigates to specific screen from URL.', resourceLink: 'https://reactnavigation.org/docs/deep-linking' },
  { id: '25', question: 'What is the VirtualizedList?', answer: 'Underlying component for FlatList and SectionList. Renders only visible window content.', explanation: 'Optimizes memory usage.', resourceLink: 'https://reactnative.dev/docs/virtualizedlist' },
  { id: '26', question: 'How to debug React Native apps?', answer: 'Use React Native Debugger, Flipper, console.log, Chrome DevTools, and Reactotron.', explanation: 'New architecture uses Hermes debugger.', resourceLink: 'https://reactnative.dev/docs/debugging' },
  { id: '27', question: 'What is Hermes engine?', answer: 'JavaScript engine optimized for React Native, improves startup time, reduces memory footprint.', explanation: 'Enabled by default in new projects.', resourceLink: 'https://reactnative.dev/docs/hermes' },
  { id: '28', question: 'Explain the concept of "state" and "props" differences.', answer: 'Props are read-only passed from parent. State is mutable internal component data.', explanation: 'Both trigger re-renders when changed.', resourceLink: 'https://react.dev/learn/state-a-components-memory' },
  { id: '29', question: 'What are keys in lists? Why important?', answer: 'Keys help React identify which items changed, added, or removed. Use stable unique IDs.', explanation: 'Prevents unnecessary re-renders, improves performance.', resourceLink: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key' },
  { id: '30', question: 'How to use AsyncStorage for offline data?', answer: 'store data as key-value string (JSON.stringify). AsyncStorage.setItem, getItem.', explanation: 'Limit to small datasets; for larger use SQLite or MMKV.', resourceLink: 'https://reactnative.dev/docs/asyncstorage' },
  { id: '31', question: 'What are environment variables in React Native?', answer: 'Use react-native-config or Expo constants to store API keys, endpoints per build.', explanation: 'Protects sensitive data.', resourceLink: 'https://github.com/luggit/react-native-config' },
  { id: '32', question: 'Explain the React Native lifecycle (modern functional).', answer: 'useState mounts, useEffect (mount/update), cleanup on unmount. Class components: componentDidMount, etc.', explanation: 'Hooks replace lifecycle methods.', resourceLink: 'https://react.dev/learn/lifecycle-of-reactive-effects' },
  { id: '33', question: 'What are TurboModules?', answer: 'Part of new architecture: native modules that support lazy loading, synchronous execution, and typed JS interfaces.', explanation: 'Improves performance over old bridge modules.', resourceLink: 'https://reactnative.dev/docs/turbo-modules-intro' },
  { id: '34', question: 'How to implement biometric authentication?', answer: 'Use react-native-biometrics or Expo LocalAuthentication. Supports FaceID, fingerprint.', explanation: 'Adds security for sensitive actions.', resourceLink: 'https://github.com/naoufal/react-native-biometrics' },
  { id: '35', question: 'What is the difference between onLayout and useEffect for dimensions?', answer: 'onLayout measures component after layout, while useEffect + Dimensions API gets screen dimensions.', explanation: 'onLayout used for dynamic child sizing.', resourceLink: 'https://reactnative.dev/docs/view#onlayout' },
  { id: '36', question: 'What are animated APIs in React Native?', answer: 'Animated library for smooth animations: Animated.timing, spring, decay, useNativeDriver for performance.', explanation: 'Reanimated 2 provides more advanced gestures.', resourceLink: 'https://reactnative.dev/docs/animated' },
  { id: '37', question: 'How to handle forms and validation?', answer: 'Use Formik + Yup for building forms, validation schemas, and managing submission.', explanation: 'Simplifies error handling.', resourceLink: 'https://formik.org/docs/overview' },
  { id: '38', question: 'What is the purpose of the useRef hook?', answer: 'useRef persists values across renders without causing re-renders; also used to reference native elements.', explanation: 'Ideal for timers, focus control.', resourceLink: 'https://react.dev/reference/react/useRef' },
  { id: '39', question: 'How to set up CI/CD for React Native?', answer: 'GitHub Actions, Fastlane, or Bitrise: automate builds, tests, and deploy to Google Play / App Store.', explanation: 'Reduces manual release time significantly.', resourceLink: 'https://reactnative.dev/docs/publishing-to-app-store' },
  { id: '40', question: 'Explain the difference between inline styles and StyleSheet.', answer: 'StyleSheet.create() validates styles and sends only IDs to native, improving performance. Inline styles cause new objects on each render.', explanation: 'Prefer StyleSheet for static styles.', resourceLink: 'https://reactnative.dev/docs/stylesheet' },
  { id: '41', question: 'What is the "LayoutAnimation" API?', answer: 'Automatically animates layout changes (add/remove/resize) for next render. Simpler than Animated.', explanation: 'Great for configurable transitions.', resourceLink: 'https://reactnative.dev/docs/layoutanimation' },
  { id: '42', question: 'How to manage permissions (camera, location)?', answer: 'Use react-native-permissions or Expo Permissions. Request, check, handle denial gracefully.', explanation: 'Necessary for Android/iOS runtime permissions.', resourceLink: 'https://github.com/zoontek/react-native-permissions' },
  { id: '43', question: 'What is the proper way to handle memory leaks?', answer: 'Cleanup subscriptions in useEffect return, abort controllers for fetch, avoid setState on unmounted components.', explanation: 'Use isMounted flag or AbortController.', resourceLink: 'https://react.dev/learn/synchronizing-with-effects#cleanup' },
  { id: '44', question: 'How do you test React Native components?', answer: 'Jest for unit tests, React Native Testing Library for component interaction, Detox for E2E.', explanation: 'Aim for coverage on critical flows.', resourceLink: 'https://reactnative.dev/docs/testing' },
  { id: '45', question: 'What is the role of Babel and Metro in RN?', answer: 'Metro is the bundler for RN, transforms JSX and modern JS. Babel does transpilation.', explanation: 'Metro supports hot reloading.', resourceLink: 'https://facebook.github.io/metro/' },
  { id: '46', question: 'How to reduce app bundle size?', answer: 'Enable Hermes, use Proguard (Android), remove unused libraries, compress images, enable asset optimization.', explanation: 'Also use react-native-bundle-visualizer.', resourceLink: 'https://reactnative.dev/docs/performance#reduce-the-app-size' },
  { id: '47', question: 'What are React Native Gesture Handler and Reanimated?', answer: 'Gesture Handler: smooth touch handling. Reanimated: high-performance animations, shared values, worklets.', explanation: 'Used together for advanced interactions.', resourceLink: 'https://docs.swmansion.com/react-native-gesture-handler/' },
  { id: '48', question: 'How to handle errors globally?', answer: 'Use ErrorBoundary components (class components) or react-native-error-boundary, and global error handlers.', explanation: 'Catches rendering errors.', resourceLink: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' },
  { id: '49', question: 'Explain "renderItem" optimization in FlatList.', answer: 'Define renderItem outside FlatList using useCallback, avoid arrow functions, use memo for complex items.', explanation: 'Prevents re-renders of all list rows.', resourceLink: 'https://reactnative.dev/docs/flatlist#renderitem' },
  { id: '50', question: 'What is the difference between react-native Linking and WebView?', answer: 'Linking opens external apps/browser; WebView renders web content inside your app.', explanation: 'WebView can be heavy, Linking leaves the app.', resourceLink: 'https://reactnative.dev/docs/linking' },
  { id: '51', question: 'How to handle version updates and OTA?', answer: 'Expo Updates or CodePush (Microsoft) allows over-the-air JS updates without store resubmission.', explanation: 'Great for critical fixes.', resourceLink: 'https://docs.expo.dev/eas-update/how-it-works/' },
  { id: '52', question: 'What is "Platform.select"?', answer: 'Utility to provide platform-specific styles/components: Platform.select({ ios: ..., android: ... })', explanation: 'Cleanly handle differences.', resourceLink: 'https://reactnative.dev/docs/platform-specific-code' },
  { id: '53', question: 'How to implement infinite scroll?', answer: 'FlatList onEndReached trigger fetching next page, combine with pagination state, activity indicator.', explanation: 'Avoid duplicate calls with throttle.', resourceLink: 'https://reactnative.dev/docs/flatlist#onendreached' },
  { id: '54', question: 'Explain the concept of "shadow props" in React Native.', answer: 'Elevation (Android), shadowOffset (iOS) control shadow appearance. Cross-platform differences.', explanation: 'Use third-party libs for unified shadows.', resourceLink: 'https://reactnative.dev/docs/shadow-props' },
  { id: '55', question: 'How to handle image caching?', answer: 'Use react-native-fast-image for efficient caching, prefetch, and priority.', explanation: 'Better than default Image component.', resourceLink: 'https://github.com/DylanVann/react-native-fast-image' },
  { id: '56', question: 'What is the concept of "strict mode" in React?', answer: 'StrictMode highlights potential problems (deprecated APIs, side effects). Helps with forward compatibility.', explanation: 'Does not affect production build.', resourceLink: 'https://react.dev/reference/react/StrictMode' },
  { id: '57', question: 'How to implement authentication flow (JWT, refresh token)?', answer: 'Store token securely (expo-secure-store), intercept Axios requests, refresh token on 401, manage auth context.', explanation: 'Persist user session.', resourceLink: 'https://reactnavigation.org/docs/auth-flow' },
  { id: '58', question: 'What are React Native Skia?', answer: 'Graphics library based on Skia (same as Chrome). Enables advanced 2D drawings, effects, and vector graphics.', explanation: 'Powerful for custom UI visualizations.', resourceLink: 'https://shopify.github.io/react-native-skia/' },
  { id: '59', question: 'What is the purpose of KeyboardAvoidingView?', answer: 'Prevents keyboard from covering input fields by adjusting view position when keyboard appears.', explanation: 'Works with behavior="padding" or "position".', resourceLink: 'https://reactnative.dev/docs/keyboardavoidingview' },
  { id: '60', question: 'How to support offline capabilities?', answer: 'Redux Persist + AsyncStorage, or WatermelonDB, sync mechanism when network resumes.', explanation: 'Combine with NetInfo for connectivity.', resourceLink: 'https://redux-toolkit.js.org/rtk-query/usage/persistence' },
  { id: '61', question: 'What is the "JSI" (JavaScript Interface)?', answer: 'New architecture component allowing direct JS-native C++ calls, bypassing the bridge. Enhances performance for TurboModules.', explanation: 'Enables synchronous communication.', resourceLink: 'https://reactnative.dev/docs/architecture-jsi' },
  { id: '62', question: 'Explain the difference between "props drilling" and context.', answer: 'Props drilling passes data through many intermediate components. Context provides direct access to deeply nested components.', explanation: 'Context reduces prop drilling but may cause re-renders.', resourceLink: 'https://react.dev/learn/passing-data-deeply-with-context' },
  { id: '63', question: 'How to implement splash screen?', answer: 'Use react-native-splash-screen or expo-splash-screen. Configure native launcher screen.', explanation: 'Improves perceived performance.', resourceLink: 'https://github.com/crazycodeboy/react-native-splash-screen' },
  { id: '64', question: 'What is a "Native Module"?', answer: 'Bridge module that lets JS call native code (Java/Kotlin/ObjC/Swift) for device features not exposed by default.', explanation: 'Used for custom hardware integration.', resourceLink: 'https://reactnative.dev/docs/native-modules-intro' },
  { id: '65', question: 'What is the purpose of the AppRegistry?', answer: 'Entry point that registers the root component for React Native. Used for initial rendering.', explanation: 'Similar to ReactDOM.render in web.', resourceLink: 'https://reactnative.dev/docs/appregistry' },
  { id: '66', question: 'How to handle push notification actions (when app in background)?', answer: 'Use FCM listener onMessage, setBackgroundMessageHandler, and navigation logic in response.', explanation: 'Handle both foreground/background states.', resourceLink: 'https://rnfirebase.io/messaging/usage#background--quit-state' },
  { id: '67', question: 'What are ESLint and Prettier?', answer: 'ESLint catches code errors, Prettier enforces consistent code formatting across team.', explanation: 'Make codebase robust.', resourceLink: 'https://reactnative.dev/docs/formatting-and-linting' },
  { id: '68', question: 'Explain "fast refresh" vs "hot reloading".', answer: 'Fast refresh preserves component state while updating code, more reliable than legacy hot reloading.', explanation: 'Enabled by default in Metro.', resourceLink: 'https://reactnative.dev/docs/fast-refresh' },
  { id: '69', question: 'How to use SVG in React Native?', answer: 'Use react-native-svg library, allows SVG components with full vector rendering.', explanation: 'Alternative to images for icons/illustrations.', resourceLink: 'https://github.com/software-mansion/react-native-svg' },
  { id: '70', question: 'How do you handle large form inputs without performance drops?', answer: 'Use controlled components with debounced updates, avoid re-rendering entire form, use useCallback.', explanation: 'Consider useRef for some fields.', resourceLink: 'https://react.dev/reference/react/useDeferredValue' },
  { id: '71', question: 'What are "dimensions" module limitations?', answer: 'Dimensions returns screen size once; orientation changes require event listener. Use useWindowDimensions hook for reactive updates.', explanation: 'Responsive design best practice.', resourceLink: 'https://reactnative.dev/docs/usewindowdimensions' },
  { id: '72', question: 'How to implement drag & drop or gesture?', answer: 'Using react-native-gesture-handler & Reanimated: PanGestureHandler, onGestureEvent, shared values.', explanation: 'Build draggable components.', resourceLink: 'https://docs.swmansion.com/react-native-gesture-handler/docs/gesture-handlers/pan-gh' },
  { id: '73', question: 'What is React Native Testing Library philosophy?', answer: 'Encourages testing behavior not implementation details. Queries by accessibility/text, simulates user events.', explanation: 'Better confidence than snapshot tests.', resourceLink: 'https://callstack.github.io/react-native-testing-library/' },
  { id: '74', question: 'What is "reanimated worklet"?', answer: 'Worklets are JS functions that run on UI thread, enabling smooth 60fps animations without bridge.', explanation: 'Critical for custom gesture animations.', resourceLink: 'https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets' },
  { id: '75', question: 'How to handle app state changes?', answer: 'AppState API to listen to "active", "background", "inactive". Useful for pause/resume tasks.', explanation: 'Save data on background.', resourceLink: 'https://reactnative.dev/docs/appstate' },
  { id: '76', question: 'Explain Expo Application Services (EAS).', answer: 'EAS Build, Submit, Update: cloud services for building and deploying Expo apps, OTA updates.', explanation: 'Streamlines release process.', resourceLink: 'https://docs.expo.dev/eas/' },
  { id: '77', question: 'What is Context vs Redux performance comparison?', answer: 'Context triggers re-renders for all consumers on any change. Redux with selectors only re-renders components that depend on changed slice.', explanation: 'For large apps Redux is more efficient.', resourceLink: 'https://redux.js.org/faq/performance' },
  { id: '78', question: 'How to implement a theming system (dark mode)?', answer: 'Create ThemeContext, provide colors, persist preference, use useColorScheme for system detection.', explanation: 'Dynamic style changes without reload.', resourceLink: 'https://reactnavigation.org/docs/themes' },
  { id: '79', question: 'What is the purpose of the "momentum scroll" events?', answer: 'FlatList onMomentumScrollBegin/End captures inertial scrolling, useful for analytics/video pausing.', explanation: 'Improves UX detection.', resourceLink: 'https://reactnative.dev/docs/flatlist#onmomentumscrollbegin' },
  { id: '80', question: 'How to share code between web and mobile?', answer: 'Use React Native Web, or monorepo with shared UI components and business logic.', explanation: 'Leverage reusable hooks/utils.', resourceLink: 'https://necolas.github.io/react-native-web/' },
  { id: '81', question: 'What are absolute/relative positioning differences?', answer: 'Absolute positioned element relative to parent (if parent has relative/absolute). Relative to normal flow.', explanation: 'Use Position: "absolute" for overlays.', resourceLink: 'https://reactnative.dev/docs/layout-props#position' },
  { id: '82', question: 'How to implement OAuth (Google, Facebook)?', answer: 'Use react-native-app-auth or expo-auth-session. Securely handle redirect URIs and tokens.', explanation: 'Great for social login.', resourceLink: 'https://github.com/FormidableLabs/react-native-app-auth' },
  { id: '83', question: 'What is the purpose of Accessibility API?', answer: 'Make apps usable for everyone: accessible label, role, hint, TalkBack/VoiceOver support.', explanation: 'Legal requirement often.', resourceLink: 'https://reactnative.dev/docs/accessibility' },
  { id: '84', question: 'Explain the benefits of monorepo for React Native.', answer: 'Share packages between backend, web, mobile. Consistent tooling and versioning.', explanation: 'Use Nx or Turborepo.', resourceLink: 'https://turbo.build/' },
  { id: '85', question: 'How do you profile React Native performance?', answer: 'Use Flipper, React DevTools profiler, and Perf Monitor (Android). Check JS thread and UI thread.', explanation: 'Look for unnecessary re-renders.', resourceLink: 'https://reactnative.dev/docs/performance#profiling' },
  { id: '86', question: 'What is Reactotron?', answer: 'Desktop app for inspecting Redux, API requests, errors, and performance in React Native.', explanation: 'Useful for debugging.', resourceLink: 'https://github.com/infinitered/reactotron' },
  { id: '87', question: 'What is the "Modal" component?', answer: 'Renders content above the app, supports animation, transparency. Used for alerts, forms.', explanation: 'Works cross-platform.', resourceLink: 'https://reactnative.dev/docs/modal' },
  { id: '88', question: 'How to handle secure storage of tokens?', answer: 'expo-secure-store (iOS Keychain / Android EncryptedSharedPreferences) or react-native-keychain.', explanation: 'Never store tokens in AsyncStorage.', resourceLink: 'https://docs.expo.dev/versions/latest/sdk/securestore/' },
  { id: '89', question: 'What is the "Image" component caching mechanism?', answer: 'iOS caches automatically, Android needs custom implementation or use FastImage for cross-platform caching.', explanation: 'Improves image loading', resourceLink: 'https://reactnative.dev/docs/image#cache' },
  { id: '90', question: 'Explain the concept of "Code Splitting" in React Native?', answer: 'Metro supports lazy bundling using React.lazy + Suspense, or dynamic imports (require).', explanation: 'Reduces initial bundle.', resourceLink: 'https://reactnative.dev/docs/bundling' },
  { id: '91', question: 'How to implement in-app purchases?', answer: 'Use react-native-iap or expo in-app purchases. Manage products, receipts, server validation.', explanation: 'Complex setup.', resourceLink: 'https://github.com/dooboolab/react-native-iap' },
  { id: '92', question: 'What\'s your experience with native module linking?', answer: 'For biometric or custom hardware, use react-native link (auto-linking modern RN) or manual linking for old version.', explanation: 'Important for device features.', resourceLink: 'https://reactnative.dev/docs/linking-libraries-ios' },
  { id: '93', question: 'What are the best practices for folder structure?', answer: 'Feature-based: src/features/auth/, common components, services, navigation, hooks, utils.', explanation: 'Scalable for teams.', resourceLink: 'https://reactnative.dev/docs/learn-the-basics#project-structure' },
  { id: '94', question: 'How to handle iOS & Android specific UI differences?', answer: 'Platform module, .ios.js/.android.js files, or design with consistent core components.', explanation: 'Provide adaptive behavior.', resourceLink: 'https://reactnative.dev/docs/platform-specific-code' },
  { id: '95', question: 'What is the purpose of "useMemo" and "useCallback"?', answer: 'useMemo caches computed values, useCallback caches function references to avoid child re-renders.', explanation: 'Optimize expensive calculations.', resourceLink: 'https://react.dev/reference/react/useMemo' },
  { id: '96', question: 'How to transform API data for FlatList?', answer: 'Transform data using useMemo before passing to FlatList: const memoData = useMemo(() => process(data), [data])', explanation: 'Prevents re-processing.', resourceLink: 'https://reactnative.dev/docs/optimizing-flatlist-configuration' },
  { id: '97', question: 'Explain proper clean up in useEffect.', answer: 'Return a cleanup function that unsubscribes, removes event listeners, cancels timers.', explanation: 'Avoid memory leaks.', resourceLink: 'https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed' },
  { id: '98', question: 'What is the difference between "onLayout" and "useWindowDimensions"?', answer: 'onLayout returns layout of single component, useWindowDimensions returns global screen size.', explanation: 'onLayout measured after component mount.', resourceLink: 'https://reactnative.dev/docs/view#onlayout' },
  { id: '99', question: 'How to handle image picker and camera?', answer: 'Use expo-image-picker or react-native-image-crop-picker, request permissions, handle results.', explanation: 'Common user interaction.', resourceLink: 'https://docs.expo.dev/versions/latest/sdk/imagepicker/' },
  { id: '100', question: 'Describe a time you improved app performance (junior scenario).', answer: 'Replaced Context with Zustand reducing re-renders by 40%; implemented FlatList lazy loading and getItemLayout cutting list load time ~50%', explanation: 'Real impact on user experience.', resourceLink: 'https://reactnative.dev/docs/performance' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return questionsData;
    return questionsData.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openResourceLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
  };

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedId === item.id;
    const inputRange = [-1, 0, (index * 100)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 0.98],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => toggleExpand(item.id)}
          style={styles.questionHeader}
        >
          <View style={styles.questionNumber}>
            <MaterialIcons name="code" size={18} color="#4f46e5" />
            <Text style={styles.numberText}>{item.id}</Text>
          </View>
          <Text style={styles.questionText} numberOfLines={isExpanded ? undefined : 2}>
            {item.question}
          </Text>
          <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={22} color="#64748b" />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.answerContainer}>
            <View style={styles.answerBlock}>
              <View style={styles.blockHeader}>
                <Feather name="check-circle" size={18} color="#10b981" />
                <Text style={styles.answerTitle}>Answer</Text>
              </View>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
            <View style={styles.explanationBlock}>
              <View style={styles.blockHeader}>
                <Feather name="book-open" size={18} color="#f59e0b" />
                <Text style={styles.explanationTitle}>Explanation for Junior Dev</Text>
              </View>
              <Text style={styles.explanationText}>{item.explanation}</Text>
            </View>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => openResourceLink(item.resourceLink)}
            >
              <Feather name="external-link" size={16} color="#3b82f6" />
              <Text style={styles.linkText}>Deep dive into documentation</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    );
  };

  return (

    <>
    <Stack.Screen options={{headerShown:false}}/>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" translucent={false} />
      <View style={styles.container}>
        <Animated.View style={[styles.header, {
          opacity: scrollY.interpolate({
            inputRange: [0, 80],
            outputRange: [1, 0.95],
            extrapolate: 'clamp',
          })
        }]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="logo-react" size={32} color="#61dafb" />
            </View>
            <Text style={styles.title}>React Native Interview</Text>
            <Text style={styles.subtitle}>Top 100 Questions • 1+ Year Experience</Text>
          </View>
          
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Filter questions or answers..."
              placeholderTextColor="#94a3b8"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm !== '' && (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Feather name="x-circle" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Feather name="list" size={14} color="#6366f1" />
              <Text style={styles.resultCount}>{filteredQuestions.length} / 100</Text>
            </View>
            <View style={styles.statBadge}>
              <Feather name="clock" size={14} color="#6366f1" />
              <Text style={styles.resultCount}>Junior Dev Prep</Text>
            </View>
          </View>
        </Animated.View>

        <FlatList
          data={filteredQuestions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={15}
          maxToRenderPerBatch={20}
          windowSize={10}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </SafeAreaView></>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  header: { marginBottom: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 16 },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#0f172a', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4, fontWeight: '500' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#0f172a', padding: 0 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 12 },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#eef2ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  resultCount: { fontSize: 12, fontWeight: '600', color: '#4f46e5' },
  listContent: { paddingBottom: 40, gap: 12 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eef2ff',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  questionNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  numberText: { fontWeight: '700', color: '#4f46e5', fontSize: 13 },
  questionText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0f172a', lineHeight: 22 },
  answerContainer: { paddingHorizontal: 16, paddingBottom: 20, gap: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 16 },
  answerBlock: { backgroundColor: '#f0fdf4', borderRadius: 14, padding: 14 },
  explanationBlock: { backgroundColor: '#fffbeb', borderRadius: 14, padding: 14 },
  blockHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  answerTitle: { fontWeight: '700', fontSize: 14, color: '#10b981' },
  explanationTitle: { fontWeight: '700', fontSize: 14, color: '#f59e0b' },
  answerText: { fontSize: 14, lineHeight: 22, color: '#1e293b' },
  explanationText: { fontSize: 13, lineHeight: 20, color: '#4b3b1a' },
  linkButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#eff6ff', borderRadius: 12, alignSelf: 'flex-start' },
  linkText: { fontSize: 13, color: '#3b82f6', fontWeight: '600' },
});

export default App;