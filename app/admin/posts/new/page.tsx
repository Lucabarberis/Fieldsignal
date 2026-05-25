import { PostForm } from "@/components/PostForm";
import { createPostAction } from "@/app/admin/actions";

export default function NewPostPage() {
  return <PostForm mode="new" action={createPostAction} />;
}
