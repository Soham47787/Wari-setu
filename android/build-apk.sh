#!/usr/bin/env bash
#
# build-apk.sh — build the WariSeva Android APK from source (no Android SDK / Gradle required).
#
# This script reproduces, end-to-end, the exact build that produced the shipped
# WariSeva.apk. It downloads a minimal, pinned toolchain and assembles the APK
# with aapt2 + javac + dx + apksigner (the classic Android command-line flow).
#
# Requirements on the build machine:
#   - Linux x86_64
#   - Node.js + npm (to build the web app)
#   - Python 3 (for the zip/packaging step)
#   - `gh` CLI authenticated (used only to fetch pinned GitHub blobs), or set
#     GITHUB_TOKEN and this script will fall back to curl + the GitHub API.
#
# Usage:
#   bash android/build-apk.sh
#
# Output:
#   android/WariSeva.apk            — signed, installable APK
#   android/wariseva-release.keystore — the signing key (KEEP THIS SAFE)
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$ROOT/android/.build"
TOOLS="$WORK/tools"
OUT="$ROOT/android/WariSeva.apk"
KEYSTORE="$ROOT/android/wariseva-release.keystore"

STORE_PASS="wariseva123"
KEY_ALIAS="wariseva"
KEY_PASS="wariseva123"

# Pinned tool versions / hashes ------------------------------------------------
JDK_WHEEL_URL="https://files.pythonhosted.org/packages/a2/61/f3b5936908ff6de66c61aef69bf1074cb468fb883f5a0bb9e15e67a6b484/jdk4py-21.0.8.2-py3-none-manylinux_2_17_x86_64.whl"
JDK_WHEEL_SHA="$(echo -n)"; JDK_WHEEL_SHA="a2/61/f3b5936908ff6de66c61aef69bf1074cb468fb883f5a0bb9e15e67a6b484"  # path segment marker
TOOLS_JAR_URL="https://registry.npmjs.org/dataslope-tools-jar/-/dataslope-tools-jar-1.0.0.tgz"

# GitHub blobs (owner/repo, blob sha, destination name)
AAPT2_REPO="VindroidH/prebuilt-binaries-aapt-aapt_64-aapt2-aapt2_64-windows-linux-macosx"
AAPT2_SHA="3e5fccde28539366364fe178668399b926180f0f"
ANDROID29_REPO="Sable/android-platforms"
ANDROID29_SHA="345dd115e9a1d94a55754751f899fb436476674a"
DX_REPO="stray-coding/ADT"
DX_SHA="ef90a14d8f2a6deda26da6ca50682e3384e74dfe"
APKSIGNER_REPO="stray-coding/ADT"
APKSIGNER_SHA="f4adcffa3698319c27847d2cdf6179fd4f14ab3f"

mkdir -p "$TOOLS" "$WORK/classes"

gh_blob() { # repo sha outfile
  if command -v gh >/dev/null 2>&1; then
    gh api -H "Accept: application/vnd.github.raw+json" \
      "repos/$1/git/blobs/$2" > "$3"
  else
    curl -4 -fsSL -H "Authorization: token ${GITHUB_TOKEN:?set GITHUB_TOKEN or use gh}" \
      -H "Accept: application/vnd.github.raw+json" \
      "https://api.github.com/repos/$1/git/blobs/$2" > "$3"
  fi
}

echo "[1/8] Building the web app (relative asset paths)"
(cd "$ROOT" && BASE_PATH=./ npm run build)

