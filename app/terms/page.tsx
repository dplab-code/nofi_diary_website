import { LegalPage, legalMetadata } from "@/components/LegalPage";
export const metadata = legalMetadata("en", "terms");
export default function Page() { return <LegalPage locale="en" documentId="terms" />; }
