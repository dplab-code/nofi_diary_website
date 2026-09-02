# Pre-launch privacy claims

Status: approved website claim set, reviewed 2026-09-02.

This document records what the Coming Soon may say without broadening the promises already published in the Privacy Policy. It does not replace that policy and does not authorize changes to it.

| Area | Publicly supportable statement | Boundary that must remain explicit |
| --- | --- | --- |
| Local data | Diary content is stored primarily on the device. | A lost, erased or damaged device can mean loss of unexported memories. |
| Cloud | No NoFi cloud and no automatic synchronization to NoFi servers in the current release. | A destination deliberately chosen during export may use its own cloud services. |
| Account | The current release has no account system. | Re-review the policy before introducing accounts or cloud synchronization. |
| App telemetry | No behavioural analytics, advertising tracker, profiling tool or Crashlytics SDK in the current app. | Google Play or Android may supply Android Vitals under their own services and settings. Website analytics are separate. |
| Android permissions | Camera, microphone, Wi-Fi/Nearby Devices and, where an Android/OEM version requires it, location are requested only for their corresponding feature. | NoFi must not claim that location permission is never requested; it may be required for nearby discovery. |
| Export | Export and sharing happen only after an intentional user action to a chosen destination. NoFi keeps no server-side archive copy. | Do not describe archives as encrypted unless the app explicitly provides and verifies that protection. |
| Backup | No NoFi cloud backup; private content is excluded from automatic Android backup under the implemented configuration. | Users should export important memories; uninstalling or clearing app storage may remove local data. |
| External connections | Nearby transfer is peer-to-peer over local Wi-Fi Direct and uses no intermediary NoFi server. | Once content is shared or exported, the selected third party controls its copy and later synchronization. |

Source of truth: the currently published Privacy Policy (`content/legal.ts`, English section set, mirrored in four localized versions). Before application launch, the mobile build and Android manifest must be checked again against every row above. Any mismatch blocks the claim; it does not justify silently editing the Privacy Policy.
