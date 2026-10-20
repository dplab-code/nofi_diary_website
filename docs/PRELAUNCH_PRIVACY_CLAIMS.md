# Pre-launch privacy claims

Status: website claim set, backup disclosure revised on user request 2026-10-20 (Privacy Policy v1.3).

This document records what the Coming Soon may say without broadening the promises already published in the Privacy Policy. It does not replace that policy and does not authorize changes to it.

| Area | Publicly supportable statement | Boundary that must remain explicit |
| --- | --- | --- |
| Local data | Diary content is stored primarily on the device. | A lost, erased or damaged device can mean loss of unexported memories. |
| Cloud | No NoFi cloud and no automatic synchronization to NoFi servers in the current release. | Android system backup and device transfers may include app data; export destinations may also use their own cloud services. |
| Account | The current release has no account system. | Re-review the policy before introducing accounts or cloud synchronization. |
| App telemetry | No behavioural analytics, advertising tracker, profiling tool or Crashlytics SDK in the current app. | Google Play or Android may supply Android Vitals under their own services and settings. Website analytics are separate. |
| Android permissions | Camera, microphone, Wi-Fi/Nearby Devices and, where an Android/OEM version requires it, location are requested only for their corresponding feature. | NoFi must not claim that location permission is never requested; it may be required for nearby discovery. |
| Export | Export and sharing happen only after an intentional user action to a chosen destination. NoFi keeps no server-side archive copy. | Do not describe archives as encrypted unless the app explicitly provides and verifies that protection. |
| Backup | No NoFi-operated cloud backup. Android may include app data, including diary content, in system backups or device transfers according to device settings, Android version and manufacturer. | NoFi receives no copy of system backups. Device settings expose available backup options. Manual app backup/export remains user-initiated; system backup availability or restoration is not guaranteed. Users should export important memories. |
| External connections | Nearby transfer is peer-to-peer over local Wi-Fi Direct and uses no intermediary NoFi server. | Once content is shared or exported, the selected third party controls its copy and later synchronization. |

Source of truth: the currently published Privacy Policy (`content/legal.ts`, English section set, mirrored in four localized versions). Before application launch, the mobile build and Android manifest must be checked again against every row above. Any mismatch blocks the claim; it does not justify silently editing the Privacy Policy.

## Backup audit and authorized policy correction — 2026-10-20

Read-only inspection of the NoFi app source and production APK 1.2.0 build 61 found diary SQLite data and media in application documents, with no explicit Android backup exclusions. The inspected APK SHA-256 is `b75ba4dcbfbaac36ca6abdc4daf69bacd12388181831384bf0df16f2f92abf0e`; the accompanying AAB manifest likewise has no `allowBackup`, `fullBackupContent` or `dataExtractionRules` attributes. Identity material and crypto working files use `noBackupFilesDir`; that protection does not cover the whole diary. This inspection does not establish whether any actual backup occurred.

The user explicitly requested a policy revision instead of an app configuration change. Privacy v1.3 removes the unsupported whole-diary exclusion claim in all five languages and distinguishes Android-managed backup from manual app exports. No Android source or device data was changed. This resolves the disclosure mismatch; it does not implement or certify backup exclusions. Reference: [Android Auto Backup](https://developer.android.com/identity/data/autobackup).

## Site-wide consistency review — 2026-10-20

Reviewed the public copy sources and their route consumers in all five languages: homepage/FAQ/privacy cards, Coming Soon, Time Capsules and other explore pages, legal documents, Manifesto, published Fragments, private-memory sharing, metadata, social previews and web manifest. Local-first/offline capability, user ownership and no NoFi-operated cloud remain valid distinctions; they do not mean Android system backup is disabled.

Corrected the homepage upload and backup FAQs, local-storage privacy card, Coming Soon privacy paragraph, and Time Capsule privacy title/body in all five languages. Removed the claims that content leaves the device only on export/share and that no cloud copy can exist. The older English FAQ component now reads the same upload/backup answers as the homepage instead of retaining a conflicting copy. The manual export function remains distinct from OS-managed backup; neither automatic backup availability nor successful restoration is promised. Other statements about ownership, public feeds and NoFi servers do not assert exclusion from system backup.

Scope: source copy and locally rendered candidate. This is not evidence that the revised content is deployed remotely or that Android backup/restore was tested on a device.
