import React from 'react';
import './StepTimeline.scss';

const steps = [
  { year: '2022', title: 'Idea Born', description: 'The spark of a plan for better planning.' },
  { year: '2023', title: 'Idea Born', description: 'The spark of a plan for better planning.' },
  { year: '2024', title: 'Prototype Launch', description: 'We tested with real users and improved the core.' },
  { year: '2025', title: '10k+ Users', description: 'Our community is growing — and so are the events.' },
];

const StepTimeline = () => {
  return (
    <section className="timeline-section">
      <h2 className="timeline-title">Our Journey</h2>
      <div className="timeline-scroll">
        {steps.map((step, index) => (
          <div className="timeline-step" key={index}>
            <div className="step-year">{step.year}</div>
            <div className="step-title">{step.title}</div>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepTimeline;
