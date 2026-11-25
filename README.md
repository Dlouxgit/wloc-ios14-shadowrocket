# WLOC scripts for iOS 14.0–14.4

This repository provides a Shadowrocket module and JavaScript builds of [Dlouxgit/wloc](https://github.com/Dlouxgit/wloc) for the JavaScript engine on iOS 14.0–14.4. The original project is [Yu9191/wloc](https://github.com/Yu9191/wloc).

The source scripts use private class fields. WebKit added that syntax in iOS 14.5, so the scripts can fail to parse on earlier iOS 14 releases. The build changes JavaScript syntax for Safari 14 and leaves the WLOC request and response logic in the source scripts intact.

## Module

Import [`modules/wloc-ios14.module`](modules/wloc-ios14.module) into Shadowrocket, enable the module and HTTPS decryption, and trust the Shadowrocket root certificate on the device. The module contains no preset location coordinates. The settings script accepts `lon`, `lat`, and optional `acc` on `/wloc-settings/save`; `?action=query` only reads saved settings. With the script running, either request returns JSON with HTTP 200. The location response script handles `/clls/wloc` traffic.

## Build

`src/` contains the two script files copied from `Dlouxgit/wloc` commit `eec07a8dc8de6dbaee8eac1fb376e4d03020154a`. To reproduce `dist/`:

```sh
pnpm install --frozen-lockfile
pnpm build
```

The build uses esbuild's Safari 14 target. The explicit destructuring support setting preserves syntax already supported by Safari 14 while allowing esbuild to transform private class fields.

The settings script's save and query responses were checked in a simulated Shadowrocket environment. The binary location response still requires testing on an iOS 14 device. This repository contains no device identifiers, traffic logs, certificates, database files, private IP addresses, or user-specific location coordinates. The source scripts retain the publicly available upstream default-coordinate comparison.

## License

Derived from Yu9191/wloc. Distributed under the GNU Affero General Public License v3; see [LICENSE](LICENSE).
