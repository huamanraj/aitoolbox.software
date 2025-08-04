import ProjectRecommenderClient from "./_components/project-recommender-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectRecommenderPage() {
  return (
    <div className="space-y-8">
      <ProjectRecommenderClient />

      {/* SEO About Section - SSR */}
      <div className="max-w-5xl mx-auto px-8 pb-6">
        <Card>
          <CardHeader>
            <CardTitle>About AI Project Recommender</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The AI Project Recommender is an intelligent tool that provides personalized project suggestions
              based on your tech stack, skill level, career focus, and interests. Get curated project ideas
              that will help you build valuable skills, create an impressive portfolio, and advance your
              programming career.
            </p>

            <p>
              <strong>Key Benefits:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalized project recommendations tailored to your exact skill level and goals</li>
              <li>Smart matching based on your known technologies and career aspirations</li>
              <li>Portfolio-ready projects that impress employers and showcase your abilities</li>
              <li>Progressive skill building with appropriate challenge levels</li>
              <li>Real-world applicable projects that solve genuine problems</li>
              <li>Time estimates and feature suggestions for better project planning</li>
              <li>Technology stack recommendations to expand your skillset strategically</li>
            </ul>

            <p>
              <strong>How to Use the Project Recommender:</strong>
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Select your known technologies from our comprehensive tech stack list</li>
              <li>Choose your career focus (Frontend, Backend, Full-Stack, Mobile, etc.)</li>
              <li>Specify your current skill level (Beginner, Intermediate, or Advanced)</li>
              <li>Pick your areas of interest (Productivity, Finance, AI Tools, Games, etc.)</li>
              <li>Indicate your available time commitment for the project</li>
              <li>Add any specific portfolio goals or additional requirements</li>
              <li>Click &quot;Get Project Recommendations&quot; to receive personalized suggestions</li>
              <li>Review detailed project cards with features, tech stacks, and timelines</li>
            </ol>

            <p>
              <strong>Perfect for These Use Cases:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Students:</strong> Find projects that reinforce classroom learning and build practical skills</li>
              <li><strong>Career Changers:</strong> Build a portfolio that demonstrates your new programming abilities</li>
              <li><strong>Job Seekers:</strong> Create impressive projects that stand out in technical interviews</li>
              <li><strong>Skill Development:</strong> Practice new technologies with guided project suggestions</li>
              <li><strong>Portfolio Building:</strong> Develop a diverse collection of projects for professional showcase</li>
              <li><strong>Freelancers:</strong> Build experience in different domains to expand service offerings</li>
              <li><strong>Bootcamp Graduates:</strong> Bridge the gap between coursework and real-world applications</li>
            </ul>

            <p>
              <strong>Supported Technologies:</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              <div>
                <h4 className="font-semibold mb-2">Frontend:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>HTML/CSS/JavaScript</li>
                  <li>React, Vue.js, Angular</li>
                  <li>Next.js, TypeScript</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>Node.js, Express.js</li>
                  <li>Python, Django, Flask</li>
                  <li>Java, Spring Boot</li>
                  <li>PHP, Laravel</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mobile & Other:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>React Native, Flutter</li>
                  <li>iOS (Swift), Android (Kotlin)</li>
                  <li>Databases, Cloud Services</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Tips for Maximum Success:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Be honest about your current skill level for appropriately challenging projects</li>
              <li>Select multiple interest areas to get diverse project recommendations</li>
              <li>Include technologies you want to learn, not just ones you already know</li>
              <li>Set realistic time commitments based on your actual availability</li>
              <li>Use the portfolio goal field to specify what you want to demonstrate</li>
              <li>Start with simpler projects and gradually increase complexity</li>
              <li>Focus on completing projects rather than starting many incomplete ones</li>
            </ul>

            <p>
              <strong>Why Choose AI-Powered Project Recommendations?</strong>
            </p>
            <p>
              Unlike generic project lists or random tutorials, our AI Project Recommender analyzes your
              specific situation and goals to provide truly personalized suggestions. Each recommendation
              considers your current abilities, desired growth areas, available time, and career objectives
              to ensure maximum learning value and portfolio impact.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
