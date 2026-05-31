import React from "react";
import { DomainRecommendation } from "@/src/types/analysis";
import { AlertTriangle } from "./ResultIcons";

interface DomainCardsProps {
  domains: DomainRecommendation[];
}

export default function DomainCards({ domains }: DomainCardsProps) {
  const getBadgeStyle = (confidence: DomainRecommendation["confidence"]) => {
    switch (confidence) {
      case "High":
        return "bg-primary text-black font-semibold border border-primary";
      case "Medium":
        return "border border-primary text-primary-dark font-semibold bg-primary-light/10";
      case "Low":
        return "bg-surface-2 text-text-secondary border border-border font-medium";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain, index) => (
        <div
          key={`${domain.name}-${index}`}
          className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-text-primary leading-snug">
                {domain.name}
              </h3>
              <span
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap select-none ${getBadgeStyle(
                  domain.confidence,
                )}`}
              >
                {domain.confidence} Confidence
              </span>
            </div>

            {/* Rationale */}
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-text-muted">
                Rationale
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                {domain.rationale}
              </p>
            </div>
          </div>

          {/* Gap & Warning block */}
          <div className="mt-6 pt-4 border-t border-border/80">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface border border-border/40">
              <AlertTriangle className="text-primary-dark shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-left">
                <span className="text-xs font-bold text-text-primary block">
                  Identified Skill Gap
                </span>
                <p className="text-xs text-text-secondary leading-normal">
                  {domain.gap}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