echo "[2/8] Fetching toolchain"
[ -f "$TOOLS/jdk/README.txt" ] || { curl -4 -fsSL -o "$TOOLS/jdk4py.whl" "$JDK_WHEEL_URL"; (cd "$TOOLS" && unzip -q -o jdk4py.whl -d jdk && touch jdk/README.txt); }
[ -f "$TOOLS/aapt2_64" ] || { gh_blob "$AAPT2_REPO" "$AAPT2_SHA" "$TOOLS/aapt2_64.zip"; (cd "$TOOLS" && unzip -q -o aapt2_64.zip aapt2_64 && chmod +x aapt2_64); }
[ -f "$TOOLS/android-29.jar" ] || gh_blob "$ANDROID29_REPO" "$ANDROID29_SHA" "$TOOLS/android-29.jar"
[ -f "$TOOLS/dx.jar" ] || gh_blob "$DX_REPO" "$DX_SHA" "$TOOLS/dx.jar"
[ -f "$TOOLS/apksigner.jar" ] || gh_blob "$APKSIGNER_REPO" "$APKSIGNER_SHA" "$TOOLS/apksigner.jar"
[ -f "$TOOLS/tools.jar" ] || { curl -4 -fsSL -o "$TOOLS/tools.tgz" "$TOOLS_JAR_URL"; (cd "$TOOLS" && tar xzf tools.tgz && cp package/tools.jar ./tools.jar); }

JAVA="$TOOLS/jdk/jdk4py/java-runtime/bin/java"
KEYTOOL="$TOOLS/jdk/jdk4py/java-runtime/bin/keytool"
AAPT2="$TOOLS/aapt2_64"
AJAR="$TOOLS/android-29.jar"

echo "[3/8] Compiling Android resources (aapt2)"
"$AAPT2" compile --dir "$ROOT/android/res" -o "$WORK/res.zip"

echo "[4/8] Linking base APK (manifest + resources + assets)"
"$AAPT2" link -o "$WORK/base.apk" \
  -I "$AJAR" \
  --manifest "$ROOT/android/AndroidManifest.xml" \
  -A "$ROOT/dist" \
  --version-code 1 --version-name 1.0 \
  "$WORK/res.zip"

echo "[5/8] Compiling Java (javac 8 against android.jar)"
"$JAVA" -cp "$TOOLS/tools.jar" com.sun.tools.javac.Main \
  -bootclasspath "$AJAR" -classpath "$AJAR" \
  -source 1.8 -target 1.8 \
  -d "$WORK/classes" \
  "$ROOT/android/src/com/warisetu/app/MainActivity.java"

echo "[6/8] Dexing (dx)"
"$JAVA" -cp "$TOOLS/dx.jar" com.android.dx.command.Main \
  --dex --output="$WORK/classes.dex" "$WORK/classes"

echo "[7/8] Packaging classes.dex into the APK"
python3 - "$WORK/base.apk" "$WORK/app-unsigned.apk" "$WORK/classes.dex" <<'PY'
import sys, zipfile
src, dst, dex = sys.argv[1], sys.argv[2], sys.argv[3]
with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        zout.writestr(item, zin.read(item.filename))
    zout.write(dex, "classes.dex")
PY

echo "[8/8] Signing (apksigner v1+v2+v3)"
if [ ! -f "$KEYSTORE" ]; then
  "$KEYTOOL" -genkeypair -keystore "$KEYSTORE" -alias "$KEY_ALIAS" \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass "$STORE_PASS" -keypass "$KEY_PASS" \
    -dname "CN=WariSeva, OU=Dev, O=WariSeva, L=Nashik, ST=Maharashtra, C=IN"
fi
"$JAVA" -jar "$TOOLS/apksigner.jar" sign \
  --ks "$KEYSTORE" --ks-key-alias "$KEY_ALIAS" \
  --ks-pass "pass:$STORE_PASS" --key-pass "pass:$KEY_PASS" \
  --out "$OUT" "$WORK/app-unsigned.apk"

echo ""
echo "Done: $OUT"
"$JAVA" -jar "$TOOLS/apksigner.jar" verify --verbose "$OUT" | sed 's/^/  /'
echo "  Keystore: $KEYSTORE (alias=$KEY_ALIAS, pass=$STORE_PASS) — keep it safe for future updates."
