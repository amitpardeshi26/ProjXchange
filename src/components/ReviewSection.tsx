import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Review, RatingStats } from '../types/Review';
import toast from 'react-hot-toast';

interface ReviewSectionProps {
  projectId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ projectId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://projxchange-backend-v1.vercel.app/reviews/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingStats = async () => {
    try {
      const response = await fetch(`https://projxchange-backend-v1.vercel.app/projects/${projectId}/ratings`);
      if (response.ok) {
        const data = await response.json();
        setRatingStats(data);
      }
    } catch (error) {
      console.error('Error fetching rating stats:', error);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please enter your review');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`https://projxchange-backend-v1.vercel.app/reviews/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: 5, // Fixed default as required by backend
          review_text: reviewText.trim(),
          is_approved: true
        })
      });

      if (response.ok) {
        toast.success('Review submitted successfully!');
        setReviewText('');
        await fetchReviews();
        await fetchRatingStats();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchRatingStats();
  }, [projectId]);

  const approvedReviews = reviews.filter(review => review.is_approved);

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          Student Reviews
        </h3>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            {ratingStats?.total_ratings || approvedReviews.length} students reviewed this project
          </p>
          {ratingStats?.average_rating && (
            <p className="text-sm text-gray-600">
              Average satisfaction: {ratingStats.average_rating.toFixed(1)}/5.0
            </p>
          )}
        </div>
      </div>

      {/* Review Form */}
      {isAuthenticated ? (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h4>
          <form onSubmit={submitReview} className="space-y-4">
            <div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell other students about your experience with this project. What did you learn? How was the code quality? Would you recommend it?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
                maxLength={1000}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {reviewText.length}/1000 characters
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !reviewText.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4">Please login to submit a review</p>
          <button
            onClick={() => {/* Open auth modal */}}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
          >
            Login to Review
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        ) : approvedReviews.length > 0 ? (
          approvedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">{review.user.full_name}</h5>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h4>
            <p className="text-gray-600">Be the first to share your experience with this project!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;