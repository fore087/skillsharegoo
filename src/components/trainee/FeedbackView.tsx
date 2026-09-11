import React, { useState } from 'react';
import { 
  Star, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Building, 
  Sparkles, 
  BookOpen, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeedbackView: React.FC = () => {
  const { courses, currentUser, feedbackList, submitFeedback } = useApp();

  const enrolledCourses = courses.filter(c => (c.progress || 0) > 0);
  const defaultCourse = enrolledCourses[0] || courses[0];

  const [selectedCourseId, setSelectedCourseId] = useState<string>(defaultCourse?.id || 'crs-101');
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoveredOverall, setHoveredOverall] = useState<number | null>(null);

  const [criteriaRatings, setCriteriaRatings] = useState({
    contentQuality: 5,
    instructorClarity: 5,
    practicalValue: 5,
    platformEase: 5
  });

  const [comment, setComment] = useState<string>('');
  const [recommend, setRecommend] = useState<boolean>(true);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('Please enter constructive feedback or comments for institutional improvement.');
      return;
    }

    submitFeedback({
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      overallRating,
      criteriaRatings,
      comment: comment.trim(),
      recommend
    });

    setSubmittedSuccessfully(true);
    setComment('');
    setTimeout(() => setSubmittedSuccessfully(false), 3500);
  };

  const renderStarSelector = (
    value: number, 
    onChange: (val: number) => void, 
    hoverVal: number | null, 
    setHoverVal?: (val: number | null) => void,
    size: 'sm' | 'md' | 'lg' = 'md'
  ) => {
    const starSize = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoverVal !== null ? hoverVal : value) >= star;

          return (
            <button
              type="button"
              key={star}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverVal && setHoverVal(star)}
              onMouseLeave={() => setHoverVal && setHoverVal(null)}
              className="p-0.5 hover:scale-110 transition-transform focus:outline-hidden"
            >
              <Star
                className={`${starSize} ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
          Curriculum Quality Assurance
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Course Feedback & Institutional Evaluation
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Your transparent feedback directly informs national curriculum updates, instructional methodology enhancement, and public sector competency alignment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {submittedSuccessfully && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Official Feedback Submitted Successfully!</p>
                  <p className="font-normal mt-0.5">
                    Thank you, {currentUser.name}. Your institutional rating has been filed in the continuous improvement registry.
                  </p>
                </div>
              </div>
            )}

            {/* Select Course */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Course to Review
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.code}) — Faculty: {c.instructorName}
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Star Rating */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Overall Course Rating
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    How satisfied are you with the curriculum impact?
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {renderStarSelector(overallRating, setOverallRating, hoveredOverall, setHoveredOverall, 'lg')}
                  <span className="text-xs font-bold text-slate-800 w-6 text-center">
                    {hoveredOverall || overallRating}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Specific Criteria Ratings */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Detailed Evaluation Criteria
              </h4>

              <div className="space-y-2.5">
                {/* 1. Content Quality */}
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">1. Curriculum Content & Depth</p>
                    <p className="text-[11px] text-slate-500">Rigor and accuracy of public sector concepts</p>
                  </div>
                  {renderStarSelector(
                    criteriaRatings.contentQuality,
                    (val) => setCriteriaRatings(prev => ({ ...prev, contentQuality: val })),
                    null,
                    undefined,
                    'sm'
                  )}
                </div>

                {/* 2. Instructor Clarity */}
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">2. Faculty Delivery & Explanations</p>
                    <p className="text-[11px] text-slate-500">Clarity of lectures, case studies, and Q&A</p>
                  </div>
                  {renderStarSelector(
                    criteriaRatings.instructorClarity,
                    (val) => setCriteriaRatings(prev => ({ ...prev, instructorClarity: val })),
                    null,
                    undefined,
                    'sm'
                  )}
                </div>

                {/* 3. Practical Value */}
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">3. Practical Public Sector Applicability</p>
                    <p className="text-[11px] text-slate-500">Direct usefulness to departmental civil service duties</p>
                  </div>
                  {renderStarSelector(
                    criteriaRatings.practicalValue,
                    (val) => setCriteriaRatings(prev => ({ ...prev, practicalValue: val })),
                    null,
                    undefined,
                    'sm'
                  )}
                </div>

                {/* 4. Platform Ease */}
                <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">4. Portal & Resource Accessibility</p>
                    <p className="text-[11px] text-slate-500">Navigation, video player, and PDF viewing ease</p>
                  </div>
                  {renderStarSelector(
                    criteriaRatings.platformEase,
                    (val) => setCriteriaRatings(prev => ({ ...prev, platformEase: val })),
                    null,
                    undefined,
                    'sm'
                  )}
                </div>
              </div>
            </div>

            {/* Written Comment / Review */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Detailed Feedback & Recommendations for Faculty
              </label>
              <textarea
                rows={4}
                required
                placeholder="What did you find most beneficial in this course? Which modules could be expanded with more case studies or hands-on labs?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Recommendation Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Would you recommend this course to fellow public servants?
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRecommend(!recommend)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  recommend ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    recommend ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Official Review
            </button>
          </form>
        </div>

        {/* Right Column: Feedback History & Guidelines */}
        <div className="lg:col-span-5 space-y-6">
          {/* Institutional Quality Notice */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Evaluation Governance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All submitted course evaluations are reviewed quarterly by the National Board of Digital Capacity Accreditation (NBDCA) to determine curriculum re-accreditation.
            </p>
          </div>

          {/* Feedback History */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                Submitted Reviews ({feedbackList.length})
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Registry Records</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.courseTitle}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{item.traineeName}</p>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-800">{item.overallRating}.0</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                    &ldquo;{item.comment}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span>{item.createdAt}</span>
                    {item.recommend && (
                      <span className="text-emerald-700 font-sans font-semibold flex items-center gap-1">
                        <ThumbsUp className="w-2.5 h-2.5" /> Recommended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
