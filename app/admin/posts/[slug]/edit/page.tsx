import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { updatePostAction } from "@/app/admin/actions";
import { posts } from "@/lib/db/posts";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function EditPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { saved } = await searchParams;

  const post = await posts.get(slug);
  if (!post) notFound();

  // Bind the slug to the server action so updates target the right post.
  const action = updatePostAction.bind(null, slug);

  return (
    <PostForm
      mode="edit"
      initial={post}
      saved={saved === "1"}
      action={action}
    />
  );
}
