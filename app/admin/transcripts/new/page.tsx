import { TranscriptForm } from "@/components/TranscriptForm";
import { createTranscriptAction } from "../actions";

export default function NewTranscriptPage() {
  return <TranscriptForm mode="new" action={createTranscriptAction} />;
}
