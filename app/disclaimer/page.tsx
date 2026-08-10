import { LegalPage, legalMetadata } from "@/components/LegalPage";
export const metadata = legalMetadata("en", "disclaimer");
export default function Page() { return <LegalPage locale="en" documentId="disclaimer" />; }
