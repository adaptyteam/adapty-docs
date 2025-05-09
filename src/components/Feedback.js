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

    const iframeRef = useRef(null);
    const formRef = useRef(null);
    const idleTimerRef = useRef(null);

    // Handle form submission
    const handleSubmitFeedback = (e) => {
        if (e) e.preventDefault();
        if (userRating === null || isSubmitted) return;

        if (formRef.current) {
            const formComment = formRef.current.querySelector('#formComment');
            if (formComment) {
                formComment.value = comment;
            }

            if (iframeRef.current) {
                iframeRef.current.formSubmitted = true;
                formRef.current.submit();
            }
        }
    };

    // Handle initial rating
    const handleRating = (isLike) => {
        setUserRating(isLike);
        setShowComment(true);
        if (formRef.current) {
            const formArticleId = formRef.current.querySelector('#formArticleId');
            const formRating = formRef.current.querySelector('#formRating');

            if (formArticleId && formRating) {
                formArticleId.value = pathname;
                formRating.value = isLike ? 'Liked' : 'Disliked';
            }
        }
    };

    // Handle auto-submission
    useEffect(() => {
        if (!userRating || isSubmitted) return;

        // Setup idle timer
        const timer = setTimeout(() => {
            handleSubmitFeedback();
        }, 60000);

        // Handle scroll
        let lastKnownScrollPosition = window.scrollY;
        const handleScroll = () => {
            if (window.scrollY < lastKnownScrollPosition) {
                handleSubmitFeedback();
            }
            lastKnownScrollPosition = window.scrollY;
        };

        // Handle page visibility and unload
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                handleSubmitFeedback();
            }
        };

        const handleUnload = (e) => {
            if (!isSubmitted && userRating !== null) {
                handleSubmitFeedback();
            }
        };

        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('beforeunload', handleUnload);

        // Cleanup
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [userRating, isSubmitted, comment, pathname]);

    // Handle iframe load
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            if (iframe.formSubmitted) {
                setIsSubmitted(true);
                iframe.formSubmitted = false;
            }
        };

        iframe.addEventListener('load', handleLoad);
        return () => iframe.removeEventListener('load', handleLoad);
    }, []);

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
                            <svg viewBox="0 0 20 20" className={styles.icon}>
                                <path d="M10 2.5L12.1832 7.00967L17.0734 7.75966L13.5367 11.2097L14.3664 16.0903L10 13.7897L5.63361 16.0903L6.46329 11.2097L2.92658 7.75966L7.81678 7.00967L10 2.5Z" />
                            </svg>
                            Yes
                        </button>
                        <button
                            className={clsx(styles.ratingButton, userRating === false && styles.active)}
                            onClick={() => handleRating(false)}
                        >
                            <svg viewBox="0 0 20 20" className={styles.icon}>
                                <path d="M10 2.5L7.81678 7.00967L2.92658 7.75966L6.46329 11.2097L5.63361 16.0903L10 13.7897L14.3664 16.0903L13.5367 11.2097L17.0734 7.75966L12.1832 7.00967L10 2.5Z" />
                            </svg>
                            No
                        </button>
                    </div>
                </div>

                {showComment && !isSubmitted && (
                    <div className={styles.commentSection}>
                        <textarea
                            className={styles.textarea}
                            placeholder="What was your experience? (optional)"
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

                {/* Hidden iframe for form submission */}
                <iframe
                    name="hidden_iframe"
                    ref={iframeRef}
                    style={{ display: 'none' }}
                />

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
            </div>
        </div>
    );
}
