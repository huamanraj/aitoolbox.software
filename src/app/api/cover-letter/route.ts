import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.position || !data.company || !data.experience || !data.skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate cover letter content
    const coverLetter = generateCoverLetter(data);
    
    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateCoverLetter(data: any): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toneAdjectives = {
    Professional: 'professional and experienced',
    Enthusiastic: 'enthusiastic and passionate',
    Confident: 'confident and results-driven',
    Friendly: 'collaborative and personable',
    Formal: 'dedicated and detail-oriented',
    Creative: 'innovative and creative'
  };

  const lengthSettings = {
    Short: { paragraphs: 2, detailLevel: 'concise' },
    Medium: { paragraphs: 3, detailLevel: 'moderate' },
    Long: { paragraphs: 4, detailLevel: 'detailed' }
  };

  const settings = lengthSettings[data.length as keyof typeof lengthSettings] || lengthSettings.Medium;
  const toneDesc = toneAdjectives[data.tone as keyof typeof toneAdjectives] || toneAdjectives.Professional;

  // Extract key requirements from job description if provided
  let jobRequirementsMention = '';
  if (data.jobDescription && data.jobDescription.trim()) {
    jobRequirementsMention = ` I have carefully reviewed the job requirements you've outlined, and I am confident that my background aligns well with your needs.`;
  }

  let letter = `${today}

Dear Hiring Manager,

I am writing to express my strong interest in the ${data.position} position at ${data.company}. As a ${toneDesc} professional with relevant experience in the field, I am excited about the opportunity to contribute to your team's continued success.${jobRequirementsMention}

`;

  // Add experience paragraph
  letter += `In my professional journey, I have developed valuable expertise that aligns well with your requirements. ${data.experience} These experiences have equipped me with the practical knowledge and problem-solving abilities essential for excelling in the ${data.position} role at ${data.company}.

`;

  // Add skills paragraph for medium/long letters
  if (settings.paragraphs >= 3) {
    let skillsSection = `My technical and professional skill set includes ${data.skills.toLowerCase()}.`;
    
    // Add job description reference if available
    if (data.jobDescription && data.jobDescription.trim()) {
      skillsSection += ` Based on the job description, I believe my experience directly addresses your key requirements.`;
    }
    
    skillsSection += ` I am particularly drawn to ${data.company} because of your reputation for innovation and excellence in the industry. I believe my background and enthusiasm make me an ideal candidate to contribute meaningfully to your team's objectives.

`;
    letter += skillsSection;
  }

  // Add additional paragraph for long letters
  if (settings.paragraphs >= 4 && data.additionalInfo) {
    letter += `${data.additionalInfo} I am eager to bring my unique perspective and proven track record to help ${data.company} achieve its goals while continuing to grow professionally within your organization.

`;
  }

  // Closing paragraph
  letter += `Thank you for considering my application. I would welcome the opportunity to discuss how my background and passion align with ${data.company}'s needs. I look forward to hearing from you soon and am available at your convenience for an interview.

Sincerely,
${data.name}`;

  return letter;
}