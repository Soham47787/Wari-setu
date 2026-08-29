# WariSeva — Android APK

This directory contains everything needed to build the **WariSeva** Android app —
a native WebView wrapper around the bundled web app (`dist/`).

## What's here

| Path | Purpose |
| --- | --- |
| `AndroidManifest.xml` | App manifest (package `com.warisetu.app`, launcher activity, permissions) |
| `src/com/warisetu/app/MainActivity.java` | The WebView host activity |
| `res/` | Launcher icons (legacy + adaptive), colors |
| `build-apk.sh` | One-command reproducible build (no Android SDK / Gradle needed) |

## How the app works

- The web app is built with relative asset paths (`BASE_PATH=./ npm run build`) and
  bundled into the APK's `assets/` folder.
- `MainActivity` loads `file:///android_asset/index.html` in a full-screen `WebView`.
- The wrapper enables JavaScript, DOM storage, geolocation, media playback, and the
  "Lost & Found" image picker, and opens external links (maps, YouTube) in the
  system browser.
- All app data stays on-device in the WebView's local storage — no backend needed.

## Building

Prerequisites: Linux x86_64, Node.js, Python 3, and `gh` (GitHub CLI) logged in.

```bash
bash android/build-apk.sh
```

Output:
- `android/WariSeva.apk` — signed, installable APK
- `android/wariseva-release.keystore` — signing key (keep this safe; reuse it for
  future updates so they install over the existing app)

## Toolchain note

This repo deliberately avoids Gradle + the Android SDK. The build script pins a
small set of classic command-line tools and fetches them from their canonical
public sources:

- **JDK 21 runtime** — `jdk4py` (PyPI)
- **javac 8** — OpenJDK 8 `tools.jar` (`dataslope-tools-jar`, npm)
- **aapt2** — prebuilt Linux binary (`VindroidH/prebuilt-binaries-*`, GitHub)
- **android.jar (API 29)** — `Sable/android-platforms` (GitHub)
- **dx** + **apksigner** — Android build-tools jars (`stray-coding/ADT`, GitHub)

Why API 29's `android.jar`? The pinned aapt2 predates the newer
`resources.arsc` format used by API 30+ framework jars; API 29 is fully
sufficient because the wrapper only uses framework APIs available since API 21.

## Signing details

- Package: `com.warisetu.app`
- minSdk 21 (Android 5.0) · targetSdk 34
- Key: RSA 2048, self-signed (10000 days), alias `wariseva`
- Signed with APK Signature Scheme v1 + v2 + v3
