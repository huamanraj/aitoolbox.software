
// import { WandSparklesIcon } from "lucide-react";
// import { useState } from "react";
// // import { generateSummary } from "./actions";
// import { ResumeValues } from "@/lib/resume/validation";
// import { toast } from "sonner";
// import LoadingButton from "../LoadingButton";

// interface GenerateSummaryButtonProps {
//   resumeData: ResumeValues;
//   onSummaryGenerated: (summary: string) => void;
// }

// export default function GenerateSummaryButton({
//   resumeData,
//   onSummaryGenerated,
// }: GenerateSummaryButtonProps) {


//   const [loading, setLoading] = useState(false);

//   async function handleClick() {

//     try {
//       setLoading(true);
//       const aiResponse = await generateSummary(resumeData);
//       onSummaryGenerated(aiResponse);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <LoadingButton
//     loading={loading}
//     >
//       <WandSparklesIcon className="size-4" />
//       Generate (AI)
//     </LoadingButton>
//   );
// }
