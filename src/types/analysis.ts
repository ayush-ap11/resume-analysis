export interface DomainRecommendation {
  name: string;
  confidence: "High" | "Medium" | "Low";
  evidencePoints: string[];
  gapPoints: string[];
}

export interface KeyQuality {
  title: string;
  description: string;
}

export interface Quality {
  title: string;
  description: string;
}

export interface ResumeAnalysis {
  submitterName: string;
  submitterEmail: string;
  uploadedAt: string;
  domains: DomainRecommendation[];
  qualities: KeyQuality[];
  summary: string;
}

export interface AnalysisResult {
  summary: string;
  domains: DomainRecommendation[];
  qualities: Quality[];
}

export interface SubmissionDocument {
  _id: string;
  submitterName: string;
  submitterEmail: string;
  resumeUrl: string;
  resumePublicId: string;
  uploadedAt: Date;
  status: "pending" | "completed" | "failed";
  analysis: AnalysisResult | null;
}
