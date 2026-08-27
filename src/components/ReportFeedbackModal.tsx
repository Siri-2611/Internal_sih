import React, { useState } from 'react';
import { X, Flag, CheckCircle2, AlertCircle } from 'lucide-react';
import { StorageService } from '../services/storage';

interface ReportFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  hindiText: string;
  santhaliText: string;
  recordId?: string;
}

export const ReportFeedbackModal: React.FC<ReportFeedbackModalProps> = ({
  isOpen,
  onClose,
  hindiText,
  santhaliText,
  recordId
}) => {
  const [reason, setReason] = useState<'Incorrect' | 'Unnatural' | 'Wrong dialect' | 'Wrong meaning' | 'Audio pronunciation issue' | 'Other'>('Wrong dialect');
  const [suggestedCorrection, setSuggestedCorrection] = useState('');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveFeedbackReport({
      record_id: recordId,
      hindi_text: hindiText,
      santhali_text: santhaliText,
      reason,
      suggested_correction: suggestedCorrection,
      teacher_notes: teacherNotes
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D3436]/60 backdrop-blur-xs">
      <div
        id="report-feedback-modal"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E0E2D9] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FDFCF8] border-b border-[#E0E2D9]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#F27D26]/10 text-[#F27D26]">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2D3436] text-lg">Report Translation Issue</h3>
              <p className="text-xs text-[#747D8C]">Help tribal linguistic experts refine classroom content</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#747D8C] hover:text-[#2D3436] rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-14 h-14 text-[#27AE60] mb-3 animate-bounce" />
            <h4 className="text-xl font-bold text-[#2D3436] mb-1">Feedback Logged Successfully</h4>
            <p className="text-sm text-[#747D8C] max-w-sm">
              Thank you, Teacher! Your feedback has been stored locally and queued for the Santali language review board.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3.5 bg-[#FDFCF8] rounded-xl border border-[#E0E2D9] space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-medium text-[#747D8C] min-w-16">Hindi:</span>
                <span className="font-semibold text-[#2D3436]">{hindiText}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-[#747D8C] min-w-16">Santhali:</span>
                <span className="font-semibold text-[#F27D26]">{santhaliText}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-1.5">
                Primary Issue Category
              </label>
              <select
                id="feedback-reason-select"
                value={reason}
                onChange={(e: any) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E0E2D9] rounded-xl text-[#2D3436] text-sm focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26]"
              >
                <option value="Wrong dialect">Wrong dialect / Regional variant</option>
                <option value="Incorrect">Incorrect translation</option>
                <option value="Unnatural">Unnatural or awkward phrasing for Class 1</option>
                <option value="Wrong meaning">Wrong meaning in classroom context</option>
                <option value="Audio pronunciation issue">Audio pronunciation issue</option>
                <option value="Other">Other linguistic feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-1.5">
                Suggested Santhali Correction (Optional)
              </label>
              <input
                id="feedback-correction-input"
                type="text"
                value={suggestedCorrection}
                onChange={(e) => setSuggestedCorrection(e.target.value)}
                placeholder="e.g. How a local native speaker would say it..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E0E2D9] rounded-xl text-[#2D3436] text-sm focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D3436] mb-1.5">
                Teacher Notes / Context (Optional)
              </label>
              <textarea
                id="feedback-notes-textarea"
                rows={2}
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                placeholder="Describe why this change helps young learners in your school..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E0E2D9] rounded-xl text-[#2D3436] text-sm focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26] resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#E0E2D9] text-[#2D3436] font-medium rounded-xl hover:bg-stone-50 text-sm"
              >
                Cancel
              </button>
              <button
                id="submit-feedback-btn"
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#F27D26] hover:bg-[#E06C17] text-white font-semibold rounded-xl text-sm shadow-xs transition-all cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
