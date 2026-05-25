import { notFound } from "next/navigation";
import { TranscriptForm } from "@/components/TranscriptForm";
import { transcriptsRepo } from "@/lib/db/transcripts";
import { updateTranscriptAction } from "../../actions";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function EditTranscriptPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const transcript = await transcriptsRepo.get(slug);
  if (!transcript) notFound();

  // Bind original slug into the server-action signature
  const boundAction = updateTranscriptAction.bind(null, slug);

  return (
    <TranscriptForm
      mode="edit"
      initial={transcript}
      saved={saved === "1"}
      action={boundAction}
    />
  );
}
