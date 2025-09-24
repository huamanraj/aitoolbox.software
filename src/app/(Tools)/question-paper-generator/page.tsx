import React from "react";
import QuestionPaperDescription from "./_components/question-paper-description";
import QuestionPaperClient from "./_components/question-paper-client";

const page = () => {
  return (
    <div>
      <QuestionPaperClient />
      <QuestionPaperDescription />
    </div>
  );
};

export default page;
