import { LegalPage, legalMetadata } from "@/components/LegalPage";
export const metadata = legalMetadata("en", "privacy");
export default function Page() { return <LegalPage locale="en" documentId="privacy" />; }
