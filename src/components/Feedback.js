import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import styles from './Feedback.module.css';

export default function Feedback() {
    const { pathname } = useLocation();
    const [userRating, setUserRating] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [comment, setComment] = useState('');

    const formRef = useRef(null);
    const idleTimerRef = useRef(null);

    // Handle initial rating
    const handleRating = (isLike) => {
        setUserRating(isLike);
        setShowComment(true);
        
        // Set form values
        if (formRef.current) {
            const formArticleId = formRef.current.querySelector('#formArticleId');
            const formRating = formRef.current.querySelector('#formRating');
            if (formArticleId && formRating) {
                formArticleId.value = `https://adapty.io${pathname}`;
                formRating.value = isLike ? 'Liked' : 'Disliked';
            }
        }
    };

    // Handle form submission
    const handleSubmitFeedback = (e) => {
        if (e) e.preventDefault();
        if (userRating === null || isSubmitted) return;

        if (formRef.current) {
            const formComment = formRef.current.querySelector('#formComment');
            if (formComment) {
                formComment.value = comment;
            }
            formRef.current.submit();
            setIsSubmitted(true);
        }
    };

    // Setup auto-submission handlers
    useEffect(() => {
        if (!userRating || isSubmitted) return;

        // Handle idle timer
        const resetIdleTimer = () => {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            idleTimerRef.current = setTimeout(() => {
                handleSubmitFeedback();
            }, 30000); // 30 seconds
        };

        // Handle scroll
        const handleScroll = () => {
            handleSubmitFeedback();
        };

        // Handle visibility change
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                handleSubmitFeedback();
            }
        };

        // Setup event listeners
        resetIdleTimer();
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);

        // Cleanup
        return () => {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [userRating, isSubmitted, comment, pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.feedbackWrapper}>
                <div className={styles.questionSection}>
                    <h2 className={styles.title}>Was this page helpful?</h2>
                    <div className={styles.buttonGroup}>
                        <button
                            className={clsx(styles.ratingButton, userRating === true && styles.active)}
                            onClick={() => handleRating(true)}
                        >
                            <svg viewBox="0 0 24 24" className={styles.icon}>
                                <path d="M2 21h4V9H2v12zM22 10.5c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13 2 6.59 8.41C6.22 8.78 6 9.3 6 9.83V19c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5z"/>
                            </svg>
                            Yes
                        </button>
                        <button
                            className={clsx(styles.ratingButton, userRating === false && styles.active)}
                            onClick={() => handleRating(false)}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className={styles.icon}
                                style={{ transform: 'rotate(180deg)' }}
                            >
                                <path d="M2 21h4V9H2v12zM22 10.5c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13 2 6.59 8.41C6.22 8.78 6 9.3 6 9.83V19c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5z"/>
                            </svg>
                            No
                        </button>
                    </div>
                </div>

                {showComment && !isSubmitted && (
                    <div className={styles.commentSection}>
                        <textarea
                            className={styles.textarea}
                            placeholder="What was your experience?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="3"
                        />
                        <button
                            className={styles.submitButton}
                            onClick={handleSubmitFeedback}
                        >
                            Send feedback
                        </button>
                    </div>
                )}

                {isSubmitted && (
                    <div className={styles.thanksMessage}>
                        Thanks for helping us improve the docs!
                    </div>
                )}

                {/* Hidden Google Form */}
                <form
                    ref={formRef}
                    action="https://docs.google.com/forms/d/e/1FAIpQLSf5FmKXSVF6vMdqzXdW6Lpb9smL1Kj3faqFdUvxw43cB6PrcA/formResponse"
                    target="hidden_iframe"
                    style={{ display: 'none' }}
                >
                    <input type="text" name="entry.251198773" id="formArticleId" />
                    <input type="text" name="entry.1120506438" id="formRating" />
                    <input type="text" name="entry.1198611431" id="formComment" />
                </form>
                <iframe name="hidden_iframe" style={{ display: 'none' }} />
            </div>
        </div>
    );
}
