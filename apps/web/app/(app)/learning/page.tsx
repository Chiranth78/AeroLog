import { LearningClient } from "../../../components/learning-client";
import { getLearningTopics } from "../../../lib/api";

export default async function LearningPage() {
  const topics = await getLearningTopics();
  return <LearningClient topics={topics} />;
}
