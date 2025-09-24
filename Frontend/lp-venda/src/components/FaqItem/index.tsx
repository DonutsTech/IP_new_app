'use client'

import { useState, useRef, useEffect, use } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

interface FaqItemProps {
    question: string;
    answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const answerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (answerRef.current) {
            if (isOpen) {
                gsap.to(answerRef.current, {
                    height: 'auto',
                    duration: 0.5,
                    ease: 'power2.inOut',
                    opacity: 1,
                    pointerEvents: 'auto',
                });
            } else {
                gsap.to(answerRef.current, {
                    height: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    opacity: 0,
                    pointerEvents: 'none',
                });
            }
        }
    }, [isOpen]);

    return (
        <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
            <button className={styles.faqQuestion} onClick={toggleOpen}>
                <span className={styles.questionText}>{question}</span>
                <span className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}>+</span>
            </button>
            <div ref={answerRef} className={styles.faqAnswerContainer}>
                <p className={styles.faqAnswer}>{answer}</p>
            </div>
        </div>
    )
}